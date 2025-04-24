import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSubmissionFn } from "../functions/get_submission.fn";
import { formKeys } from "./form_keys.factory";

export function useGetSubmission(
  args: { formId: string; formSubmissionId: string },
) {
  const getSubmission = useServerFn(getSubmissionFn);
  return useQuery({
    queryKey: formKeys.submissions.single({
      formId: args.formId,
      submissionId: args.formSubmissionId,
    }),
    queryFn: async () =>
      getSubmission({ data: { formSubmissionId: args.formSubmissionId } }),
  });
}
