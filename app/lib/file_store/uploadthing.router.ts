import {
  createUploadthing,
  type FileRouter,
  UploadThingError,
} from "uploadthing/server";
import { auth } from "../auth/better_auth";
import { z } from "zod";
import { db } from "@/db/database";
import { blob } from "@/db/schema";

const f = createUploadthing();

export type UploadRouter = typeof uploadRouter;
export const uploadRouter = {
  "room_image": f({
    image: {
      acl: "public-read",
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ roomId: z.string() }))
    .middleware(async ({ req, input }) => {
      const session = await auth.api.getSession({ headers: req.headers });

      if (!session) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: session.user.id, input };
    })
    .onUploadError(async ({ error, fileKey }) => {
      console.error("Error uploading file:", error, fileKey);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.transaction(async (t) => {
        const inserted = await t
          .insert(blob)
          .values({
            uploadthingMeta: {
              key: file.key,
              name: file.name,
              size: file.size,
              type: file.type,
              ufsUrl: file.ufsUrl,
              customId: file.customId,
              fileHash: file.fileHash,
            },
          })
          .returning({ insertedId: blob.id });

        const single = inserted.at(0);

        if (!single) {
          throw new Error("db transaction: failed to insert blob");
        }
      });
    }),
} satisfies FileRouter;
