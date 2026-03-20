import { useMemo } from "react";
import { COLORS as C, ENV_COLORS as ENV_C, serif, mono, LABEL_STYLE } from "../data/constants.js";
import { STATE_REGULATORY as SD } from "../data/states.js";

// Static field definitions — tooltip strings are long literals, build once
const FIELDS = [
  { l:"Reactor Type",   k:"type", hdr:"Reactor Type",
    tip:"PWRs (Pressurized Water Reactors) keep coolant under high pressure to prevent boiling; heat transfers to a secondary steam loop via steam generators. BWRs (Boiling Water Reactors) boil water directly in the reactor vessel to drive the turbine. The majority of the U.S. commercial fleet is PWR." },
  { l:"NSSS Design",    k:"lp",   hdr:"Nuclear Steam Supply System",
    tip:"The core reactor design from the original vendor — a key factor in uprate feasibility and available engineering support. Common designators: Westinghouse (W), GE (now GE-Hitachi), Combustion Engineering (CE, now Framatome), and Babcock & Wilcox (B&W, now BWX Technologies). These are historical design lineages; current licensing and engineering support flows through the successor entities." },
  { l:"Market",         k:"mkt",  hdr:"Market Structure",
    tip:"Regulated plants operate under cost-of-service rate cases — utilities recover uprate costs through rate increases approved by state PUCs. Merchant plants sell power at market prices; uprate returns depend on capacity revenues and energy market conditions." },
  { l:"Max Uprate Cap", k:"cap",  hdr:"Maximum Uprate Cap", fmt:v=>`${(v*100).toFixed(0)}%`,
    tip:"The maximum thermal power uprate recorded or projected for this reactor, based on plant-specific NRC analysis. Extended Power Uprates (EPUs) can approach the physical and licensing limits of the plant. Measurement Uncertainty Recapture (MUR) uprates are typically 1–2% and require a formal license amendment, though with less supporting analysis than an EPU." },
  { l:"State SEPA",     k:"sepa", hdr:"State Environmental Policy Act", fmt:(_,sd)=>sd?.sepa?"Yes":"No",
    tip:"A state-level environmental review law analogous to federal NEPA. State SEPAs do not govern NRC license amendments, which are a federal process. However, uprate projects may involve state-permitted ancillary work — transmission, water permits, site construction — where a SEPA review could apply. Applicability varies by state." },
  { l:"Cycle",          k:"type", fmt:v=>v==="BWR"?"Direct":"Indirect" },
];

const MOR_TIPS = {
  "HLW Repository Req.":    "State law bars construction of new nuclear plants until a federally licensed high-level waste repository is operational. NRC license amendments for uprates at existing plants are a federal process not directly blocked by this law, but it signals significant state-level political risk for new nuclear investment.",
  "Certificate-of-Need Ban":"Minnesota law (Minn. Stat. § 216B.243) prohibits the PUC from issuing a certificate of need for nuclear generating plants. Any regulated-utility uprate that requires PUC approval for new capital expenditure could face challenges under this statute.",
  "Coastal Limits":         "New Jersey's Coastal Area Facility Review Act (CAFRA) imposes additional permitting requirements for major power plant expansions in coastal zones. Plants within a CAFRA zone may require supplemental state review for uprate-related construction.",
  "LIPA Area Ban":          "New York law prohibits nuclear power plants in the Long Island Power Authority service territory. Existing plants outside the LIPA zone (Ginna, Nine Mile Point, Indian Point) are not directly restricted by this provision.",
};

function Alert({ color, text, tip }) {
  if (!tip) {
    return (
      <div style={{fontSize:12, color, fontWeight:700, marginBottom:10, padding:"6px 10px", borderLeft:`3px solid ${color}`, background:`${color}08`}}>
        {text}
      </div>
    );
  }
  return (
    <div className="sepa-tip" style={{position:"relative", marginBottom:10}}>
      <div style={{fontSize:12, color, fontWeight:700, padding:"6px 10px", borderLeft:`3px solid ${color}`, background:`${color}08`, cursor:"help"}}>
        {text} <span style={{fontSize:10, opacity:0.7}}> (?)</span>
      </div>
      <div className="sepa-tooltip" style={{display:"none", position:"absolute", top:"calc(100% + 4px)", left:0,
        width:280, background:C.paper, border:`2px solid ${C.ink}`, padding:"10px 12px", zIndex:20,
        fontSize:12, lineHeight:1.5, fontFamily:serif, color:C.g90}}>
        {tip}
      </div>
    </div>
  );
}

function PlantDetail({ sel, setSel, sp }) {
  const sd = SD[sel.state];
  const sa = sp.reduce((s,p)=>s+p.add, 0);
  const sr = sp.reduce((s,p)=>s+p.ref, 0);

  return (
    <div style={{padding:20}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12}}>
        <div>
          <h2 style={{fontSize:18, fontWeight:700, margin:0}}>{sel.name.replace(/ \d$/,"")}</h2>
          <p style={{fontSize:11, color:C.g70, fontFamily:mono, margin:"3px 0 0"}}>{sel.state} · {sel.type} · {sel.lp} · {sel.mkt}</p>
        </div>
        <button onClick={()=>setSel(null)} style={{background:"none", border:`1px solid ${C.g30}`, color:C.g70, padding:"2px 8px", cursor:"pointer", fontFamily:mono, fontSize:11}}>✕</button>
      </div>

      <div style={{display:"inline-block", padding:"3px 10px", fontSize:11, fontWeight:700, fontFamily:mono, letterSpacing:"0.05em",
        border:`2px solid ${ENV_C[sd?.env]}`, color:ENV_C[sd?.env], marginBottom:12}}>
        {sd?.env?.toUpperCase()} PATH
      </div>

      {sd?.mor!=="None" && sd?.mor!=="Repealed" && <Alert color={C.red} text={`Moratorium: ${sd.mor}`} tip={MOR_TIPS[sd.mor]}/>}
      {sd?.waste!=="None"                        && <Alert color={C.yellow} text={`Waste: ${sd.waste}`}/>}

      <table style={{width:"100%", borderCollapse:"collapse", fontSize:12, fontFamily:mono, marginBottom:14}}>
        <thead><tr>
          {["UNIT","REF MWt","UPRATED","ADD MWt"].map((h,i)=>(
            <th key={h} style={{textAlign:i===0?"left":"right", padding:"4px 6px", borderBottom:`2px solid ${C.ink}`, fontSize:10, letterSpacing:"0.05em"}}>{h}</th>
          ))}
        </tr></thead>
        <tbody>{sp.map((p,i)=>(
          <tr key={i}>
            <td style={{padding:"4px 6px", borderBottom:`1px solid ${C.g15}`, fontWeight:700, fontFamily:serif, fontSize:12}}>{p.name}</td>
            <td style={{padding:"4px 6px", borderBottom:`1px solid ${C.g15}`, textAlign:"right"}}>{p.ref.toLocaleString()}</td>
            <td style={{padding:"4px 6px", borderBottom:`1px solid ${C.g15}`, textAlign:"right"}}>{(p.up*100).toFixed(1)}%</td>
            <td style={{padding:"4px 6px", borderBottom:`1px solid ${C.g15}`, textAlign:"right", fontWeight:700, color:p.add>0?C.blue:C.g50}}>+{Math.round(p.add)}</td>
          </tr>
        ))}</tbody>
      </table>

      {sa>0 && (
        <div style={{marginBottom:14}}>
          <div style={{display:"flex", justifyContent:"space-between", ...LABEL_STYLE, marginBottom:3}}>
            <span>Current → Theoretical Cap</span>
            <span style={{color:C.blue, fontWeight:700}}>+{Math.round(sa).toLocaleString()} MWt</span>
          </div>
          <div style={{height:8, background:`linear-gradient(90deg,${C.g70} 0%,${C.g70} ${(sr/(sr+sa))*100}%,${C.blue} ${(sr/(sr+sa))*100}%,${C.blue} 100%)`}}/>
        </div>
      )}

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
        {FIELDS.map((d,i)=>{
          const v = d.fmt ? d.fmt(sel[d.k], sd) : sel[d.k];
          const col = i%3;
          const tipPos   = col===0 ? {left:0}  : col===2 ? {right:0}  : {left:"50%", transform:"translateX(-50%)"};
          const caretPos = col===0 ? {left:16} : col===2 ? {right:16, left:"auto"} : {left:"50%", marginLeft:-5};
          return (
            <div key={i} style={{padding:"8px 10px", background:C.newsprint, border:`1px solid ${C.g30}`, position:"relative", cursor:d.tip?"help":"default"}}
              className={d.tip?"sepa-tip":""}>
              <div style={{...LABEL_STYLE, fontSize:9, marginBottom:2}}>
                {d.l}{d.tip && <span style={{marginLeft:4, color:C.g50}}>(?)</span>}
              </div>
              <div style={{fontSize:14, fontWeight:700}}>{v}</div>
              {d.tip && (
                <div className="sepa-tooltip" style={{display:"none", position:"absolute", bottom:"calc(100% + 6px)", ...tipPos,
                  width:260, background:C.paper, border:`2px solid ${C.ink}`, padding:"10px 12px", zIndex:20,
                  fontSize:12, lineHeight:1.5, fontFamily:serif, color:C.g90}}>
                  <div style={{...LABEL_STYLE, fontSize:9, fontWeight:700, marginBottom:4, color:C.ink}}>{d.hdr}</div>
                  {d.tip}
                  <div style={{position:"absolute", bottom:-6, ...caretPos, width:10, height:10, background:C.paper, borderRight:`2px solid ${C.ink}`, borderBottom:`2px solid ${C.ink}`, transform:"rotate(45deg)"}}/>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopOpportunities({ sites, hov, setHov, setSel }) {
  const top20 = useMemo(()=>sites.filter(s=>s.add>0).sort((a,b)=>b.add-a.add).slice(0,20), [sites]);
  return (
    <div style={{padding:16}}>
      <h3 style={{fontSize:14, fontWeight:700, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.05em", fontVariant:"small-caps"}}>
        Top Uprate Opportunities
      </h3>
      <div style={{borderBottom:`1px solid ${C.g30}`, marginBottom:10}}/>
      {top20.map((s,i)=>{
        const sd  = SD[s.st];
        const lab = s.ps.length>1 ? `${s.ps[0].name.replace(/ \d$/,"")} (${s.ps.length}u)` : s.ps[0].name;
        return (
          <div key={i} onClick={()=>setSel(s.ps[0])} onMouseEnter={()=>setHov(s)} onMouseLeave={()=>setHov(null)}
            style={{display:"flex", alignItems:"center", gap:8, padding:"6px 8px", cursor:"pointer",
              borderBottom:`1px solid ${C.g15}`, background:hov===s?C.newsprint:"transparent", transition:"background 0.1s"}}>
            <div style={{width:8, height:8, flexShrink:0, background:ENV_C[sd?.env]||C.g50, border:`1px solid ${C.g50}`}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:700}}>{lab}</div>
              <div style={{fontSize:10, color:C.g70, fontFamily:mono}}>{s.st} · {s.ps[0].type} · {s.ps[0].mkt}</div>
            </div>
            <div style={{fontFamily:mono, fontSize:12, fontWeight:700, color:C.blue, flexShrink:0}}>+{Math.round(s.add).toLocaleString()}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function DetailPanel({ sel, setSel, sp, sites, hov, setHov }) {
  return (
    <div style={{flex:"0 0 320px", background:C.paper, border:`1px solid ${C.g30}`, overflow:"visible"}}>
      {sel
        ? <PlantDetail sel={sel} setSel={setSel} sp={sp}/>
        : <TopOpportunities sites={sites} hov={hov} setHov={setHov} setSel={setSel}/>
      }
    </div>
  );
}
