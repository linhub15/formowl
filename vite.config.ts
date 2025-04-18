/**
 * @description This file is used for tools that expect a `vite.config.ts`.
 * Tanstack Start uses `app.config.ts` so storybook and other tools cannot get the vite config.
 */

import { sitemap } from "./src/lib/utils/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { generateSitemap } from "tanstack-router-sitemap";
import type { UserConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default {
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    generateSitemap(sitemap),
  ],
} satisfies UserConfig;
