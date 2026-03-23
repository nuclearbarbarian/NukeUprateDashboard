import { COLORS as C, LABEL_STYLE } from "../data/constants.js";

export default function EstimateBox() {
  return (
    <div style={{border:`2px solid ${C.ink}`, padding:"14px 18px", marginBottom:18}}>
      <div style={{fontWeight:700, fontVariant:"small-caps", letterSpacing:"0.1em", fontSize:12, marginBottom:10, paddingBottom:6, borderBottom:`1px solid ${C.g30}`}}>
        Uprate Capacity Estimates — Two Reference Points
      </div>
      <div style={{display:"flex", gap:24, flexWrap:"wrap", alignItems:"flex-end"}}>

        {/* NEI operator plans */}
        <div style={{flex:"1 1 200px", minWidth:0}}>
          <div style={{...LABEL_STYLE, marginBottom:3}}>
            Operator-Reported Plans <span style={{color:C.g50}}>(NEI 2025 Survey)</span>
          </div>
          <div style={{fontSize:22, fontWeight:700, fontFamily:LABEL_STYLE.fontFamily, color:C.green}}>
            ~8,000 <span style={{fontSize:12, fontWeight:400, color:C.g70}}>MWe (electric)</span>
            <span style={{fontSize:14, fontWeight:400, color:C.g50, marginLeft:12}}>≈ 8 GWe this decade</span>
          </div>
          <div style={{fontSize:10, fontStyle:"italic", color:C.g50, marginTop:3}}>Includes restarts &amp; fuel-cycle extensions</div>
        </div>

        {/* UPRISE */}
        <div style={{flex:"1 1 200px", minWidth:0}}>
          <div style={{...LABEL_STYLE, marginBottom:3}}>
            DOE UPRISE Target <span style={{color:C.g50}}>(Federal Program)</span>
          </div>
          <div style={{fontSize:22, fontWeight:700, fontFamily:LABEL_STYLE.fontFamily, color:C.uprise}}>
            5,000 <span style={{fontSize:12, fontWeight:400, color:C.g70}}>MWe (electric)</span>
            <span style={{fontSize:14, fontWeight:400, color:C.g50, marginLeft:12}}>5 GW by 2029</span>
          </div>
          <div style={{fontSize:10, fontStyle:"italic", color:C.g50, marginTop:3}}>Stated program target; uprates &amp; restarts, DOE-funded</div>
        </div>

        {/* Annotation */}
        <div style={{flex:"1 1 180px", fontSize:12, fontStyle:"italic", color:C.g70, lineHeight:1.5}}>
          The NEI 2025 figure includes restarts (Palisades ~800 MWe, Crane ~800 MWe) and fuel-cycle extensions alongside traditional uprates.
          The UPRISE target reflects a federal cost-share program focused specifically on uprates and restarts by 2029.
          These figures are not additive — UPRISE draws from the same project pool as operator-reported plans.
        </div>

      </div>
    </div>
  );
}
