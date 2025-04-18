import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listSubmissionsFn } from "../functions/list_submissions.fn";

type Args = {
  formSlug: string;
};
export function useListSubmissions(args: Args) {
  const listSubmissions = useServerFn(listSubmissionsFn);
  return useQuery({
    queryKey: ["forms", args.formSlug, "submissions"],
    queryFn: async () => {
      const submissions = await listSubmissions({ data: args });
      return submissions;
    },
  });
}
