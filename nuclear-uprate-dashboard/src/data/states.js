/**
 * State-level regulatory environment data.
 *
 * Sources:
 *   - FAI State Permitting Playbook Nuclear Supplement, Appendix A (Nov 2025)
 *   - FAI State Permitting Playbook Part 2, State Checklists (Nov 2025)
 *
 * Fields:
 *   mor   – Moratorium status ("None", "Repealed", or description of restriction)
 *   waste – Waste restriction ("None" or description)
 *   env   – Composite regulatory environment: "Clear" | "Mixed" | "Restricted"
 *   sepa  – Whether the state has a State Environmental Policy Act
 */
export const STATE_REGULATORY = {
  AL: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  AR: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  AZ: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  CA: { mor: "HLW Repository Req.",       waste: "None",                          env: "Restricted", sepa: true  },
  CT: { mor: "HLW Repository Req.",       waste: "None",                          env: "Mixed",      sepa: true  },
  FL: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  GA: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  IL: { mor: "Repealed",                  waste: "None",                          env: "Clear",      sepa: false },
  KS: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  LA: { mor: "None",                      waste: "HLW Import Ban",                env: "Mixed",      sepa: false },
  MD: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: true  },
  MI: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  MN: { mor: "Certificate-of-Need Ban",   waste: "None",                          env: "Restricted", sepa: false },
  MO: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  MS: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  NC: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  NE: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  NH: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  NJ: { mor: "Coastal Limits",            waste: "None",                          env: "Mixed",      sepa: false },
  NY: { mor: "LIPA Area Ban",             waste: "None",                          env: "Mixed",      sepa: true  },
  OH: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  PA: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  SC: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  TN: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  TX: { mor: "None",                      waste: "HLW Storage Ban",               env: "Mixed",      sepa: false },
  VA: { mor: "None",                      waste: "None",                          env: "Clear",      sepa: false },
  WA: { mor: "None",                      waste: "Import Ban",                    env: "Mixed",      sepa: true  },
  WI: { mor: "Repealed",                  waste: "None",                          env: "Clear",      sepa: false },
};
