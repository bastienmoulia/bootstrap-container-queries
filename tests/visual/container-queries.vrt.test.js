import { expect, test } from "vitest";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../scss/build.scss";
import "./fixture.css";
import { adapter } from "../helpers/adapter.js";
import { scenarios, widths } from "../helpers/scenarios.js";
import { render } from "../helpers/render.js";

for (const [name, scenario] of Object.entries(scenarios)) {
  for (const width of widths) {
    test(`${name} at ${width}px`, async () => {
      const frame = render(scenario(adapter), width, adapter.container);
      await document.fonts.ready;
      await expect.element(frame).toMatchScreenshot(`${name}-${width}`);
    });
  }
}
