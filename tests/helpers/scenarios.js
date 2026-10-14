// Container widths, one per breakpoint tier (xs, sm, md, lg, xl, xxl).
// Chosen so they fall in the same tier for the Bootstrap 5 (em) and 6 (px) breakpoints.
export const widths = [400, 600, 900, 1100, 1300, 1600];

const box = (cls, label) => `<div class="box ${cls}">${label}</div>`;

export const scenarios = {
  grid: (c) => `
    <div class="row">
      ${["A", "B", "C", "D"]
        .map((l) =>
          box(`${c.col(6, "sm")} ${c.col(4, "md")} ${c.col(3, "lg")}`, l),
        )
        .join("")}
    </div>
    <div class="row">
      ${["A", "B", "C"]
        .map((l) => box(`${c.col(12, "xl")} ${c.col(4, "xxl")}`, l))
        .join("")}
    </div>`,

  display: (c) =>
    ["sm", "md", "lg", "xl", "xxl"]
      .map(
        (bp) =>
          box(c.util("d", "none", bp), `hide from ${bp}`) +
          box(
            `${c.util("d", "none")} ${c.util("d", "block", bp)}`,
            `show from ${bp}`,
          ),
      )
      .join(""),

  "flex-direction": (c) =>
    ["md", "xl"]
      .map(
        (
          bp,
        ) => `<div class="flex ${c.util("flex", "column")} ${c.util("flex", "row", bp)}">
          ${box("", "1")}${box("", "2")}${box("", "3")}
        </div>
        <div class="flex ${c.util("flex", "row")} ${c.util("flex", "column-reverse", bp)}">
          ${box("", "1")}${box("", "2")}${box("", "3")}
        </div>`,
      )
      .join(""),

  "text-align": (c) =>
    ["sm", "md", "lg", "xl", "xxl"]
      .map(
        (bp) =>
          box(
            `${c.util("text", "start")} ${c.util("text", "center", bp)}`,
            `start, then center from ${bp}`,
          ) +
          box(
            `${c.util("text", "start")} ${c.util("text", "end", bp)}`,
            `start, then end from ${bp}`,
          ),
      )
      .join(""),

  float: (c) =>
    ["md", "xl"]
      .map(
        (bp) => `<div class="clearfix">
          ${box(`${c.util("float", "start")} ${c.util("float", "end", bp)} small`, "F")}
        </div>`,
      )
      .join(""),

  spacing: (c) => `
    <div class="row-flex">
      ${box(`${c.util("m", c.spacer(1))} ${c.util("m", c.spacer(5), "md")}`, "m")}
      ${box(`${c.util("mx", c.spacer(1))} ${c.util("mx", c.spacer(4), "lg")}`, "mx")}
      ${box(`${c.util("mt", c.spacer(1))} ${c.util("mt", c.spacer(5), "xl")}`, "mt")}
      ${box(`${c.util("ms", "auto")} ${c.util("me", c.spacer(4), "sm")}`, "ms/me")}
    </div>
    <div class="row-flex">
      ${box(`${c.util("p", c.spacer(1))} ${c.util("p", c.spacer(4), "md")}`, "p")}
      ${box(`${c.util("py", c.spacer(1))} ${c.util("py", c.spacer(5), "lg")}`, "py")}
      ${box(`${c.util("px", c.spacer(1))} ${c.util("px", c.spacer(5), "xxl")}`, "px")}
      ${box(`${c.util("pt", c.spacer(2))} ${c.util("pb", c.spacer(4), "xl")}`, "pt/pb")}
    </div>`,
};
