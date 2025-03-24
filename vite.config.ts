/**
 * @description This file is used for tools that expect a `vite.config.ts`.
 * Tanstack Start uses `app.config.ts` so storybook and other tools cannot get the vite config.
 */

import tailwindcss from "@tailwindcss/vite";
import type { UserConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default {
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
  ],
} satisfies UserConfig;
