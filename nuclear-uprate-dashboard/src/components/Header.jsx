import { COLORS as C, serif, mono } from "../data/constants.js";

export default function Header() {
  return (
    <header className="header-pad" style={{background:C.ink, color:C.paper, padding:"24px 36px", display:"flex", alignItems:"center"}}>
      <div className="header-spacer" style={{flex:1}}/>
      <div className="header-center" style={{textAlign:"center"}}>
        <h1 style={{fontSize:22, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", margin:"0 0 6px", fontFamily:serif}}>
          Nuclear Uprate Opportunity Map
        </h1>
        <p style={{fontSize:13, fontStyle:"italic", color:C.g30, margin:"0 0 6px"}}>
          Theoretical Capacity Additions for the U.S. Commercial Reactor Fleet
        </p>
        <p style={{fontFamily:mono, fontSize:10, color:C.g50, letterSpacing:"0.08em", textTransform:"uppercase", margin:0}}>
          Last updated: {__BUILD_DATE__}
        </p>
      </div>
      <div style={{flex:1, display:"flex", justifyContent:"flex-end"}}>
        <div className="logo-tip" style={{display:"inline-block", position:"relative", cursor:"pointer"}}>
          <img
            src={`${import.meta.env.BASE_URL}nuclear-barbarians-logo.png`}
            alt="Nuclear Barbarians"
            className="header-logo"
            style={{height:48, display:"block"}}
          />
          <div className="logo-tooltip" style={{
            display:"none", position:"absolute", top:"calc(100% + 8px)", right:0,
            width:300, background:C.newsprint, color:C.ink, border:`2px solid ${C.g30}`,
            padding:"12px 14px", zIndex:100, fontSize:12, lineHeight:1.6,
            fontFamily:serif, textAlign:"left", boxShadow:"0 2px 8px rgba(0,0,0,0.3)"
          }}>
            This is a{" "}
            <a href="https://www.nuclearbarbarians.com/" target="_blank" rel="noreferrer" style={{color:C.blue, fontWeight:700}}>Nuclear Barbarians</a>
            {" "}project, which is part of the Foundation for American Innovation. To support this project and others like it,{" "}
            <a href="https://www.thefai.org/donate" target="_blank" rel="noreferrer" style={{color:C.blue, fontWeight:700}}>click here</a>.
          </div>
        </div>
      </div>
    </header>
  );
}
