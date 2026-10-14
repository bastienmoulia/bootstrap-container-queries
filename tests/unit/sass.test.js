import { describe, expect, test } from "vitest";
import { compileLib } from "../helpers/compile.js";

describe("default build", () => {
  const css = compileLib();

  test("declares the Bootstrap layer order", () => {
    expect(css).toMatch(
      /^@layer colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities;/,
    );
  });

  test("does not define its own container class", () => {
    expect(css).not.toMatch(/\.bcq/);
    expect(css).not.toMatch(/container-type/);
  });

  test("emits a container query for each Bootstrap breakpoint", () => {
    for (const px of ["576px", "768px", "1024px", "1280px", "1536px"]) {
      expect(css).toContain(`@container (width >= ${px})`);
    }
  });

  test("generates grid columns in the layout layer", () => {
    const query = css.split("@container (width >= 768px)")[1];
    expect(query).toMatch(/@layer layout {\s*\.cq-md\\:col-1\s*{/);
    expect(query).toMatch(/\.cq-md\\:col-4\s*{\s*width:\s*33\.3333333333cqw;/);
    expect(css).toMatch(/\.cq-2xl\\:col-12\s*{/);
  });

  test("generates utilities in the utilities layer", () => {
    const query = css.split("@container (width >= 768px)")[1];
    expect(query).toMatch(/@layer utilities {\s*\.cq-md\\:/);
    expect(css).toMatch(/\.cq-md\\:d-none\s*{\s*display:\s*none;/);
    expect(css).toMatch(/\.cq-sm\\:text-end\s*{\s*text-align:\s*end;/);
    expect(css).toMatch(/\.cq-xl\\:float-start\s*{\s*float:\s*inline-start;/);
    expect(css).toMatch(/\.cq-lg\\:flex-column-reverse\s*{/);
    expect(css).toMatch(/\.cq-md\\:mt-3\s*{\s*margin-block-start:/);
    expect(css).toMatch(/\.cq-lg\\:px-7\s*{\s*padding-inline:/);
  });

  test("does not generate classes for the smallest breakpoint", () => {
    expect(css).not.toMatch(/\.cq-xs\\:/);
  });

  test("does not rely on CSS custom properties", () => {
    expect(css).not.toMatch(/var\(--/);
  });
});

describe("custom breakpoints", () => {
  const css = compileLib(
    ` with ($container-queries-breakpoints: (xs: 0, sm: 20em, md: 40em))`,
  );

  test("uses the custom values", () => {
    expect(css).toContain("@container (width >= 20em)");
    expect(css).toContain("@container (width >= 40em)");
    expect(css).not.toContain("@container (width >= 768px)");
    expect(css).not.toMatch(/\.cq-lg\\:/);
  });
});

describe("custom utilities", () => {
  const css = compileLib(
    ` with ($container-queries-utilities: ("display", "float"))`,
  );

  test("only generates the selected utilities", () => {
    expect(css).toMatch(/\.cq-md\\:d-none\s*{/);
    expect(css).toMatch(/\.cq-md\\:float-start\s*{/);
    expect(css).not.toMatch(/\.cq-md\\:mt-3\s*{/);
    expect(css).not.toMatch(/\.cq-md\\:text-end\s*{/);
  });
});

describe("named container", () => {
  const css = compileLib(` with ($container-queries-container-name: sidebar)`);

  test("queries the named container", () => {
    expect(css).toContain("@container sidebar (width >= 768px)");
    expect(css).not.toMatch(/@container \(/);
    expect(css).toMatch(/\.cq-md\\:d-none\s*{/);
  });
});

describe("Bootstrap compatibility", () => {
  test("does not reuse Bootstrap's viewport class names", () => {
    const css = compileLib();
    expect(css).not.toMatch(/\.md\\:/);
  });
});
