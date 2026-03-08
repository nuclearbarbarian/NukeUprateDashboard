/**
 * Plant-by-plant reactor data.
 *
 * Sources:
 *   - FAI State Permitting Playbook Nuclear Supplement, Appendix B (Nov 2025)
 *   - INL/RPT-24-78810, Table 1 & Appendix D (June 2024)
 *
 * Fields:
 *   name  – Unit name (NRC designation)
 *   state – Two-letter state abbreviation
 *   type  – PWR or BWR
 *   lp    – NSSS loop/cycle design (e.g. "W 4-Loop", "GE BWR/4")
 *   ref   – Reference (original) licensed thermal power in MWt
 *   up    – Current uprate as a fraction of OLTP (e.g. 0.063 = 6.3%)
 *   cap   – Theoretical uprate cap as a fraction of OLTP
 *   add   – Remaining theoretical capacity addition in MWt
 *   lat   – Latitude
 *   lon   – Longitude
 *   mkt   – Electricity market: "Reg." (regulated) or "Merch." (merchant)
 */
export const PLANTS = [
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
