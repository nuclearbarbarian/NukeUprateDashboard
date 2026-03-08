# Nuclear Uprate Opportunity Map

Interactive dashboard showing theoretical power uprate potential for the U.S. commercial nuclear reactor fleet, overlaid with state-level regulatory environment data.

## Data Sources

- **INL/RPT-24-78810** — *Technical and Economic Considerations for Uprate of Existing Nuclear Reactors with Cogeneration* (June 2024). Fleet-level uprate history, regional hydrogen/oxygen market analysis, IRA tax credit implications, and DAC cogeneration economics.
- **FAI State Permitting Playbook — Nuclear Supplement** (November 2025). Plant-by-plant uprate calculator (Appendix B), state nuclear moratoria and waste restrictions (Appendix A), state-level classification of uprate opportunities.
- **FAI State Permitting Playbook — Part 2** (November 2025). State-by-state environmental permitting scorecards (SEPA, CAA, CWA, SESA) for 17 states.

## Design System

Styled using the **Penney Design System** — a 1940s trade journal aesthetic (Source Serif 4 + IBM Plex Mono, ink-on-newsprint palette, spot color accents).

## Project Structure

```
nuclear-uprate-dashboard/
├── index.html                  # Entry point (font preloads)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # React mount
    ├── App.jsx                 # App wrapper
    ├── index.css               # Penney Design System globals
    ├── data/
    │   ├── plants.js           # 94 reactor units with NSSS, uprate data, coords
    │   ├── states.js           # 28 states: moratoria, waste, env rating, SEPA
    │   └── constants.js        # Palette, FIPS map, typography, URLs
    └── components/
        └── Dashboard.jsx       # Main dashboard (map, filters, detail panel)
```

## Setup

```bash
npm install
npm run dev
```

## Key Features

- **Uprate Potential view** — Markers sized by remaining theoretical MWt headroom
- **Regulatory Environment view** — States colored Clear/Mixed/Restricted
- **Filters** — Reactor type (PWR/BWR), market (Regulated/Merchant), headroom status, regulatory path
- **Detail panel** — Unit-level table with NSSS design, current uprate %, moratorium/waste warnings, SEPA tooltip
- **94 reactor units** across 28 states with NSSS loop/cycle designations (W 2/3/4-Loop, CE 2-Loop, CE System 80, B&W 2-Loop, W AP1000, GE BWR/2–6)

## Extending

- **Add plants**: Edit `src/data/plants.js`
- **Update regulations**: Edit `src/data/states.js`
- **Adjust colors/fonts**: Edit `src/data/constants.js` and `src/index.css`
- **Add new views/panels**: Extend `src/components/Dashboard.jsx` or create new components
