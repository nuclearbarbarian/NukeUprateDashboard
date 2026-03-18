import { useState, useEffect, useMemo, useCallback } from "react";
import * as d3 from "d3";
import { PLANTS } from "../data/plants.js";
import { STATE_REGULATORY as SD } from "../data/states.js";
import { COLORS as C, ENV_COLORS as ENV_C, FONTS, FIPS_TO_STATE as FIPS, US_TOPO_URL } from "../data/constants.js";

export default function Dashboard() {
  const [geo, setGeo] = useState(null);
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const [tp, setTp] = useState({x:0,y:0});
  const [fil, setFil] = useState({env:"All",type:"All",mkt:"All",hr:"All"});
  const [view, setView] = useState("uprate");
  const [mapEl, setMapEl] = useState(null);
  const [mapW, setMapW] = useState(()=>typeof window!=="undefined"?Math.min(window.innerWidth-30,960):960);

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
    if(fil.type!=="All"&&p.type!==fil.type) return false;
    if(fil.mkt!=="All"&&!p.mkt.startsWith(fil.mkt.slice(0,3))) return false;
    if(fil.hr==="Headroom"&&p.add===0) return false;
    if(fil.hr==="Maxed"&&p.add>0) return false;
    const s=SD[p.state]; if(fil.env!=="All"&&s?.env!==fil.env) return false;
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
    return {u:filtered.length,t,gwe:(t/3/1000).toFixed(1),hr,s:ss.size,cl};
  },[filtered]);

  const mx = useMemo(()=>Math.max(...sites.map(s=>s.add),1),[sites]);

  const gf = useCallback(fid=>{
    const a=FIPS[+fid],s=SD[a];
    if(view==="regulatory"&&s){
      return s.env==="Clear"?`${C.green}18`:s.env==="Mixed"?`${C.yellow}18`:`${C.red}18`;
    }
    return filtered.some(p=>p.state===a)?C.newsprint:"#EAE7DD";
  },[view,filtered]);

  const serif = FONTS.serif;
  const mono = FONTS.mono;

  const Btn = ({on,onClick,children})=>(
    <button onClick={onClick} style={{padding:"3px 10px",fontSize:11,fontWeight:on?700:400,
      border:on?`2px solid ${C.ink}`:`1px solid ${C.g30}`,borderRadius:0,cursor:"pointer",
      background:on?C.ink:"transparent",color:on?C.paper:C.g70,fontFamily:mono,transition:"all 0.1s",letterSpacing:"0.02em"}}>{children}</button>
  );

  const Tooltip = ({text,children})=>(
    <span style={{position:"relative",display:"inline-block"}}
      onMouseEnter={e=>e.currentTarget.querySelector(".tt").style.display="block"}
      onMouseLeave={e=>e.currentTarget.querySelector(".tt").style.display="none"}>
      {children}
      <span className="tt" style={{display:"none",position:"absolute",bottom:"calc(100% + 6px)",left:"50%",
        transform:"translateX(-50%)",width:220,background:C.ink,color:C.newsprint,
        fontSize:11,lineHeight:1.5,padding:"8px 10px",fontFamily:mono,fontWeight:400,
        letterSpacing:"0.01em",zIndex:100,pointerEvents:"none",
        boxShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>
        {text}
        <span style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",
          border:"5px solid transparent",borderTopColor:C.ink}}/>
      </span>
    </span>
  );

  return (
    <div style={{minHeight:"100vh",background:C.news,color:C.ink,fontFamily:serif}}>
      {/* Global styles are in index.css; font loaded in index.html */}

      {/* ── HEADER ────────────────────────────────── */}
      <style>{`
        .logo-tip:hover .logo-tooltip{display:block!important}
        @media(max-width:600px){
          .main-pad{padding:16px 14px!important}
          .header-pad{padding:14px 14px!important}
          .header-logo{height:32px!important}
          .header-spacer{display:none!important}
          .header-center{flex:1 1 0!important;min-width:0!important}
        }
      `}</style>
      <header className="header-pad" style={{background:C.ink,color:C.paper,padding:"24px 36px",display:"flex",alignItems:"center"}}>
        <div className="header-spacer" style={{flex:1}}/>
        <div className="header-center" style={{textAlign:"center"}}>
          <h1 style={{fontSize:22,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",margin:"0 0 6px",fontFamily:serif}}>
            Nuclear Uprate Opportunity Map
          </h1>
          <p style={{fontSize:13,fontStyle:"italic",color:C.g30,margin:"0 0 6px"}}>
            Theoretical Capacity Additions for the U.S. Commercial Reactor Fleet
          </p>
          <p style={{fontFamily:mono,fontSize:10,color:C.g50,letterSpacing:"0.08em",textTransform:"uppercase",margin:0}}>
            Last updated: {__BUILD_DATE__}
          </p>
        </div>
        <div style={{flex:1,display:"flex",justifyContent:"flex-end"}}>
          <div className="logo-tip" style={{display:"inline-block",position:"relative",cursor:"pointer"}}>
            <img src={`${import.meta.env.BASE_URL}nuclear-barbarians-logo.png`} alt="Nuclear Barbarians" className="header-logo" style={{height:48,display:"block"}}/>
            <div className="logo-tooltip" style={{display:"none",position:"absolute",top:"calc(100% + 8px)",right:0,width:300,background:C.newsprint,color:C.ink,border:`2px solid ${C.g30}`,padding:"12px 14px",zIndex:100,fontSize:12,lineHeight:1.6,fontFamily:serif,textAlign:"left",boxShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>
              This is a <a href="https://www.nuclearbarbarians.com/" target="_blank" rel="noreferrer" style={{color:C.blue,fontWeight:700}}>Nuclear Barbarians</a> project, which is part of the Foundation for American Innovation. To support this project and others like it, <a href="https://www.thefai.org/donate" target="_blank" rel="noreferrer" style={{color:C.blue,fontWeight:700}}>click here</a>.
            </div>
          </div>
        </div>
      </header>

      <div className="main-pad" style={{maxWidth:1380,margin:"0 auto",padding:"24px 36px"}}>
        {/* ── SUMMARY TABLE ──────────────────────── */}
        <div style={{display:"flex",gap:24,flexWrap:"wrap",paddingBottom:14,marginBottom:0}}>
          {[
            {l:"Reactor Units",v:stats.u},
            {l:"With Headroom",v:stats.hr},
            {l:"States",v:stats.s},
            {l:"Clear-Path States",v:stats.cl},
          ].map((s,i)=>(
            <div key={i} style={{flex:"1 1 130px"}}>
              <div style={{fontFamily:mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginBottom:2}}>{s.l}</div>
              <div style={{fontSize:20,fontWeight:700,fontFamily:mono}}>{s.v}</div>
            </div>
          ))}
        </div>
        {/* ── ESTIMATE COMPARISON ─────────────────── */}
        <div style={{border:`2px solid ${C.ink}`,padding:"14px 18px",marginBottom:18}}>
          <div style={{fontWeight:700,fontVariant:"small-caps",letterSpacing:"0.1em",fontSize:12,marginBottom:10,paddingBottom:6,borderBottom:`1px solid ${C.g30}`}}>
            Uprate Capacity Estimates — Two Reference Points
          </div>
          <div style={{display:"flex",gap:24,flexWrap:"wrap",alignItems:"flex-end"}}>
            {/* NEI operator plans */}
            <div style={{flex:"1 1 200px"}}>
              <div style={{fontFamily:mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginBottom:3}}>
                Operator-Reported Plans <span style={{color:C.g50}}>(NEI 2025 Survey)</span>
              </div>
              <div style={{fontSize:22,fontWeight:700,fontFamily:mono,color:C.green}}>
                ~8,000 <span style={{fontSize:12,fontWeight:400,color:C.g70}}>MWe (electric)</span>
                <span style={{fontSize:14,fontWeight:400,color:C.g50,marginLeft:12}}>≈ 8 GWe this decade</span>
              </div>
              <div style={{fontSize:10,fontStyle:"italic",color:C.g50,marginTop:3}}>Includes restarts &amp; fuel-cycle extensions</div>
            </div>
            {/* UPRISE */}
            <div style={{flex:"1 1 200px"}}>
              <div style={{fontFamily:mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginBottom:3}}>
                DOE UPRISE Target <span style={{color:C.g50}}>(Federal Program)</span>
              </div>
              <div style={{fontSize:22,fontWeight:700,fontFamily:mono,color:"#8B4513"}}>
                5,000 <span style={{fontSize:12,fontWeight:400,color:C.g70}}>MWe (electric)</span>
                <span style={{fontSize:14,fontWeight:400,color:C.g50,marginLeft:12}}>5 GW by 2029</span>
              </div>
              <div style={{fontSize:10,fontStyle:"italic",color:C.g50,marginTop:3}}>Stated program target; uprates &amp; restarts, DOE-funded</div>
            </div>
            {/* Annotation */}
            <div style={{flex:"1 1 180px",fontSize:12,fontStyle:"italic",color:C.g70,lineHeight:1.5}}>
              The NEI 2025 figure includes restarts (Palisades ~800 MWe, Crane ~800 MWe) and fuel-cycle extensions alongside traditional uprates. The UPRISE target reflects a federal cost-share program focused specifically on uprates and restarts by 2029. These figures are not additive — UPRISE draws from the same project pool as operator-reported plans.
            </div>
          </div>
        </div>

        {/* ── CONTROLS ───────────────────────────── */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:16}}>
          <span style={{fontFamily:mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginRight:6}}>View</span>
          {["uprate","regulatory"].map(m=>(
            <Btn key={m} on={view===m} onClick={()=>setView(m)}>
              {m==="uprate"
                ?<Tooltip text="A power uprate increases a reactor's licensed output beyond its original design capacity — typically 1–20% — by optimizing fuel, instrumentation, or thermal margins.">Uprate Potential</Tooltip>
                :"Regulatory"}
            </Btn>
          ))}
          <span style={{width:1,height:20,background:C.g30,margin:"0 8px"}}/>
          <span style={{fontFamily:mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginRight:6}}>Filter</span>
          {[{k:"type",o:["All","PWR","BWR"]},{k:"mkt",o:["All","Reg.","Merch."]},{k:"hr",o:["All","Headroom","Maxed"]},{k:"env",o:["All","Clear","Mixed","Restricted"]}].map(({k,o})=>(
            <div key={k} style={{display:"flex",gap:2}}>{o.map(v=>{
              const tipMap={"Clear":"No major state-level regulatory or political barriers to uprate. Favorable or neutral PUC posture, no active moratoriums.","Mixed":"Mixed signals — some supportive policy but with meaningful hurdles such as partial deregulation conflicts, pending legislation, or contested rate cases.","Restricted":"Significant state-level barriers: active legislative moratoriums, hostile PUC precedent, or explicit bans on new nuclear capacity.","PWR":"Pressurized Water Reactor — the most common US design. Water is kept under high pressure so it stays liquid as it transfers heat to a secondary steam loop that drives the turbine. Easier to uprate via thermal margin analysis.","BWR":"Boiling Water Reactor — water boils directly in the reactor vessel, sending steam straight to the turbine. Fewer plants in the US fleet; uprates often require additional neutronics and containment review.","Reg.":"Regulated market — the plant operates in a state where a public utility commission sets electricity rates. Uprate economics are more predictable; additional capacity is typically rolled into the rate base.","Merch.":"Merchant market — the plant sells power at wholesale market prices in a deregulated grid (e.g., PJM, MISO). Uprate value depends on spark spreads and capacity market revenues, adding commercial risk but also upside."};
              const tip = (k==="env" || k==="type" || k==="mkt") && tipMap[v];
              return tip ? <Tooltip key={v} text={tip}><Btn on={fil[k]===v} onClick={()=>setFil(f=>({...f,[k]:v}))}>{v}</Btn></Tooltip>
                         : <Btn key={v} on={fil[k]===v} onClick={()=>setFil(f=>({...f,[k]:v}))}>{v}</Btn>;
            })}</div>
          ))}
        </div>

        {/* ── MAP + PANEL ────────────────────────── */}
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          <div ref={setMapEl} style={{flex:"1 1 300px",background:C.paper,border:`1px solid ${C.g30}`,position:"relative",overflow:"visible"}}>
            <svg viewBox="0 0 960 600" width={mapW} height={Math.round(mapW*600/960)} style={{display:"block",maxWidth:"100%"}}>
              <rect width="960" height="600" fill={C.paper}/>
              {feats.map((f,i)=><path key={i} d={path(f)||""} fill={gf(f.id)} stroke={C.g30} strokeWidth={0.5}/>)}
              {[...sites].sort((a,b)=>b.add-a.add).map((s,i)=>{
                const c=proj([s.lon,s.lat]); if(!c) return null;
                const hr=s.add>0, r=hr?3+(s.add/mx)*6.5:2.5;
                const sd=SD[s.st];
                const col=view==="regulatory"?(ENV_C[sd?.env]||C.g50):(hr?C.blue:C.g50);
                const isSel=sel&&s.ps.some(p=>p.name===sel.name);
                return(<g key={i} style={{cursor:"pointer"}} onClick={()=>setSel(s.ps[0])}
                  onMouseEnter={e=>{setHov(s);if(mapEl){const r=mapEl.getBoundingClientRect();setTp({x:e.clientX-r.left,y:e.clientY-r.top})}}}
                  onMouseLeave={()=>setHov(null)}>
                  {isSel&&<circle cx={c[0]} cy={c[1]} r={r+4} fill="none" stroke={col} strokeWidth={1.5} strokeDasharray="3,2"/>}
                  <circle cx={c[0]} cy={c[1]} r={r} fill={col} stroke={C.paper} strokeWidth={1} opacity={isSel?1:0.85}/>
                </g>);
              })}
            </svg>
            {/* Hover tooltip */}
            {hov&&!sel&&(
              <div style={{position:"absolute",left:Math.min(tp.x+14,480),top:tp.y-8,background:C.paper,border:`2px solid ${C.ink}`,padding:"10px 14px",pointerEvents:"none",zIndex:10,minWidth:220,fontFamily:serif}}>
                <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>
                  {hov.ps.length>1?`${hov.ps[0].name.replace(/ \d$/,"")} (${hov.ps.length} units)`:hov.ps[0].name}
                </div>
                <div style={{fontSize:11,color:C.g70,marginBottom:5,fontFamily:mono}}>{hov.st} · {hov.ps[0].type} · {hov.ps[0].lp} · {hov.ps[0].mkt}</div>
                <div style={{fontSize:13,fontWeight:700,color:hov.add>0?C.blue:C.g50}}>
                  {hov.add>0?`+${Math.round(hov.add).toLocaleString()} MWt headroom`:"Fully uprated — no headroom"}
                </div>
                {SD[hov.st]?.mor!=="None"&&SD[hov.st]?.mor!=="Repealed"&&(
                  <div style={{fontSize:10,color:C.red,marginTop:5,fontWeight:700}}>▸ {SD[hov.st].mor}</div>
                )}
              </div>
            )}
            {/* Legend */}
            <div style={{position:"absolute",bottom:8,left:8,display:"flex",gap:16,fontSize:10,fontFamily:mono,background:`${C.paper}ee`,padding:"6px 10px",border:`1px solid ${C.g30}`}}>
              {view==="regulatory"?Object.entries(ENV_C).map(([k,c])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:8,height:8,background:c,border:`1px solid ${C.g50}`}}/><span>{k}</span>
                </div>
              )):(
                <>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:"50%",background:C.blue}}/><span>Headroom</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:"50%",background:C.g50}}/><span>Maxed</span></div>
                  <span style={{color:C.warm}}>Marker size = MWt potential</span>
                </>
              )}
            </div>
          </div>

          {/* ── DETAIL PANEL ─────────────────────── */}
          <div style={{flex:"0 0 320px",maxHeight:560,overflowY:"auto",background:C.paper,border:`1px solid ${C.g30}`}}>
            {sel?(()=>{
              const sd=SD[sel.state], sp=PLANTS.filter(p=>p.lat===sel.lat&&p.lon===sel.lon);
              const sa=sp.reduce((s,p)=>s+p.add,0), sr=sp.reduce((s,p)=>s+p.ref,0);
              return(<div style={{padding:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <h2 style={{fontSize:18,fontWeight:700,margin:0,borderBottom:"none",paddingBottom:0}}>{sel.name.replace(/ \d$/,"")}</h2>
                    <p style={{fontSize:11,color:C.g70,fontFamily:mono,margin:"3px 0 0"}}>{sel.state} · {sel.type} · {sel.lp} · {sel.mkt}</p>
                  </div>
                  <button onClick={()=>setSel(null)} style={{background:"none",border:`1px solid ${C.g30}`,color:C.g70,padding:"2px 8px",cursor:"pointer",fontFamily:mono,fontSize:11}}>✕</button>
                </div>

                {/* Regulatory badge */}
                <div style={{display:"inline-block",padding:"3px 10px",fontSize:11,fontWeight:700,fontFamily:mono,letterSpacing:"0.05em",
                  border:`2px solid ${ENV_C[sd?.env]}`,color:ENV_C[sd?.env],marginBottom:12}}>
                  {sd?.env?.toUpperCase()} PATH
                </div>

                {sd?.mor!=="None"&&sd?.mor!=="Repealed"&&(
                  <div style={{fontSize:12,color:C.red,fontWeight:700,marginBottom:10,padding:"6px 10px",borderLeft:`3px solid ${C.red}`,background:`${C.red}08`}}>
                    Moratorium: {sd.mor}
                  </div>
                )}
                {sd?.waste!=="None"&&(
                  <div style={{fontSize:12,color:C.yellow,fontWeight:700,marginBottom:10,padding:"6px 10px",borderLeft:`3px solid ${C.yellow}`,background:`${C.yellow}08`}}>
                    Waste: {sd.waste}
                  </div>
                )}

                {/* Unit table */}
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:mono,marginBottom:14}}>
                  <thead><tr>
                    <th style={{textAlign:"left",padding:"4px 6px",borderBottom:`2px solid ${C.ink}`,fontSize:10,letterSpacing:"0.05em"}}>UNIT</th>
                    <th style={{textAlign:"right",padding:"4px 6px",borderBottom:`2px solid ${C.ink}`,fontSize:10}}>REF MWt</th>
                    <th style={{textAlign:"right",padding:"4px 6px",borderBottom:`2px solid ${C.ink}`,fontSize:10}}>UPRATED</th>
                    <th style={{textAlign:"right",padding:"4px 6px",borderBottom:`2px solid ${C.ink}`,fontSize:10}}>ADD MWt</th>
                  </tr></thead>
                  <tbody>{sp.map((p,i)=>(
                    <tr key={i}>
                      <td style={{padding:"4px 6px",borderBottom:`1px solid ${C.g15}`,fontWeight:700,fontFamily:serif,fontSize:12}}>{p.name}</td>
                      <td style={{padding:"4px 6px",borderBottom:`1px solid ${C.g15}`,textAlign:"right"}}>{p.ref.toLocaleString()}</td>
                      <td style={{padding:"4px 6px",borderBottom:`1px solid ${C.g15}`,textAlign:"right"}}>{(p.up*100).toFixed(1)}%</td>
                      <td style={{padding:"4px 6px",borderBottom:`1px solid ${C.g15}`,textAlign:"right",fontWeight:700,color:p.add>0?C.blue:C.g50}}>+{Math.round(p.add)}</td>
                    </tr>
                  ))}</tbody>
                </table>

                {/* Capacity bar */}
                {sa>0&&<div style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,fontFamily:mono,color:C.warm,marginBottom:3}}>
                    <span>Current → Theoretical Cap</span><span style={{color:C.blue,fontWeight:700}}>+{Math.round(sa).toLocaleString()} MWt</span>
                  </div>
                  <div style={{height:8,background:C.g15,overflow:"hidden"}}>
                    <div style={{height:"100%",background:`linear-gradient(90deg,${C.g70} 0%,${C.g70} ${(sr/(sr+sa))*100}%,${C.blue} ${(sr/(sr+sa))*100}%,${C.blue} 100%)`,width:"100%"}}/>
                  </div>
                </div>}

                {/* Details */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[{l:"Reactor Type",v:sel.type},{l:"NSSS Design",v:sel.lp},{l:"Market",v:sel.mkt},{l:"Max Uprate Cap",v:`${(sel.cap*100).toFixed(0)}%`},{l:"State SEPA",v:sd?.sepa?"Yes":"No",tip:"State Environmental Policy Act — a state-level equivalent of federal NEPA. States with a SEPA may require environmental impact review for uprate projects, adding time and cost to the permitting process."},{l:"Cycle",v:sel.type==="BWR"?"Direct":"Indirect"}].map((d,i)=>(
                    <div key={i} style={{padding:"8px 10px",background:C.news,border:`1px solid ${C.g30}`,position:"relative",cursor:d.tip?"help":"default"}}
                      className={d.tip?"sepa-tip":""}>
                      <div style={{fontFamily:mono,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginBottom:2}}>
                        {d.l}{d.tip&&<span style={{marginLeft:4,color:C.g50}}>(?)</span>}
                      </div>
                      <div style={{fontSize:14,fontWeight:700}}>{d.v}</div>
                      {d.tip&&<div className="sepa-tooltip" style={{display:"none",position:"absolute",bottom:"calc(100% + 6px)",left:0,right:-40,
                        background:C.paper,border:`2px solid ${C.ink}`,padding:"10px 12px",zIndex:20,fontSize:12,fontWeight:400,
                        lineHeight:1.5,fontFamily:serif,color:C.g90}}>
                        <div style={{fontFamily:mono,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:4,color:C.ink}}>State Environmental Policy Act</div>
                        {d.tip}
                        <div style={{position:"absolute",bottom:-6,left:16,width:10,height:10,background:C.paper,borderRight:`2px solid ${C.ink}`,borderBottom:`2px solid ${C.ink}`,transform:"rotate(45deg)"}}/>
                      </div>}
                    </div>
                  ))}
                </div>
              </div>);
            })():(
              <div style={{padding:16}}>
                <h3 style={{fontSize:14,fontWeight:700,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.05em",fontVariant:"small-caps"}}>
                  Top Uprate Opportunities
                </h3>
                <div style={{borderBottom:`1px solid ${C.g30}`,marginBottom:10}}/>
                {sites.filter(s=>s.add>0).sort((a,b)=>b.add-a.add).slice(0,20).map((s,i)=>{
                  const sd=SD[s.st];
                  const lab=s.ps.length>1?`${s.ps[0].name.replace(/ \d$/,"")} (${s.ps.length}u)`:s.ps[0].name;
                  return(<div key={i} onClick={()=>setSel(s.ps[0])} onMouseEnter={()=>setHov(s)} onMouseLeave={()=>setHov(null)}
                    style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",cursor:"pointer",borderBottom:`1px solid ${C.g15}`,
                      background:hov===s?C.news:"transparent",transition:"background 0.1s"}}>
                    <div style={{width:8,height:8,flexShrink:0,background:ENV_C[sd?.env]||C.g50,border:`1px solid ${C.g50}`}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:700}}>{lab}</div>
                      <div style={{fontSize:10,color:C.g70,fontFamily:mono}}>{s.st} · {s.ps[0].type} · {s.ps[0].mkt}</div>
                    </div>
                    <div style={{fontFamily:mono,fontSize:12,fontWeight:700,color:C.blue,flexShrink:0}}>+{Math.round(s.add).toLocaleString()}</div>
                  </div>);
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── METHODOLOGY NOTE ──────────────────── */}
        <div style={{border:`2px solid ${C.ink}`,borderLeft:`4px solid ${C.blue}`,padding:"14px 18px",marginTop:20}}>
          <div style={{fontWeight:700,fontVariant:"small-caps",letterSpacing:"0.1em",fontSize:12,marginBottom:8,paddingBottom:6,borderBottom:`1px solid ${C.g30}`}}>
            A Note on Methodology
          </div>
          <div style={{fontSize:12.5,lineHeight:1.6,color:C.g90,textAlign:"justify",hyphens:"auto"}}>
            <span style={{fontWeight:700}}>Operator-Reported Plans</span> are drawn from NEI's 2025 capacity survey, which identified approximately 8 GWe of additions this decade. This figure includes plant restarts (e.g., Palisades ~800 MWe electric, Crane ~835 MWe electric) and fuel-cycle efficiency extensions alongside traditional uprates — it is a broader measure of fleet capacity growth, not uprates alone. All reference-box figures are in MWe (electric output); plant-level headroom on the map is in MWt (thermal), reflecting the DOE source methodology. The <span style={{fontWeight:700}}>DOE UPRISE program</span> separately targets 5 GW of uprates and restarts by 2029 through federal cost-sharing and streamlined licensing support; this is the program's stated target, not a modeled forecast. The plant-level uprate headroom shown on the map is estimated using the DOE methodology (Larsen et al., INL/RPT-23-74681; INL/RPT-24-78810), which applies the highest historically achieved uprate per reactor type as a uniform ceiling — an upper bound, not a forecast. <span style={{fontWeight:700}}>State regulatory classifications</span> reflect conditions as of the FAI Playbook (Nov 2025). California is classified Restricted on the basis of its statutory HLW repository requirement, which remains in force notwithstanding the 2023 Diablo Canyon license extension.
          </div>
          <div style={{fontSize:11,fontStyle:"italic",color:C.warm,marginTop:10}}>
            Industry-standard plant-specific feasibility analysis (per NEI-08-10 and EPRI's 2023 Feasibility Study Guideline) requires vendor-led assessment of each unit's NSSS and BOP constraints. Even nominally identical plants may require separate uprate programs. See: IAEA NE Series No. NP-T-3.9 (2011); Westinghouse Uprating Programs Technology; MIT CANES Mega-Uprates Thesis (2014).
          </div>
        </div>
        {/* ── FOOTER ─────────────────────────────── */}
        <footer style={{borderTop:`2px solid ${C.ink}`,paddingTop:14,marginTop:20,fontSize:11,color:C.g50,textAlign:"center",fontStyle:"italic"}}>
          Sources: INL/RPT-24-78810 (2024) · INL/RPT-23-74681 (2023) · FAI State Permitting Playbook Nuclear Supplement (2025) · NEI 2025 Survey · DOE Pathways to Commercial Liftoff: Advanced Nuclear (2024) · DOE UPRISE Program · NRC Approved Applications for Power Uprates.
        </footer>
      </div>
    </div>
  );
}
