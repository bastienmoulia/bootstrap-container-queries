// Builds class names for the library. Visual scenarios only use these helpers,
// so the same scenarios can run against every major version of the library.
export const adapter = {
  version: "v5",
  container: "bcq",
  // Maps the Bootstrap 5 spacer index used by the scenarios to the version's scale.
  spacer: (n) => n,
  util: (name, value, bp) =>
    bp ? `bcq-${name}-${bp}-${value}` : `bcq-${name}-${value}`,
  col: (size, bp) => (bp ? `bcq-${bp}-${size}` : `bcq-${size}`),
};
