// Renders a scenario inside a fixed-width frame holding the query container.
export function render(html, width, container) {
  document.body.innerHTML = `
    <div id="frame" style="width: ${width}px">
      <div class="${container}">${html}</div>
    </div>`;
  return document.getElementById("frame");
}
