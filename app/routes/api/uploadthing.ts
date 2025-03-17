import { uploadRouter } from "@/lib/file_store/uploadthing.router";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { createRouteHandler } from "uploadthing/server";

const handlers = createRouteHandler({ router: uploadRouter });

export const APIRoute = createAPIFileRoute("/api/uploadthing")({
  GET: handlers,
  POST: handlers,
});
