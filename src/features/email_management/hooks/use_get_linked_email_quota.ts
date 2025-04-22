import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLinkedEmailQuotaFn } from "../functions/get_linked_email_quota.fn";

export function useGetLinkedEmailQuota() {
  const getQuota = useServerFn(getLinkedEmailQuotaFn);

  return useQuery({
    queryKey: ["emails", "linked", "quota"],
    queryFn: async () => {
      const quota = await getQuota();
      return quota;
    },
  });
}
