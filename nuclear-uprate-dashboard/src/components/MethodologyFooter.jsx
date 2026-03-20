import { COLORS as C, FONTS } from "../data/constants.js";
const serif = FONTS.serif;
const mono  = FONTS.mono;

export default function MethodologyFooter() {
  return (
    <>
      <div style={{border:`2px solid ${C.ink}`, borderLeft:`4px solid ${C.blue}`, padding:"14px 18px", marginTop:20}}>
        <div style={{fontWeight:700, fontVariant:"small-caps", letterSpacing:"0.1em", fontSize:12, marginBottom:8, paddingBottom:6, borderBottom:`1px solid ${C.g30}`}}>
          A Note on Methodology
        </div>
        <div style={{fontSize:12.5, lineHeight:1.6, color:C.g90, textAlign:"justify", hyphens:"auto"}}>
          <span style={{fontWeight:700}}>Operator-Reported Plans</span> are drawn from NEI's 2025 capacity survey, which identified approximately 8 GWe of additions this decade.
          This figure includes plant restarts (e.g., Palisades ~800 MWe electric, Crane ~835 MWe electric) and fuel-cycle efficiency extensions alongside traditional uprates — it is a broader measure of fleet capacity growth, not uprates alone.
          All reference-box figures are in MWe (electric output); plant-level headroom on the map is in MWt (thermal), reflecting the DOE source methodology.
          The <span style={{fontWeight:700}}>DOE UPRISE program</span> separately targets 5 GW of uprates and restarts by 2029 through federal cost-sharing and streamlined licensing support; this is the program's stated target, not a modeled forecast.
          The plant-level uprate headroom shown on the map is estimated using the DOE methodology (Larsen et al., INL/RPT-23-74681; INL/RPT-24-78810), which applies the highest historically achieved uprate per reactor type as a uniform ceiling — an upper bound, not a forecast.{" "}
          <span style={{fontWeight:700}}>State regulatory classifications</span> reflect conditions as of the FAI Playbook (Nov 2025).
          California is classified Restricted on the basis of its statutory HLW repository requirement, which remains in force notwithstanding the 2023 Diablo Canyon license extension.
        </div>
        <div style={{fontSize:11, fontStyle:"italic", color:C.warm, marginTop:10}}>
          Industry-standard plant-specific feasibility analysis (per NEI-08-10 and EPRI's 2023 Feasibility Study Guideline) requires vendor-led assessment of each unit's NSSS and BOP constraints.
          Even nominally identical plants may require separate uprate programs.
          See: IAEA NE Series No. NP-T-3.9 (2011); Westinghouse Uprating Programs Technology; MIT CANES Mega-Uprates Thesis (2014).
        </div>
      </div>

      <footer style={{borderTop:`2px solid ${C.ink}`, paddingTop:14, marginTop:20, fontSize:11, color:C.g50, textAlign:"center", fontStyle:"italic"}}>
        Sources: INL/RPT-24-78810 (2024) · INL/RPT-23-74681 (2023) · FAI State Permitting Playbook Nuclear Supplement (2025) · NEI 2025 Survey · DOE Pathways to Commercial Liftoff: Advanced Nuclear (2024) · DOE UPRISE Program · NRC Approved Applications for Power Uprates · NRC Power Reactor Status Report · 42 U.S.C. § 4321 (NEPA); NUREG-1748 · EIA Electric Power Annual.
      </footer>
    </>
  );
}
