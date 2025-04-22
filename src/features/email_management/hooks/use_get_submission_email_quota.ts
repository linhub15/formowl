import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSubmissionsEmailQuotaFn } from "../functions/get_submission_email_quota.fn";

export function useGetSubmissionEmailQuota() {
  const getEmailQuota = useServerFn(getSubmissionsEmailQuotaFn);

  return useQuery({
    queryKey: ["emails", "quota"],
    queryFn: async () => {
      const quota = await getEmailQuota();
      return quota;
    },
  });
}
