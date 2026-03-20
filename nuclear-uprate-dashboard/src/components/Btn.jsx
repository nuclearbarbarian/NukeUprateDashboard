import { COLORS as C, mono } from "../data/constants.js";

export default function Btn({ on, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding:"3px 10px", fontSize:11, fontWeight:on?700:400,
      border:on?`2px solid ${C.ink}`:`1px solid ${C.g30}`, borderRadius:0,
      cursor:"pointer", background:on?C.ink:"transparent",
      color:on?C.paper:C.g70, fontFamily:mono, transition:"all 0.1s",
      letterSpacing:"0.02em"
    }}>{children}</button>
  );
}
