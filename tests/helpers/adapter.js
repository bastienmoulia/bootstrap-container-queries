// Builds class names for the library. Visual scenarios only use these helpers,
// so the same scenarios can run against every major version of the library.
const breakpoints = { xxl: "2xl" };
// Maps the Bootstrap 5 spacer index used by the scenarios to the Bootstrap 6 scale.
const spacers = { 1: 1, 2: 3, 3: 5, 4: 7, 5: 12 };

export const adapter = {
  version: "v6",
  container: "bcq",
  spacer: (n) => spacers[n],
  util: (name, value, bp) =>
    bp ? `@${breakpoints[bp] ?? bp}:${name}-${value}` : `${name}-${value}`,
  col: (size, bp) =>
    bp ? `@${breakpoints[bp] ?? bp}:col-${size}` : `col-${size}`,
};
