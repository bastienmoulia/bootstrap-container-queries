import { compileString } from "sass";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));

// Compiles a Sass snippet with the library's loadPaths.
export function compile(source) {
  return compileString(source, {
    loadPaths: [root, `${root}node_modules`],
    quietDeps: true,
    logger: { warn() {} },
  }).css;
}

export const compileLib = (config = "") =>
  compile(`@use "scss/bootstrap-container-queries"${config};`);
