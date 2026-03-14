import { useState, useEffect, useMemo, useCallback } from "react";
import * as d3 from "d3";

/*
 * ════════════════════════════════════════════════════════════
 *  PENNEY DESIGN SYSTEM — 1940s Trade Journal Aesthetic
 *  Nuclear Uprate Opportunity Map
 *  Sources: INL/RPT-24-78810 · FAI Permitting Playbook (2025)
 * ════════════════════════════════════════════════════════════
 */

// ── PLANT DATA (FAI Appendix B / INL Report) ──────────────
const PLANTS = [
  // AL
  { name:"Farley 1",state:"AL",type:"PWR",lp:"W 3-Loop",ref:2775,up:0.063,cap:0.20,add:358,lat:31.22,lon:-85.11,mkt:"Reg." },
  { name:"Farley 2",state:"AL",type:"PWR",lp:"W 3-Loop",ref:2775,up:0.063,cap:0.20,add:358,lat:31.22,lon:-85.11,mkt:"Reg." },
  { name:"Browns Ferry 1",state:"AL",type:"BWR",lp:"GE BWR/4",ref:3952,up:0.200,cap:0.20,add:0,lat:34.70,lon:-87.12,mkt:"Reg." },
  { name:"Browns Ferry 2",state:"AL",type:"BWR",lp:"GE BWR/4",ref:3952,up:0.198,cap:0.20,add:0,lat:34.70,lon:-87.12,mkt:"Reg." },
  { name:"Browns Ferry 3",state:"AL",type:"BWR",lp:"GE BWR/4",ref:3952,up:0.198,cap:0.20,add:0,lat:34.70,lon:-87.12,mkt:"Reg." },
  // AR
  { name:"Arkansas Nuclear 1",state:"AR",type:"PWR",lp:"B&W 2-Loop",ref:2568,up:0,cap:0.016,add:41,lat:35.31,lon:-93.23,mkt:"Reg." },
  { name:"Arkansas Nuclear 2",state:"AR",type:"PWR",lp:"CE 2-Loop",ref:3026,up:0.075,cap:0.18,add:296,lat:35.31,lon:-93.23,mkt:"Reg." },
  // AZ
  { name:"Palo Verde 1",state:"AZ",type:"PWR",lp:"CE System 80",ref:3990,up:0.050,cap:0.05,add:0,lat:33.39,lon:-112.86,mkt:"Reg." },
  { name:"Palo Verde 2",state:"AZ",type:"PWR",lp:"CE System 80",ref:3990,up:0.050,cap:0.05,add:0,lat:33.39,lon:-112.86,mkt:"Reg." },
  { name:"Palo Verde 3",state:"AZ",type:"PWR",lp:"CE System 80",ref:3990,up:0.050,cap:0.05,add:0,lat:33.39,lon:-112.86,mkt:"Reg." },
  // CA
  { name:"Diablo Canyon 1",state:"CA",type:"PWR",lp:"W 4-Loop",ref:3411,up:0.02,cap:0.09,add:234,lat:35.21,lon:-120.86,mkt:"Reg." },
  { name:"Diablo Canyon 2",state:"CA",type:"PWR",lp:"W 4-Loop",ref:3411,up:0,cap:0.09,add:307,lat:35.21,lon:-120.86,mkt:"Reg." },
  // CT
  { name:"Millstone 2",state:"CT",type:"PWR",lp:"CE 2-Loop",ref:2700,up:0.05,cap:0.18,add:334,lat:41.31,lon:-72.17,mkt:"Merch." },
  { name:"Millstone 3",state:"CT",type:"PWR",lp:"W 4-Loop",ref:3650,up:0.087,cap:0.09,add:0,lat:41.31,lon:-72.17,mkt:"Merch." },
  // FL
  { name:"St. Lucie 1",state:"FL",type:"PWR",lp:"CE 2-Loop",ref:3020,up:0.181,cap:0.18,add:0,lat:27.35,lon:-80.25,mkt:"Reg." },
  { name:"St. Lucie 2",state:"FL",type:"PWR",lp:"CE 2-Loop",ref:3020,up:0.181,cap:0.18,add:0,lat:27.35,lon:-80.25,mkt:"Reg." },
  { name:"Turkey Point 3",state:"FL",type:"PWR",lp:"W 3-Loop",ref:2644,up:0.202,cap:0.20,add:0,lat:25.44,lon:-80.33,mkt:"Reg." },
  { name:"Turkey Point 4",state:"FL",type:"PWR",lp:"W 3-Loop",ref:2644,up:0.202,cap:0.20,add:0,lat:25.44,lon:-80.33,mkt:"Reg." },
  // GA
  { name:"Hatch 1",state:"GA",type:"BWR",lp:"GE BWR/4",ref:2804,up:0.151,cap:0.20,add:119,lat:31.93,lon:-82.34,mkt:"Reg." },
  { name:"Hatch 2",state:"GA",type:"BWR",lp:"GE BWR/4",ref:2804,up:0.151,cap:0.20,add:119,lat:31.93,lon:-82.34,mkt:"Reg." },
  { name:"Vogtle 1",state:"GA",type:"PWR",lp:"W 4-Loop",ref:3626,up:0.063,cap:0.09,add:93,lat:33.14,lon:-81.76,mkt:"Reg." },
  { name:"Vogtle 2",state:"GA",type:"PWR",lp:"W 4-Loop",ref:3626,up:0.063,cap:0.09,add:93,lat:33.14,lon:-81.76,mkt:"Reg." },
  { name:"Vogtle 3",state:"GA",type:"PWR",lp:"W AP1000",ref:3400,up:0,cap:0,add:0,lat:33.14,lon:-81.76,mkt:"Reg." },
  { name:"Vogtle 4",state:"GA",type:"PWR",lp:"W AP1000",ref:3400,up:0,cap:0,add:0,lat:33.14,lon:-81.76,mkt:"Reg." },
  // IL
  { name:"Braidwood 1",state:"IL",type:"PWR",lp:"W 4-Loop",ref:3645,up:0.067,cap:0.09,add:79,lat:41.24,lon:-88.23,mkt:"Merch." },
  { name:"Braidwood 2",state:"IL",type:"PWR",lp:"W 4-Loop",ref:3645,up:0.067,cap:0.09,add:79,lat:41.24,lon:-88.23,mkt:"Merch." },
  { name:"Byron 1",state:"IL",type:"PWR",lp:"W 4-Loop",ref:3645,up:0.067,cap:0.09,add:79,lat:42.08,lon:-89.28,mkt:"Merch." },
  { name:"Byron 2",state:"IL",type:"PWR",lp:"W 4-Loop",ref:3645,up:0.067,cap:0.09,add:79,lat:42.08,lon:-89.28,mkt:"Merch." },
  { name:"Clinton",state:"IL",type:"BWR",lp:"GE BWR/6",ref:3473,up:0.200,cap:0.20,add:0,lat:40.17,lon:-88.83,mkt:"Merch." },
  { name:"Dresden 2",state:"IL",type:"BWR",lp:"GE BWR/3",ref:2957,up:0.17,cap:0.20,add:76,lat:41.39,lon:-88.27,mkt:"Merch." },
  { name:"Dresden 3",state:"IL",type:"BWR",lp:"GE BWR/3",ref:2957,up:0.17,cap:0.20,add:76,lat:41.39,lon:-88.27,mkt:"Merch." },
  { name:"LaSalle 1",state:"IL",type:"BWR",lp:"GE BWR/5",ref:3546,up:0.067,cap:0.20,add:443,lat:41.24,lon:-88.67,mkt:"Merch." },
  { name:"LaSalle 2",state:"IL",type:"BWR",lp:"GE BWR/5",ref:3546,up:0.067,cap:0.20,add:443,lat:41.24,lon:-88.67,mkt:"Merch." },
  { name:"Quad Cities 1",state:"IL",type:"BWR",lp:"GE BWR/3",ref:2957,up:0.178,cap:0.20,add:55,lat:41.73,lon:-90.31,mkt:"Merch." },
  { name:"Quad Cities 2",state:"IL",type:"BWR",lp:"GE BWR/3",ref:2957,up:0.178,cap:0.20,add:55,lat:41.73,lon:-90.31,mkt:"Merch." },
  // KS
  { name:"Wolf Creek",state:"KS",type:"PWR",lp:"W 4-Loop",ref:3565,up:0.045,cap:0.09,add:154,lat:38.24,lon:-95.69,mkt:"Reg." },
  // LA
  { name:"River Bend",state:"LA",type:"BWR",lp:"GE BWR/6",ref:3091,up:0.068,cap:0.20,add:383,lat:30.76,lon:-91.33,mkt:"Reg." },
  { name:"Waterford 3",state:"LA",type:"PWR",lp:"CE 2-Loop",ref:3716,up:0.096,cap:0.18,add:284,lat:30.00,lon:-90.47,mkt:"Reg." },
  // MD
  { name:"Calvert Cliffs 1",state:"MD",type:"PWR",lp:"CE 2-Loop",ref:2737,up:0.070,cap:0.18,add:282,lat:38.43,lon:-76.44,mkt:"Merch." },
  { name:"Calvert Cliffs 2",state:"MD",type:"PWR",lp:"CE 2-Loop",ref:2737,up:0.070,cap:0.18,add:282,lat:38.43,lon:-76.44,mkt:"Merch." },
  // MI
  { name:"D.C. Cook 1",state:"MI",type:"PWR",lp:"W 4-Loop",ref:3304,up:0.017,cap:0.09,add:249,lat:41.98,lon:-86.56,mkt:"Reg." },
  { name:"D.C. Cook 2",state:"MI",type:"PWR",lp:"W 4-Loop",ref:3468,up:0.017,cap:0.09,add:144,lat:41.98,lon:-86.56,mkt:"Reg." },
  { name:"Fermi 2",state:"MI",type:"BWR",lp:"GE BWR/4",ref:3486,up:0.04,cap:0.20,add:536,lat:41.96,lon:-83.26,mkt:"Merch." },
  // MN
  { name:"Monticello",state:"MN",type:"BWR",lp:"GE BWR/3",ref:2004,up:0.200,cap:0.20,add:0,lat:45.33,lon:-93.85,mkt:"Reg." },
  { name:"Prairie Island 1",state:"MN",type:"PWR",lp:"W 2-Loop",ref:1677,up:0.016,cap:0.185,add:279,lat:44.62,lon:-92.63,mkt:"Reg." },
  { name:"Prairie Island 2",state:"MN",type:"PWR",lp:"W 2-Loop",ref:1677,up:0.016,cap:0.185,add:279,lat:44.62,lon:-92.63,mkt:"Reg." },
  // MS
  { name:"Grand Gulf",state:"MS",type:"BWR",lp:"GE BWR/6",ref:4408,up:0.150,cap:0.20,add:191,lat:32.00,lon:-91.05,mkt:"Reg." },
  // MO
  { name:"Callaway",state:"MO",type:"PWR",lp:"W 4-Loop",ref:3565,up:0.045,cap:0.09,add:154,lat:38.76,lon:-91.78,mkt:"Reg." },
  // NC
  { name:"Brunswick 1",state:"NC",type:"BWR",lp:"GE BWR/4",ref:2923,up:0.208,cap:0.20,add:0,lat:33.96,lon:-78.01,mkt:"Reg." },
  { name:"Brunswick 2",state:"NC",type:"BWR",lp:"GE BWR/4",ref:2923,up:0.208,cap:0.20,add:0,lat:33.96,lon:-78.01,mkt:"Reg." },
  { name:"McGuire 1",state:"NC",type:"PWR",lp:"W 4-Loop",ref:3411,up:0.017,cap:0.09,add:245,lat:35.43,lon:-80.95,mkt:"Reg." },
  { name:"McGuire 2",state:"NC",type:"PWR",lp:"W 4-Loop",ref:3411,up:0.017,cap:0.09,add:245,lat:35.43,lon:-80.95,mkt:"Reg." },
  { name:"Shearon Harris",state:"NC",type:"PWR",lp:"W 3-Loop",ref:2900,up:0.062,cap:0.20,add:378,lat:35.63,lon:-78.96,mkt:"Reg." },
  // NE
  { name:"Cooper",state:"NE",type:"BWR",lp:"GE BWR/4",ref:2419,up:0.016,cap:0.20,add:661,lat:40.36,lon:-95.64,mkt:"Reg." },
  // NH
  { name:"Seabrook",state:"NH",type:"PWR",lp:"W 4-Loop",ref:3648,up:0.070,cap:0.09,add:69,lat:42.90,lon:-70.85,mkt:"Merch." },
  // NJ
  { name:"Hope Creek",state:"NJ",type:"BWR",lp:"GE BWR/4",ref:3902,up:0.185,cap:0.20,add:50,lat:39.47,lon:-75.54,mkt:"Merch." },
  { name:"Salem 1",state:"NJ",type:"PWR",lp:"W 4-Loop",ref:3459,up:0.034,cap:0.09,add:186,lat:39.46,lon:-75.54,mkt:"Merch." },
  { name:"Salem 2",state:"NJ",type:"PWR",lp:"W 4-Loop",ref:3459,up:0.014,cap:0.09,add:259,lat:39.46,lon:-75.54,mkt:"Merch." },
  // NY
  { name:"FitzPatrick",state:"NY",type:"BWR",lp:"GE BWR/4",ref:2536,up:0.04,cap:0.20,add:390,lat:43.52,lon:-76.40,mkt:"Merch." },
  { name:"Ginna",state:"NY",type:"PWR",lp:"W 2-Loop",ref:1775,up:0.168,cap:0.185,add:26,lat:43.28,lon:-77.31,mkt:"Merch." },
  { name:"Nine Mile Pt 1",state:"NY",type:"BWR",lp:"GE BWR/2",ref:1850,up:0,cap:0.20,add:370,lat:43.52,lon:-76.41,mkt:"Merch." },
  { name:"Nine Mile Pt 2",state:"NY",type:"BWR",lp:"GE BWR/5",ref:3988,up:0.199,cap:0.20,add:0,lat:43.52,lon:-76.41,mkt:"Merch." },
  // OH
  { name:"Davis-Besse",state:"OH",type:"PWR",lp:"B&W 2-Loop",ref:2817,up:0.016,cap:0.02,add:0,lat:41.60,lon:-83.09,mkt:"Merch." },
  { name:"Perry 1",state:"OH",type:"BWR",lp:"GE BWR/6",ref:3756,up:0.05,cap:0.20,add:537,lat:41.80,lon:-81.14,mkt:"Merch." },
  // PA
  { name:"Beaver Valley 1",state:"PA",type:"PWR",lp:"W 3-Loop",ref:2900,up:0.095,cap:0.20,add:278,lat:40.62,lon:-80.43,mkt:"Merch." },
  { name:"Beaver Valley 2",state:"PA",type:"PWR",lp:"W 3-Loop",ref:2900,up:0.095,cap:0.20,add:278,lat:40.62,lon:-80.43,mkt:"Merch." },
  { name:"Limerick 1",state:"PA",type:"BWR",lp:"GE BWR/4",ref:3515,up:0.067,cap:0.20,add:439,lat:40.22,lon:-75.59,mkt:"Merch." },
  { name:"Limerick 2",state:"PA",type:"BWR",lp:"GE BWR/4",ref:3515,up:0.067,cap:0.20,add:439,lat:40.22,lon:-75.59,mkt:"Merch." },
  { name:"Peach Bottom 2",state:"PA",type:"BWR",lp:"GE BWR/4",ref:4016,up:0.219,cap:0.20,add:0,lat:39.76,lon:-76.27,mkt:"Merch." },
  { name:"Peach Bottom 3",state:"PA",type:"BWR",lp:"GE BWR/4",ref:4016,up:0.219,cap:0.20,add:0,lat:39.76,lon:-76.27,mkt:"Merch." },
  { name:"Susquehanna 1",state:"PA",type:"BWR",lp:"GE BWR/4",ref:3952,up:0.197,cap:0.20,add:0,lat:41.09,lon:-76.15,mkt:"Merch." },
  { name:"Susquehanna 2",state:"PA",type:"BWR",lp:"GE BWR/4",ref:3952,up:0.197,cap:0.20,add:0,lat:41.09,lon:-76.15,mkt:"Merch." },
  // SC
  { name:"Catawba 1",state:"SC",type:"PWR",lp:"W 4-Loop",ref:3469,up:0.017,cap:0.09,add:249,lat:35.05,lon:-81.07,mkt:"Reg." },
  { name:"Catawba 2",state:"SC",type:"PWR",lp:"W 4-Loop",ref:3411,up:0,cap:0.09,add:307,lat:35.05,lon:-81.07,mkt:"Reg." },
  { name:"Oconee 1",state:"SC",type:"PWR",lp:"B&W 2-Loop",ref:2568,up:0.016,cap:0.016,add:0,lat:34.79,lon:-82.90,mkt:"Reg." },
  { name:"Oconee 2",state:"SC",type:"PWR",lp:"B&W 2-Loop",ref:2568,up:0.016,cap:0.016,add:0,lat:34.79,lon:-82.90,mkt:"Reg." },
  { name:"Oconee 3",state:"SC",type:"PWR",lp:"B&W 2-Loop",ref:2568,up:0.016,cap:0.016,add:0,lat:34.79,lon:-82.90,mkt:"Reg." },
  { name:"Robinson 2",state:"SC",type:"PWR",lp:"W 3-Loop",ref:2339,up:0.063,cap:0.20,add:302,lat:34.40,lon:-80.16,mkt:"Reg." },
  { name:"Summer",state:"SC",type:"PWR",lp:"W 3-Loop",ref:2900,up:0.045,cap:0.20,add:430,lat:34.30,lon:-81.32,mkt:"Reg." },
  // TN
  { name:"Sequoyah 1",state:"TN",type:"PWR",lp:"W 4-Loop",ref:3455,up:0.013,cap:0.09,add:263,lat:35.23,lon:-85.09,mkt:"Reg." },
  { name:"Sequoyah 2",state:"TN",type:"PWR",lp:"W 4-Loop",ref:3455,up:0.013,cap:0.09,add:263,lat:35.23,lon:-85.09,mkt:"Reg." },
  { name:"Watts Bar 1",state:"TN",type:"PWR",lp:"W 4-Loop",ref:3459,up:0.014,cap:0.09,add:259,lat:35.60,lon:-84.79,mkt:"Reg." },
  { name:"Watts Bar 2",state:"TN",type:"PWR",lp:"W 4-Loop",ref:3459,up:0.014,cap:0.09,add:259,lat:35.60,lon:-84.79,mkt:"Reg." },
  // TX
  { name:"Comanche Peak 1",state:"TX",type:"PWR",lp:"W 4-Loop",ref:3612,up:0.060,cap:0.09,add:104,lat:32.30,lon:-97.79,mkt:"Merch." },
  { name:"Comanche Peak 2",state:"TX",type:"PWR",lp:"W 4-Loop",ref:3612,up:0.060,cap:0.09,add:103,lat:32.30,lon:-97.79,mkt:"Merch." },
  { name:"South Texas 1",state:"TX",type:"PWR",lp:"W 4-Loop",ref:3853,up:0.014,cap:0.09,add:289,lat:28.80,lon:-96.05,mkt:"Merch." },
  { name:"South Texas 2",state:"TX",type:"PWR",lp:"W 4-Loop",ref:3853,up:0.014,cap:0.09,add:289,lat:28.80,lon:-96.05,mkt:"Merch." },
  // VA
  { name:"North Anna 1",state:"VA",type:"PWR",lp:"W 3-Loop",ref:2940,up:0.059,cap:0.20,add:392,lat:38.06,lon:-77.79,mkt:"Reg." },
  { name:"North Anna 2",state:"VA",type:"PWR",lp:"W 3-Loop",ref:2940,up:0.059,cap:0.20,add:392,lat:38.06,lon:-77.79,mkt:"Reg." },
  { name:"Surry 1",state:"VA",type:"PWR",lp:"W 3-Loop",ref:2587,up:0.060,cap:0.20,add:343,lat:37.17,lon:-76.70,mkt:"Reg." },
  { name:"Surry 2",state:"VA",type:"PWR",lp:"W 3-Loop",ref:2587,up:0.060,cap:0.20,add:343,lat:37.17,lon:-76.70,mkt:"Reg." },
  // WA
  { name:"Columbia Generating",state:"WA",type:"BWR",lp:"GE BWR/5",ref:3544,up:0.059,cap:0.20,add:470,lat:46.47,lon:-119.33,mkt:"Reg." },
  // WI
  { name:"Point Beach 1",state:"WI",type:"PWR",lp:"W 2-Loop",ref:1800,up:0.186,cap:0.185,add:0,lat:44.28,lon:-87.54,mkt:"Reg." },
  { name:"Point Beach 2",state:"WI",type:"PWR",lp:"W 2-Loop",ref:1800,up:0.186,cap:0.185,add:0,lat:44.28,lon:-87.54,mkt:"Reg." },
];

const SD = {
  AL:{mor:"None",waste:"None",env:"Clear",sepa:false},AR:{mor:"None",waste:"None",env:"Clear",sepa:false},
  AZ:{mor:"None",waste:"None",env:"Clear",sepa:false},CA:{mor:"HLW Repository Req.",waste:"None",env:"Restricted",sepa:true},
  CT:{mor:"HLW Repository Req.",waste:"None",env:"Restricted",sepa:true},FL:{mor:"None",waste:"None",env:"Clear",sepa:false},
  GA:{mor:"None",waste:"None",env:"Clear",sepa:false},IL:{mor:"Repealed",waste:"None",env:"Clear",sepa:false},
  KS:{mor:"None",waste:"None",env:"Clear",sepa:false},LA:{mor:"None",waste:"HLW Import Ban",env:"Mixed",sepa:false},
  MD:{mor:"None",waste:"None",env:"Clear",sepa:true},MI:{mor:"None",waste:"None",env:"Clear",sepa:false},
  MN:{mor:"Certificate-of-Need Ban",waste:"None",env:"Restricted",sepa:false},MO:{mor:"None",waste:"None",env:"Clear",sepa:false},
  MS:{mor:"None",waste:"None",env:"Clear",sepa:false},NC:{mor:"None",waste:"None",env:"Clear",sepa:false},
  NE:{mor:"None",waste:"None",env:"Clear",sepa:false},NH:{mor:"None",waste:"None",env:"Clear",sepa:false},
  NJ:{mor:"Coastal Limits",waste:"None",env:"Mixed",sepa:false},NY:{mor:"LIPA Area Ban",waste:"None",env:"Mixed",sepa:true},
  OH:{mor:"None",waste:"None",env:"Clear",sepa:false},PA:{mor:"None",waste:"None",env:"Clear",sepa:false},
  SC:{mor:"None",waste:"None",env:"Clear",sepa:false},TN:{mor:"None",waste:"None",env:"Clear",sepa:false},
  TX:{mor:"None",waste:"HLW Storage Ban",env:"Mixed",sepa:false},VA:{mor:"None",waste:"None",env:"Clear",sepa:false},
  WA:{mor:"None",waste:"Import Ban",env:"Mixed",sepa:true},WI:{mor:"Repealed",waste:"None",env:"Clear",sepa:false},
};

// Penney palette
const C = { ink:"#1A1A1A",news:"#F5F2E8",paper:"#FDFCF9",warm:"#9C9788",blue:"#2B4B6F",red:"#8B2B2B",yellow:"#C4A035",green:"#3D5C3D",g90:"#2D2D2D",g70:"#5C5C5C",g50:"#8A8A8A",g30:"#B8B8B8",g15:"#DCDCDC" };
const ENV_C = { Clear:C.green, Mixed:C.yellow, Restricted:C.red };
const FIPS = {1:"AL",2:"AK",4:"AZ",5:"AR",6:"CA",8:"CO",9:"CT",10:"DE",12:"FL",13:"GA",15:"HI",16:"ID",17:"IL",18:"IN",19:"IA",20:"KS",21:"KY",22:"LA",23:"ME",24:"MD",25:"MA",26:"MI",27:"MN",28:"MS",29:"MO",30:"MT",31:"NE",32:"NV",33:"NH",34:"NJ",35:"NM",36:"NY",37:"NC",38:"ND",39:"OH",40:"OK",41:"OR",42:"PA",44:"RI",45:"SC",46:"SD",47:"TN",48:"TX",49:"UT",50:"VT",51:"VA",53:"WA",54:"WV",55:"WI",56:"WY"};

export default function Dashboard() {
  const [geo, setGeo] = useState(null);
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const [tp, setTp] = useState({x:0,y:0});
  const [fil, setFil] = useState({env:"All",type:"All",mkt:"All",hr:"All"});
  const [view, setView] = useState("uprate");
  const [mapEl, setMapEl] = useState(null);

  const proj = useMemo(()=>d3.geoAlbersUsa().scale(1080).translate([476,296]),[]);
  const path = useMemo(()=>d3.geoPath().projection(proj),[proj]);

  useEffect(()=>{fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(r=>r.json()).then(setGeo).catch(console.error)},[]);

  const feats = useMemo(()=>{
    if(!geo) return [];
    const {geometries}=geo.objects.states, {arcs:ta,transform:tr}=geo;
    const da=i=>{const rev=i<0,idx=rev?~i:i,a=ta[idx],c=[];let x=0,y=0;for(const[dx,dy]of a){x+=dx;y+=dy;c.push([tr?x*tr.scale[0]+tr.translate[0]:x,tr?y*tr.scale[1]+tr.translate[1]:y])}return rev?c.reverse():c};
    const dr=r=>{const c=[];for(const i of r){const d=da(i);c.push(...(c.length?d.slice(1):d))}return c};
    return geometries.map(g=>({type:"Feature",geometry:{type:g.type,coordinates:g.type==="Polygon"?g.arcs.map(dr):g.arcs.map(p=>p.map(dr))},id:g.id}));
  },[geo]);

  const filtered = useMemo(()=>PLANTS.filter(p=>{
    if(fil.type!=="All"&&p.type!==fil.type) return false;
    if(fil.mkt!=="All"&&!p.mkt.startsWith(fil.mkt.slice(0,3))) return false;
    if(fil.hr==="Headroom"&&p.add===0) return false;
    if(fil.hr==="Maxed"&&p.add>0) return false;
    const s=SD[p.state]; if(fil.env!=="All"&&s?.env!==fil.env) return false;
    return true;
  }),[fil]);

  const sites = useMemo(()=>{
    const m={};
    filtered.forEach(p=>{const k=`${p.lat}_${p.lon}`;if(!m[k])m[k]={lat:p.lat,lon:p.lon,ps:[],add:0,st:p.state};m[k].ps.push(p);m[k].add+=p.add});
    return Object.values(m);
  },[filtered]);

  const stats = useMemo(()=>{
    const t=filtered.reduce((s,p)=>s+p.add,0), hr=filtered.filter(p=>p.add>0).length;
    const ss=new Set(filtered.map(p=>p.state)), cl=[...ss].filter(s=>SD[s]?.env==="Clear").length;
    return {u:filtered.length,t,gwe:(t/3/1000).toFixed(1),hr,s:ss.size,cl};
  },[filtered]);

  const mx = useMemo(()=>Math.max(...sites.map(s=>s.add),1),[sites]);

  const gf = useCallback(fid=>{
    const a=FIPS[+fid],s=SD[a];
    if(view==="regulatory"&&s){
      return s.env==="Clear"?`${C.green}18`:s.env==="Mixed"?`${C.yellow}18`:`${C.red}18`;
    }
    return filtered.some(p=>p.state===a)?C.news:"#EAE7DD";
  },[view,filtered]);

  const serif = "'Source Serif 4','Charter','Georgia',serif";
  const mono = "'IBM Plex Mono','Consolas',monospace";

  const Btn = ({on,onClick,children})=>(
    <button onClick={onClick} style={{padding:"3px 10px",fontSize:11,fontWeight:on?700:400,
      border:on?`2px solid ${C.ink}`:`1px solid ${C.g30}`,borderRadius:0,cursor:"pointer",
      background:on?C.ink:"transparent",color:on?C.paper:C.g70,fontFamily:mono,transition:"all 0.1s",letterSpacing:"0.02em"}}>{children}</button>
  );

  return (
    <div style={{minHeight:"100vh",background:C.news,color:C.ink,fontFamily:serif}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;1,8..60,400&family=IBM+Plex+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${C.news}}::-webkit-scrollbar-thumb{background:${C.g30}}
        .sepa-tip:hover .sepa-tooltip{display:block!important}`}</style>

      {/* ── HEADER ────────────────────────────────── */}
      <header style={{background:C.ink,color:C.paper,padding:"24px 36px",textAlign:"center"}}>
        <img src={`${import.meta.env.BASE_URL}nuclear-barbarians-logo.png`} alt="Nuclear Barbarians" style={{height:48,marginBottom:12,display:"block",margin:"0 auto 12px"}}/>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",margin:"0 0 6px",fontFamily:serif}}>
          Nuclear Uprate Opportunity Map
        </h1>
        <p style={{fontSize:13,fontStyle:"italic",color:C.g30,margin:"0 0 10px"}}>
          Theoretical Capacity Additions for the U.S. Commercial Reactor Fleet
        </p>
        <p style={{fontFamily:mono,fontSize:10,color:C.g50,letterSpacing:"0.1em",textTransform:"uppercase"}}>
          INL/RPT-24-78810 &bull; FAI State Permitting Playbook Nuclear Supplement &bull; 2025
        </p>
      </header>

      <div style={{maxWidth:1380,margin:"0 auto",padding:"24px 36px"}}>
        {/* ── SUMMARY TABLE ──────────────────────── */}
        <div style={{display:"flex",gap:24,flexWrap:"wrap",borderBottom:`2px solid ${C.ink}`,paddingBottom:16,marginBottom:18}}>
          {[
            {l:"Reactor Units",v:stats.u},
            {l:"With Headroom",v:stats.hr},
            {l:"Theor. Addition",v:`${stats.t.toLocaleString()} MWt`},
            {l:"Elec. Equivalent",v:`≈ ${stats.gwe} GWe`},
            {l:"States",v:stats.s},
            {l:"Clear-Path States",v:stats.cl},
          ].map((s,i)=>(
            <div key={i} style={{flex:"1 1 130px"}}>
              <div style={{fontFamily:mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginBottom:2}}>{s.l}</div>
              <div style={{fontSize:20,fontWeight:700,fontFamily:mono}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* ── CONTROLS ───────────────────────────── */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:16}}>
          <span style={{fontFamily:mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginRight:6}}>View</span>
          {["uprate","regulatory"].map(m=>(
            <Btn key={m} on={view===m} onClick={()=>setView(m)}>{m==="uprate"?"Uprate Potential":"Regulatory"}</Btn>
          ))}
          <span style={{width:1,height:20,background:C.g30,margin:"0 8px"}}/>
          <span style={{fontFamily:mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginRight:6}}>Filter</span>
          {[{k:"type",o:["All","PWR","BWR"]},{k:"mkt",o:["All","Reg.","Merch."]},{k:"hr",o:["All","Headroom","Maxed"]},{k:"env",o:["All","Clear","Mixed","Restricted"]}].map(({k,o})=>(
            <div key={k} style={{display:"flex",gap:2}}>{o.map(v=><Btn key={v} on={fil[k]===v} onClick={()=>setFil(f=>({...f,[k]:v}))}>{v}</Btn>)}</div>
          ))}
        </div>

        {/* ── MAP + PANEL ────────────────────────── */}
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          <div ref={setMapEl} style={{flex:"1 1 680px",background:C.paper,border:`1px solid ${C.g30}`,position:"relative",overflow:"hidden"}}>
            <svg viewBox="0 0 960 600" style={{width:"100%",display:"block"}}>
              <rect width="960" height="600" fill={C.paper}/>
              {feats.map((f,i)=><path key={i} d={path(f)||""} fill={gf(f.id)} stroke={C.g30} strokeWidth={0.5}/>)}
              {sites.map((s,i)=>{
                const c=proj([s.lon,s.lat]); if(!c) return null;
                const hr=s.add>0, r=hr?3+(s.add/mx)*6.5:2.5;
                const sd=SD[s.st];
                const col=view==="regulatory"?(ENV_C[sd?.env]||C.g50):(hr?C.blue:C.g50);
                const isSel=sel&&s.ps.some(p=>p.name===sel.name);
                return(<g key={i} style={{cursor:"pointer"}} onClick={()=>setSel(s.ps[0])}
                  onMouseEnter={e=>{setHov(s);if(mapEl){const r=mapEl.getBoundingClientRect();setTp({x:e.clientX-r.left,y:e.clientY-r.top})}}}
                  onMouseLeave={()=>setHov(null)}>
                  {isSel&&<circle cx={c[0]} cy={c[1]} r={r+4} fill="none" stroke={col} strokeWidth={1.5} strokeDasharray="3,2"/>}
                  <circle cx={c[0]} cy={c[1]} r={r} fill={col} stroke={C.paper} strokeWidth={1} opacity={isSel?1:0.85}/>
                </g>);
              })}
            </svg>
            {/* Hover tooltip */}
            {hov&&!sel&&(
              <div style={{position:"absolute",left:Math.min(tp.x+14,480),top:tp.y-8,background:C.paper,border:`2px solid ${C.ink}`,padding:"10px 14px",pointerEvents:"none",zIndex:10,minWidth:220,fontFamily:serif}}>
                <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>
                  {hov.ps.length>1?`${hov.ps[0].name.replace(/ \d$/,"")} (${hov.ps.length} units)`:hov.ps[0].name}
                </div>
                <div style={{fontSize:11,color:C.g70,marginBottom:5,fontFamily:mono}}>{hov.st} · {hov.ps[0].type} · {hov.ps[0].lp} · {hov.ps[0].mkt}</div>
                <div style={{fontSize:13,fontWeight:700,color:hov.add>0?C.blue:C.g50}}>
                  {hov.add>0?`+${Math.round(hov.add).toLocaleString()} MWt headroom`:"Fully uprated — no headroom"}
                </div>
                {SD[hov.st]?.mor!=="None"&&SD[hov.st]?.mor!=="Repealed"&&(
                  <div style={{fontSize:10,color:C.red,marginTop:5,fontWeight:700}}>▸ {SD[hov.st].mor}</div>
                )}
              </div>
            )}
            {/* Legend */}
            <div style={{position:"absolute",bottom:8,left:8,display:"flex",gap:16,fontSize:10,fontFamily:mono,background:`${C.paper}ee`,padding:"6px 10px",border:`1px solid ${C.g30}`}}>
              {view==="regulatory"?Object.entries(ENV_C).map(([k,c])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:8,height:8,background:c,border:`1px solid ${C.g50}`}}/><span>{k}</span>
                </div>
              )):(
                <>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:"50%",background:C.blue}}/><span>Headroom</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:"50%",background:C.g50}}/><span>Maxed</span></div>
                  <span style={{color:C.warm}}>Marker size = MWt potential</span>
                </>
              )}
            </div>
          </div>

          {/* ── DETAIL PANEL ─────────────────────── */}
          <div style={{flex:"0 0 320px",maxHeight:560,overflowY:"auto",background:C.paper,border:`1px solid ${C.g30}`}}>
            {sel?(()=>{
              const sd=SD[sel.state], sp=PLANTS.filter(p=>p.lat===sel.lat&&p.lon===sel.lon);
              const sa=sp.reduce((s,p)=>s+p.add,0), sr=sp.reduce((s,p)=>s+p.ref,0);
              return(<div style={{padding:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <h2 style={{fontSize:18,fontWeight:700,margin:0,borderBottom:"none",paddingBottom:0}}>{sel.name.replace(/ \d$/,"")}</h2>
                    <p style={{fontSize:11,color:C.g70,fontFamily:mono,margin:"3px 0 0"}}>{sel.state} · {sel.type} · {sel.lp} · {sel.mkt}</p>
                  </div>
                  <button onClick={()=>setSel(null)} style={{background:"none",border:`1px solid ${C.g30}`,color:C.g70,padding:"2px 8px",cursor:"pointer",fontFamily:mono,fontSize:11}}>✕</button>
                </div>

                {/* Regulatory badge */}
                <div style={{display:"inline-block",padding:"3px 10px",fontSize:11,fontWeight:700,fontFamily:mono,letterSpacing:"0.05em",
                  border:`2px solid ${ENV_C[sd?.env]}`,color:ENV_C[sd?.env],marginBottom:12}}>
                  {sd?.env?.toUpperCase()} PATH
                </div>

                {sd?.mor!=="None"&&sd?.mor!=="Repealed"&&(
                  <div style={{fontSize:12,color:C.red,fontWeight:700,marginBottom:10,padding:"6px 10px",borderLeft:`3px solid ${C.red}`,background:`${C.red}08`}}>
                    Moratorium: {sd.mor}
                  </div>
                )}
                {sd?.waste!=="None"&&(
                  <div style={{fontSize:12,color:C.yellow,fontWeight:700,marginBottom:10,padding:"6px 10px",borderLeft:`3px solid ${C.yellow}`,background:`${C.yellow}08`}}>
                    Waste: {sd.waste}
                  </div>
                )}

                {/* Unit table */}
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:mono,marginBottom:14}}>
                  <thead><tr>
                    <th style={{textAlign:"left",padding:"4px 6px",borderBottom:`2px solid ${C.ink}`,fontSize:10,letterSpacing:"0.05em"}}>UNIT</th>
                    <th style={{textAlign:"right",padding:"4px 6px",borderBottom:`2px solid ${C.ink}`,fontSize:10}}>REF MWt</th>
                    <th style={{textAlign:"right",padding:"4px 6px",borderBottom:`2px solid ${C.ink}`,fontSize:10}}>UPRATED</th>
                    <th style={{textAlign:"right",padding:"4px 6px",borderBottom:`2px solid ${C.ink}`,fontSize:10}}>ADD MWt</th>
                  </tr></thead>
                  <tbody>{sp.map((p,i)=>(
                    <tr key={i}>
                      <td style={{padding:"4px 6px",borderBottom:`1px solid ${C.g15}`,fontWeight:700,fontFamily:serif,fontSize:12}}>{p.name}</td>
                      <td style={{padding:"4px 6px",borderBottom:`1px solid ${C.g15}`,textAlign:"right"}}>{p.ref.toLocaleString()}</td>
                      <td style={{padding:"4px 6px",borderBottom:`1px solid ${C.g15}`,textAlign:"right"}}>{(p.up*100).toFixed(1)}%</td>
                      <td style={{padding:"4px 6px",borderBottom:`1px solid ${C.g15}`,textAlign:"right",fontWeight:700,color:p.add>0?C.blue:C.g50}}>+{Math.round(p.add)}</td>
                    </tr>
                  ))}</tbody>
                </table>

                {/* Capacity bar */}
                {sa>0&&<div style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,fontFamily:mono,color:C.warm,marginBottom:3}}>
                    <span>Current → Theoretical Cap</span><span style={{color:C.blue,fontWeight:700}}>+{Math.round(sa).toLocaleString()} MWt</span>
                  </div>
                  <div style={{height:8,background:C.g15,overflow:"hidden"}}>
                    <div style={{height:"100%",background:`linear-gradient(90deg,${C.g70} 0%,${C.g70} ${(sr/(sr+sa))*100}%,${C.blue} ${(sr/(sr+sa))*100}%,${C.blue} 100%)`,width:"100%"}}/>
                  </div>
                </div>}

                {/* Details */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[{l:"Reactor Type",v:sel.type},{l:"NSSS Design",v:sel.lp},{l:"Market",v:sel.mkt},{l:"Max Uprate Cap",v:`${(sel.cap*100).toFixed(0)}%`},{l:"State SEPA",v:sd?.sepa?"Yes":"No",tip:"State Environmental Policy Act — a state-level equivalent of federal NEPA. States with a SEPA may require environmental impact review for uprate projects, adding time and cost to the permitting process."},{l:"Cycle",v:sel.type==="BWR"?"Direct":"Indirect"}].map((d,i)=>(
                    <div key={i} style={{padding:"8px 10px",background:C.news,border:`1px solid ${C.g30}`,position:"relative",cursor:d.tip?"help":"default"}}
                      className={d.tip?"sepa-tip":""}>
                      <div style={{fontFamily:mono,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:C.warm,marginBottom:2}}>
                        {d.l}{d.tip&&<span style={{marginLeft:4,color:C.g50}}>(?)</span>}
                      </div>
                      <div style={{fontSize:14,fontWeight:700}}>{d.v}</div>
                      {d.tip&&<div className="sepa-tooltip" style={{display:"none",position:"absolute",bottom:"calc(100% + 6px)",left:0,right:-40,
                        background:C.paper,border:`2px solid ${C.ink}`,padding:"10px 12px",zIndex:20,fontSize:12,fontWeight:400,
                        lineHeight:1.5,fontFamily:serif,color:C.g90}}>
                        <div style={{fontFamily:mono,fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:4,color:C.ink}}>State Environmental Policy Act</div>
                        {d.tip}
                        <div style={{position:"absolute",bottom:-6,left:16,width:10,height:10,background:C.paper,borderRight:`2px solid ${C.ink}`,borderBottom:`2px solid ${C.ink}`,transform:"rotate(45deg)"}}/>
                      </div>}
                    </div>
                  ))}
                </div>
              </div>);
            })():(
              <div style={{padding:16}}>
                <h3 style={{fontSize:14,fontWeight:700,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.05em",fontVariant:"small-caps"}}>
                  Top Uprate Opportunities
                </h3>
                <div style={{borderBottom:`1px solid ${C.g30}`,marginBottom:10}}/>
                {sites.filter(s=>s.add>0).sort((a,b)=>b.add-a.add).slice(0,20).map((s,i)=>{
                  const sd=SD[s.st];
                  const lab=s.ps.length>1?`${s.ps[0].name.replace(/ \d$/,"")} (${s.ps.length}u)`:s.ps[0].name;
                  return(<div key={i} onClick={()=>setSel(s.ps[0])} onMouseEnter={()=>setHov(s)} onMouseLeave={()=>setHov(null)}
                    style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",cursor:"pointer",borderBottom:`1px solid ${C.g15}`,
                      background:hov===s?C.news:"transparent",transition:"background 0.1s"}}>
                    <div style={{width:8,height:8,flexShrink:0,background:ENV_C[sd?.env]||C.g50,border:`1px solid ${C.g50}`}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:700}}>{lab}</div>
                      <div style={{fontSize:10,color:C.g70,fontFamily:mono}}>{s.st} · {s.ps[0].type} · {s.ps[0].mkt}</div>
                    </div>
                    <div style={{fontFamily:mono,fontSize:12,fontWeight:700,color:C.blue,flexShrink:0}}>+{Math.round(s.add).toLocaleString()}</div>
                  </div>);
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────── */}
        <footer style={{borderTop:`2px solid ${C.ink}`,paddingTop:14,marginTop:20,fontSize:11,color:C.g50,textAlign:"center",fontStyle:"italic"}}>
          Theoretical uprate caps per FAI/DOE methodology: maximum historically achieved uprate by reactor type, capped at 20%.
          All additions contingent upon NRC license amendments, plant-specific safety analyses, and economic feasibility.
        </footer>
      </div>
    </div>
  );
}
