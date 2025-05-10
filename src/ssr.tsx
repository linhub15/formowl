import { getRouterManifest } from "@tanstack/react-start/router-manifest";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import type { EnvServer } from "./env.server";
import { createRouter } from "./router";

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvServer {}
  }
}
