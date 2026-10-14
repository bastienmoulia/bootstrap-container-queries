import { describe, expect, test } from "vitest";
import { compileLib } from "../helpers/compile.js";

describe("default build", () => {
  const css = compileLib();

  test("makes .bcq a query container", () => {
    expect(css).toMatch(/\.bcq\s*{\s*container-type:\s*inline-size;/);
  });

  test("emits a container query for each breakpoint", () => {
    for (const em of ["30em", "48em", "62em", "75em", "90em"]) {
      expect(css).toContain(`@container (min-width: ${em})`);
    }
  });

  test("generates grid columns", () => {
    expect(css).toMatch(/\.bcq-md-4\s*{\s*width:/);
    expect(css).toMatch(/\.bcq-12\s*{/);
  });

  test("generates utilities", () => {
    expect(css).toMatch(/\.bcq-d-none\s*{\s*display:\s*none\s*!important;/);
    expect(css).toMatch(
      /\.bcq-d-md-block\s*{\s*display:\s*block\s*!important;/,
    );
    expect(css).toMatch(/\.bcq-flex-lg-column-reverse\s*{/);
    expect(css).toMatch(
      /\.bcq-text-sm-end\s*{\s*text-align:\s*right\s*!important;/,
    );
    expect(css).toMatch(
      /\.bcq-float-xl-start\s*{\s*float:\s*left\s*!important;/,
    );
    expect(css).toMatch(/\.bcq-mt-md-3\s*{\s*margin-top:/);
    expect(css).toMatch(/\.bcq-px-lg-4\s*{/);
  });

  test("puts utilities inside the container query", () => {
    const query = css.split("@container (min-width: 48em)")[1];
    expect(query).toMatch(/\.bcq-d-md-none/);
  });
});

describe("custom breakpoints", () => {
  const css = compileLib(
    ` with ($container-queries-breakpoints: (sm: 20em, md: 40em))`,
  );

  test("uses the custom values", () => {
    expect(css).toContain("@container (min-width: 20em)");
    expect(css).toContain("@container (min-width: 40em)");
    expect(css).not.toContain("@container (min-width: 48em)");
  });
});
