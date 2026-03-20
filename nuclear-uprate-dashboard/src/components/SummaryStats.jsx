import { COLORS as C, mono, LABEL_STYLE } from "../data/constants.js";

export default function SummaryStats({ stats }) {
  const items = [
    { l:"Reactor Units",      v:stats.u  },
    { l:"With Headroom",      v:stats.hr },
    { l:"States",             v:stats.s  },
    { l:"Clear-Path States",  v:stats.cl },
  ];
  return (
    <div style={{display:"flex", gap:24, flexWrap:"wrap", paddingBottom:14, marginBottom:0}}>
      {items.map((s,i)=>(
        <div key={i} style={{flex:"1 1 130px"}}>
          <div style={{...LABEL_STYLE, marginBottom:2}}>{s.l}</div>
          <div style={{fontSize:20, fontWeight:700, fontFamily:mono}}>{s.v}</div>
        </div>
      ))}
    </div>
  );
}
