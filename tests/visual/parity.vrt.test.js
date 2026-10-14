import { expect, test } from "vitest";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../scss/build.scss";
import "./fixture.css";
import { render } from "../helpers/render.js";

// `.bcq` is a lightweight alias of Bootstrap's `.contains-inline`.
test(".bcq behaves like .contains-inline", () => {
  const html = `<div class="box @md:col-4 @lg:col-3">A</div>`;
  const measure = (container) => {
    const frame = render(html, 900, container);
    const box = frame.querySelector(".box");
    return [
      getComputedStyle(frame.firstElementChild).containerType,
      getComputedStyle(box).width,
    ];
  };

  expect(measure("contains-inline")).toEqual(measure("bcq"));
  expect(measure("bcq")).toEqual(["inline-size", "300px"]);
});
