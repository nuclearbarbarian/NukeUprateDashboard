import { COLORS as C, serif, mono } from "../data/constants.js";
import { STATE_REGULATORY as SD } from "../data/states.js";

function LegendDot({ color, label, square }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:4}}>
      <div style={{width:8, height:8, background:color, border:`1px solid ${C.g50}`, ...(square?{}:{borderRadius:"50%"})}}/>
      <span>{label}</span>
    </div>
  );
}

export default function MapView({ feats, sites, mx, proj, path, gf, sel, setSel, hov, setHov, tp, setTp, setMapEl, mapEl, mapW }) {
  return (
    <div ref={setMapEl} style={{flex:"1 1 300px", background:C.paper, border:`1px solid ${C.g30}`, position:"relative", overflow:"visible"}}>
      <svg viewBox="0 0 960 600" width={mapW} height={Math.round(mapW*600/960)} style={{display:"block", maxWidth:"100%"}}>
        <rect width="960" height="600" fill={C.paper}/>
        {feats.map((f,i)=>(
          <path key={i} d={path(f)||""} fill={gf(f.id)} stroke={C.g30} strokeWidth={0.5}/>
        ))}
        {sites.map((s,i)=>{
          const c = proj([s.lon, s.lat]);
          if (!c) return null;
          const hr    = s.add > 0;
          const r     = hr ? 3 + (s.add / mx) * 6.5 : 2.5;
          const col   = hr ? (s.ps[0].type==="PWR" ? C.blue : C.red) : C.g50;
          const isSel = sel && s.ps.some(p=>p.name===sel.name);
          return (
            <g key={i} style={{cursor:"pointer"}}
              onClick={()=>setSel(s.ps[0])}
              onMouseEnter={e=>{
                setHov(s);
                if (mapEl) { const r=mapEl.getBoundingClientRect(); setTp({x:e.clientX-r.left, y:e.clientY-r.top}); }
              }}
              onMouseLeave={()=>setHov(null)}>
              {isSel && <circle cx={c[0]} cy={c[1]} r={r+4} fill="none" stroke={col} strokeWidth={1.5} strokeDasharray="3,2"/>}
              <circle cx={c[0]} cy={c[1]} r={r} fill={col} stroke={C.paper} strokeWidth={1} opacity={isSel?1:0.85}/>
            </g>
          );
        })}
      </svg>

      {hov && !sel && (
        <div className="map-hover-tip" style={{position:"absolute", left:Math.min(tp.x+14,480), top:tp.y-8,
          background:C.paper, border:`2px solid ${C.ink}`, padding:"10px 14px",
          pointerEvents:"none", zIndex:10, minWidth:220, fontFamily:serif}}>
          <div style={{fontSize:14, fontWeight:700, marginBottom:3}}>
            {hov.ps.length>1 ? `${hov.ps[0].name.replace(/ \d$/,"")} (${hov.ps.length} units)` : hov.ps[0].name}
          </div>
          <div style={{fontSize:11, color:C.g70, marginBottom:5, fontFamily:mono}}>
            {hov.st} · {hov.ps[0].type} · {hov.ps[0].lp} · {hov.ps[0].mkt}
          </div>
          <div style={{fontSize:13, fontWeight:700, color:hov.add>0?C.blue:C.g50}}>
            {hov.add>0 ? `+${Math.round(hov.add).toLocaleString()} MWt headroom` : "Fully uprated — no headroom"}
          </div>
          {SD[hov.st]?.mor!=="None" && SD[hov.st]?.mor!=="Repealed" && (
            <div style={{fontSize:10, color:C.red, marginTop:5, fontWeight:700}}>▸ {SD[hov.st].mor}</div>
          )}
        </div>
      )}

      <div className="map-legend" style={{position:"absolute", bottom:8, left:8, display:"flex", gap:16,
        fontSize:10, fontFamily:mono, background:`${C.paper}ee`, padding:"6px 10px", border:`1px solid ${C.g30}`}}>
        <LegendDot color={C.blue} label="PWR"/>
        <LegendDot color={C.red}  label="BWR"/>
        <LegendDot color={C.g50}  label="Maxed"/>
        <span style={{color:C.warm}}>Size = MWt headroom</span>
      </div>
    </div>
  );
}
