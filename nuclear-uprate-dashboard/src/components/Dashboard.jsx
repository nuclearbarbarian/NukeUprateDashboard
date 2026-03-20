import { useState, useEffect, useMemo, useCallback } from "react";
import * as d3 from "d3";
import { PLANTS } from "../data/plants.js";
import { STATE_REGULATORY as SD } from "../data/states.js";
import { COLORS as C, ENV_COLORS as ENV_C, FONTS, FIPS_TO_STATE as FIPS, US_TOPO_URL } from "../data/constants.js";

import Header            from "./Header.jsx";
import SummaryStats      from "./SummaryStats.jsx";
import EstimateBox       from "./EstimateBox.jsx";
import Controls          from "./Controls.jsx";
import MapView           from "./MapView.jsx";
import DetailPanel       from "./DetailPanel.jsx";
import MethodologyFooter from "./MethodologyFooter.jsx";

const serif = FONTS.serif;

export default function Dashboard() {
  const [geo,    setGeo]    = useState(null);
  const [sel,    setSel]    = useState(null);
  const [hov,    setHov]    = useState(null);
  const [tp,     setTp]     = useState({x:0, y:0});
  const [fil,    setFil]    = useState({env:"All", type:"All", mkt:"All", hr:"All"});
  const [view,   setView]   = useState("uprate");
  const [mapEl,  setMapEl]  = useState(null);
  const [mapW,   setMapW]   = useState(()=>typeof window!=="undefined" ? Math.min(window.innerWidth-30, 960) : 960);

  const proj = useMemo(()=>d3.geoAlbersUsa().scale(1080).translate([476,296]),[]);
  const path = useMemo(()=>d3.geoPath().projection(proj),[proj]);

  useEffect(()=>{fetch(US_TOPO_URL).then(r=>r.json()).then(setGeo).catch(console.error)},[]);
  useEffect(()=>{
    if(!mapEl) return;
    const obs = new ResizeObserver(e=>setMapW(e[0].contentRect.width));
    obs.observe(mapEl);
    return ()=>obs.disconnect();
  },[mapEl]);

  const feats = useMemo(()=>{
    if(!geo) return [];
    const {geometries}=geo.objects.states, {arcs:ta,transform:tr}=geo;
    const da=i=>{const rev=i<0,idx=rev?~i:i,a=ta[idx],c=[];let x=0,y=0;for(const[dx,dy]of a){x+=dx;y+=dy;c.push([tr?x*tr.scale[0]+tr.translate[0]:x,tr?y*tr.scale[1]+tr.translate[1]:y])}return rev?c.reverse():c};
    const dr=r=>{const c=[];for(const i of r){const d=da(i);c.push(...(c.length?d.slice(1):d))}return c};
    return geometries.map(g=>({type:"Feature",geometry:{type:g.type,coordinates:g.type==="Polygon"?g.arcs.map(dr):g.arcs.map(p=>p.map(dr))},id:g.id}));
  },[geo]);

  const filtered = useMemo(()=>PLANTS.filter(p=>{
    if(fil.type!=="All" && p.type!==fil.type) return false;
    if(fil.mkt!=="All"  && !p.mkt.startsWith(fil.mkt.slice(0,3))) return false;
    if(fil.hr==="Headroom" && p.add===0) return false;
    if(fil.hr==="Maxed"    && p.add>0)  return false;
    const s=SD[p.state]; if(fil.env!=="All" && s?.env!==fil.env) return false;
    return true;
  }),[fil]);

  const sites = useMemo(()=>{
    const m={};
    filtered.forEach(p=>{const k=`${p.lat}_${p.lon}`;if(!m[k])m[k]={lat:p.lat,lon:p.lon,ps:[],add:0,st:p.state};m[k].ps.push(p);m[k].add+=p.add});
    return Object.values(m);
  },[filtered]);

  const stats = useMemo(()=>{
    const t=filtered.reduce((s,p)=>s+p.add,0), hr=filtered.filter(p=>p.add>0).length;
    const ss=new Set(filtered.map(p=>p.state)), cl=[...ss].filter(s=>SD[s]?.env==="Clear").length;
    return {u:filtered.length, t, gwe:(t/3/1000).toFixed(1), hr, s:ss.size, cl};
  },[filtered]);

  const mx = useMemo(()=>Math.max(...sites.map(s=>s.add),1),[sites]);

  const gf = useCallback(fid=>{
    const a=FIPS[+fid], s=SD[a];
    if(view==="regulatory" && s){
      return s.env==="Clear"?`${C.green}18`:s.env==="Mixed"?`${C.yellow}18`:`${C.red}18`;
    }
    return filtered.some(p=>p.state===a) ? C.newsprint : "#EAE7DD";
  },[view, filtered]);

  return (
    <div style={{minHeight:"100vh", background:C.news, color:C.ink, fontFamily:serif}}>
      <style>{`
        .logo-tip:hover .logo-tooltip{display:block!important}
        .sepa-tip:hover .sepa-tooltip{display:block!important}
        @media(max-width:600px){
          .main-pad{padding:16px 14px!important}
          .header-pad{padding:14px 14px!important}
          .header-logo{height:32px!important}
          .header-spacer{display:none!important}
          .header-center{flex:1 1 0!important;min-width:0!important}
          .map-legend{font-size:8px!important;padding:3px 6px!important;gap:8px!important}
          .map-legend .legend-dot{width:6px!important;height:6px!important}
        }
      `}</style>

      <Header/>

      <div className="main-pad" style={{maxWidth:1380, margin:"0 auto", padding:"24px 36px"}}>
        <SummaryStats stats={stats}/>
        <EstimateBox/>
        <Controls view={view} setView={setView} fil={fil} setFil={setFil}/>

        <div style={{display:"flex", gap:24, flexWrap:"wrap"}}>
          <MapView
            feats={feats} sites={sites} mx={mx}
            proj={proj} path={path} view={view} gf={gf}
            sel={sel} setSel={setSel}
            hov={hov} setHov={setHov}
            tp={tp} setTp={setTp}
            mapEl={mapEl} setMapEl={setMapEl} mapW={mapW}
          />
          <DetailPanel
            sel={sel} setSel={setSel}
            sites={sites}
            hov={hov} setHov={setHov}
          />
        </div>

        <MethodologyFooter/>
      </div>
    </div>
  );
}
