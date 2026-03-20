import { COLORS as C, mono } from "../data/constants.js";

export default function Tooltip({ text, children }) {
  return (
    <span style={{position:"relative", display:"inline-block"}}
      onMouseEnter={e=>e.currentTarget.querySelector(".tt").style.display="block"}
      onMouseLeave={e=>e.currentTarget.querySelector(".tt").style.display="none"}>
      {children}
      <span className="tt" style={{
        display:"none", position:"absolute", bottom:"calc(100% + 6px)",
        left:"50%", transform:"translateX(-50%)", width:220,
        background:C.ink, color:C.newsprint, fontSize:11, lineHeight:1.5,
        padding:"8px 10px", fontFamily:mono,
        letterSpacing:"0.01em", zIndex:100, pointerEvents:"none",
        boxShadow:"0 2px 8px rgba(0,0,0,0.3)"
      }}>
        {text}
        <span style={{
          position:"absolute", top:"100%", left:"50%",
          transform:"translateX(-50%)", border:"5px solid transparent",
          borderTopColor:C.ink
        }}/>
      </span>
    </span>
  );
}
