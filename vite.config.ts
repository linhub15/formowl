import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { generateSitemap } from "tanstack-router-sitemap";
import { defineConfig } from "vite";
import { sitemap } from "./src/lib/utils/sitemap";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    generateSitemap(sitemap),
    tanstackStart({
      prerender: {
        enabled: true,
        filter: ({ path }) =>
          ["/", "/waitlist", "/terms", "/privacy", "/pricing"].includes(path),
      },
      router: {
        routeTreeFileHeader: [
          "/* eslint-disable */",
          "// @ts-nocheck",
          "// noinspection JSUnusedGlobalSymbols",
          "// deno-lint-ignore-file",
          "// deno-fmt-ignore-file",
        ],
      },
    }),
    nitro(),
    react(),
  ],
});
