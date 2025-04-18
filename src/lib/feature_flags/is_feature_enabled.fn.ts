import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { FEATURE_FLAGS } from "./feature_flags";
import { isFeatureEnabled } from "./is_feature_enabled.server";

const request = z.enum(Object.values(FEATURE_FLAGS) as [
  (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS],
]);

export type IsFeatureEnabledReqeust = z.infer<typeof request>;

export const isFeatureEnabledFn = createServerFn({ method: "GET" })
  .validator((data: IsFeatureEnabledReqeust) => request.parse(data))
  .handler(async ({ data }) => {
    const isEnabled = await isFeatureEnabled(data);
    return isEnabled;
  });
