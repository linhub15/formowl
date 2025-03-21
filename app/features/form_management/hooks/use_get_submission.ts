import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSubmissionFn } from "../functions/get_submission.fn";

export function useGetSubmission(
  args: { formSlug: string; formSubmissionId: string },
) {
  const getSubmission = useServerFn(getSubmissionFn);
  return useQuery({
    queryKey: ["forms", args.formSlug, "submissions", args.formSubmissionId],
    queryFn: async () =>
      getSubmission({ data: { formSubmissionId: args.formSubmissionId } }),
  });
}
