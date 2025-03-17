/**
 * @description This file is used for tools that expect a `vite.config.ts`.
 * Tanstack Start uses `app.config.ts` so storybook and other tools cannot get the vite config.
 */

import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
  ],
  define: {
    VITE_APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
};
