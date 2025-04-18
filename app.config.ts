import { defineConfig } from "@tanstack/react-start/config";
import viteConfig from "./vite.config";

export default defineConfig({
  tsr: {
    appDirectory: "./src",
    routeTreeFileHeader: [
      "/* eslint-disable */",
      "// @ts-nocheck",
      "// noinspection JSUnusedGlobalSymbols",
      "// deno-lint-ignore-file",
      "// deno-fmt-ignore-file",
    ],
  },
  server: { preset: "vercel" },
  vite: viteConfig,
});
