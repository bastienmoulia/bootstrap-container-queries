import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const vrtPattern = "tests/visual/**/*.vrt.test.js";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["node_modules"],
        quietDeps: true,
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "node",
          include: ["tests/unit/**/*.test.js"],
        },
      },
      {
        extends: true,
        test: {
          name: "vrt",
          include: [vrtPattern],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              {
                browser: "chromium",
                viewport: { width: 1800, height: 1000 },
              },
            ],
          },
        },
      },
    ],
  },
});
