import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  isFeatureEnabledFn,
  type IsFeatureEnabledReqeust,
} from "./is_feature_enabled.fn";

export function useFeatureFlagEnabled(flag: IsFeatureEnabledReqeust) {
  const isEnabled = useServerFn(isFeatureEnabledFn);

  return useQuery({
    queryKey: ["feature_flags", flag],
    queryFn: async () => {
      return await isEnabled({ data: flag });
    },
  });
}
