import { createFileRoute } from "@tanstack/react-router";
import { uploadRouter } from "@/lib/file_store/uploadthing.router";
import { createRouteHandler } from "uploadthing/server";

const handlers = createRouteHandler({ router: uploadRouter });

export const Route = createFileRoute("/api/uploadthing")({
  server: {
    handlers: {
      GET: handlers,
      POST: handlers,
    },
  },
});
