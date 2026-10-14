import { describe, expect, test } from "vitest";
import { compileLib } from "../helpers/compile.js";

describe("default build", () => {
  const css = compileLib();

  test("declares the Bootstrap layer order", () => {
    expect(css).toMatch(
      /^@layer colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities;/,
    );
  });

  test("makes .bcq a query container", () => {
    expect(css).toMatch(/\.bcq\s*{\s*container-type:\s*inline-size;/);
  });

  test("emits a container query for each Bootstrap breakpoint", () => {
    for (const px of ["576px", "768px", "1024px", "1280px", "1536px"]) {
      expect(css).toContain(`@container (width >= ${px})`);
    }
  });

  test("generates grid columns in the layout layer", () => {
    const query = css.split("@container (width >= 768px)")[1];
    expect(query).toMatch(/@layer layout {\s*\.\\@md\\:col-1\s*{/);
    expect(query).toMatch(/\.\\@md\\:col-4\s*{\s*width:\s*33\.3333333333cqw;/);
    expect(css).toMatch(/\.\\@2xl\\:col-12\s*{/);
  });

  test("generates utilities in the utilities layer", () => {
    const query = css.split("@container (width >= 768px)")[1];
    expect(query).toMatch(/@layer utilities {\s*\.\\@md\\:/);
    expect(css).toMatch(/\.\\@md\\:d-none\s*{\s*display:\s*none;/);
    expect(css).toMatch(/\.\\@sm\\:text-end\s*{\s*text-align:\s*end;/);
    expect(css).toMatch(/\.\\@xl\\:float-start\s*{\s*float:\s*inline-start;/);
    expect(css).toMatch(/\.\\@lg\\:flex-column-reverse\s*{/);
    expect(css).toMatch(/\.\\@md\\:mt-3\s*{\s*margin-block-start:/);
    expect(css).toMatch(/\.\\@lg\\:px-7\s*{\s*padding-inline:/);
  });

  test("does not generate classes for the smallest breakpoint", () => {
    expect(css).not.toMatch(/\.\\@xs\\:/);
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
    expect(css).not.toMatch(/\.\\@lg\\:/);
  });
});

describe("custom utilities", () => {
  const css = compileLib(
    ` with ($container-queries-utilities: ("display", "float"))`,
  );

  test("only generates the selected utilities", () => {
    expect(css).toMatch(/\.\\@md\\:d-none\s*{/);
    expect(css).toMatch(/\.\\@md\\:float-start\s*{/);
    expect(css).not.toMatch(/\.\\@md\\:mt-3\s*{/);
    expect(css).not.toMatch(/\.\\@md\\:text-end\s*{/);
  });
});
