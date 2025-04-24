import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listSubmissionsFn,
  type ListSubmissionsRequest,
} from "../functions/list_submissions.fn";
import { formKeys } from "./form_keys.factory";

export function useListSubmissions(args: ListSubmissionsRequest) {
  const listSubmissions = useServerFn(listSubmissionsFn);
  return useQuery({
    queryKey: formKeys.submissions.lists(args.formId),
    queryFn: async () => {
      const submissions = await listSubmissions({ data: args });
      return submissions;
    },
  });
}
