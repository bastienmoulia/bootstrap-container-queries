import { expect, test } from "vitest";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../scss/build.scss";
import "./fixture.css";
import { render } from "../helpers/render.js";

test(".contains-inline is the query container", () => {
  const html = `<div class="box cq-md:col-4 cq-lg:col-3">A</div>`;
  const frame = render(html, 900, "contains-inline");
  const box = frame.querySelector(".box");

  expect(getComputedStyle(frame.firstElementChild).containerType).toBe(
    "inline-size",
  );
  expect(getComputedStyle(box).width).toBe("300px");
});
