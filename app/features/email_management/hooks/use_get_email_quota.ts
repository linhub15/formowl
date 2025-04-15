import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getEmailQuotaFn } from "../functions/get_email_quota.fn";

export function useGetEmailQuota() {
  const getEmailQuota = useServerFn(getEmailQuotaFn);

  return useQuery({
    queryKey: ["emails", "quota"],
    queryFn: async () => {
      const quota = await getEmailQuota();
      return quota;
    },
  });
}
