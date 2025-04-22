import { ProgressBar } from "@/components/ui/progress_bar";
import { useGetSubmissionEmailQuota } from "./hooks/use_get_submission_email_quota";

export function SubmissionEmailQuotaProgress() {
  const { data: emailQuota, isLoading } = useGetSubmissionEmailQuota();

  return (
    <ProgressBar
      label="Emails sent"
      value={emailQuota?.used}
      max={emailQuota?.max}
      isLoading={isLoading}
    />
  );
}
