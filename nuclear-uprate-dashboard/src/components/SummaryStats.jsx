import { COLORS as C, FONTS } from "../data/constants.js";
const mono = FONTS.mono;

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
          <div style={{fontFamily:mono, fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:C.warm, marginBottom:2}}>{s.l}</div>
          <div style={{fontSize:20, fontWeight:700, fontFamily:mono}}>{s.v}</div>
        </div>
      ))}
    </div>
  );
}
