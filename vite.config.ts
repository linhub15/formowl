import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { generateSitemap } from "tanstack-router-sitemap";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { sitemap } from "./src/lib/utils/sitemap";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    generateSitemap(sitemap),
    tanstackStart({
      target: "vercel",
      customViteReactPlugin: true,
      prerender: {
        enabled: true,
        filter: ({ path }) =>
          ["/", "/waitlist", "/terms", "/privacy", "/pricing"].includes(path),
      },
      tsr: {
        routeTreeFileHeader: [
          "/* eslint-disable */",
          "// @ts-nocheck",
          "// noinspection JSUnusedGlobalSymbols",
          "// deno-lint-ignore-file",
          "// deno-fmt-ignore-file",
        ],
      },
    }),
    react(),
  ],
});
