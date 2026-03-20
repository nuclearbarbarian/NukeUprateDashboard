/**
 * Penney Design System — Color Palette & Constants
 */

// Core palette
export const COLORS = {
  ink:      "#1A1A1A",
  newsprint:"#F5F2E8",
  paper:    "#FDFCF9",
  warm:     "#9C9788",
  blue:     "#2B4B6F",
  red:      "#8B2B2B",
  yellow:   "#C4A035",
  green:    "#3D5C3D",
  uprise:   "#8B4513",   // DOE UPRISE program — saddle brown
  g90:      "#2D2D2D",
  g70:      "#5C5C5C",
  g50:      "#8A8A8A",
  g30:      "#B8B8B8",
  g15:      "#DCDCDC",
};

// Regulatory environment → spot color mapping
export const ENV_COLORS = {
  Clear:      COLORS.green,
  Mixed:      COLORS.yellow,
  Restricted: COLORS.red,
};

// Typography shorthand (for inline styles)
export const FONTS = {
  serif: "'Source Serif 4','Charter','Georgia',serif",
  mono:  "'IBM Plex Mono','Consolas',monospace",
};
export const serif = FONTS.serif;
export const mono  = FONTS.mono;

// Shared label style — warm mono uppercase caps, used across components
export const LABEL_STYLE = {
  fontFamily: FONTS.mono,
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: COLORS.warm,
};

// FIPS code → state abbreviation
export const FIPS_TO_STATE = {
  1:"AL",2:"AK",4:"AZ",5:"AR",6:"CA",8:"CO",9:"CT",10:"DE",
  12:"FL",13:"GA",15:"HI",16:"ID",17:"IL",18:"IN",19:"IA",20:"KS",
  21:"KY",22:"LA",23:"ME",24:"MD",25:"MA",26:"MI",27:"MN",28:"MS",
  29:"MO",30:"MT",31:"NE",32:"NV",33:"NH",34:"NJ",35:"NM",36:"NY",
  37:"NC",38:"ND",39:"OH",40:"OK",41:"OR",42:"PA",44:"RI",45:"SC",
  46:"SD",47:"TN",48:"TX",49:"UT",50:"VT",51:"VA",53:"WA",54:"WV",
  55:"WI",56:"WY",
};

// TopoJSON source for US state boundaries
export const US_TOPO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
