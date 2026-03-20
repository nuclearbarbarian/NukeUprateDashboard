import { COLORS as C, mono, LABEL_STYLE } from "../data/constants.js";
import Btn from "./Btn.jsx";
import Tooltip from "./Tooltip.jsx";

const TIP_MAP = {
  Clear:     "No major state-level regulatory or political barriers to uprate. Favorable or neutral PUC posture, no active moratoriums.",
  Mixed:     "Mixed signals — some supportive policy but with meaningful hurdles such as partial deregulation conflicts, pending legislation, or contested rate cases.",
  Restricted:"Significant state-level barriers: active legislative moratoriums, hostile PUC precedent, or explicit bans on new nuclear capacity.",
  PWR:       "Pressurized Water Reactor — the most common US design. Water is kept under high pressure so it stays liquid as it transfers heat to a secondary steam loop that drives the turbine. Easier to uprate via thermal margin analysis.",
  BWR:       "Boiling Water Reactor — water boils directly in the reactor vessel, sending steam straight to the turbine. Fewer plants in the US fleet; uprates often require additional neutronics and containment review.",
  "Reg.":    "Regulated market — the plant operates in a state where a public utility commission sets electricity rates. Uprate economics are more predictable; additional capacity is typically rolled into the rate base.",
  "Merch.":  "Merchant market — the plant sells power at wholesale market prices in a deregulated grid (e.g., PJM, MISO). Uprate value depends on spark spreads and capacity market revenues, adding commercial risk but also upside.",
};

const FILTERS = [
  { k:"type", o:["All","PWR","BWR"] },
  { k:"mkt",  o:["All","Reg.","Merch."] },
  { k:"hr",   o:["All","Headroom","Maxed"] },
  { k:"env",  o:["All","Clear","Mixed","Restricted"] },
];

export default function Controls({ view, setView, fil, setFil }) {
  return (
    <div style={{display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:16}}>
      <span style={{...LABEL_STYLE, marginRight:6}}>View</span>
      {["uprate","regulatory"].map(m=>(
        <Btn key={m} on={view===m} onClick={()=>setView(m)}>
          {m==="uprate"
            ? <Tooltip text="A power uprate increases a reactor's licensed output beyond its original design capacity — typically 1–20% — by optimizing fuel, instrumentation, or thermal margins.">Uprate Potential</Tooltip>
            : "Regulatory"}
        </Btn>
      ))}
      <span style={{width:1, height:20, background:C.g30, margin:"0 8px"}}/>
      <span style={{...LABEL_STYLE, marginRight:6}}>Filter</span>
      {FILTERS.map(({k,o})=>(
        <div key={k} style={{display:"flex", gap:2}}>
          {o.map(v=>{
            const tip = (k==="env"||k==="type"||k==="mkt") && TIP_MAP[v];
            return tip
              ? <Tooltip key={v} text={tip}><Btn on={fil[k]===v} onClick={()=>setFil(f=>({...f,[k]:v}))}>{v}</Btn></Tooltip>
              : <Btn key={v} on={fil[k]===v} onClick={()=>setFil(f=>({...f,[k]:v}))}>{v}</Btn>;
          })}
        </div>
      ))}
    </div>
  );
}
