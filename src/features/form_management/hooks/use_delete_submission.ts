import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  deleteSubmissionFn,
  type DeleteSubmissionRequest,
} from "../functions/delete_submission.fn";
import { formKeys } from "./form_keys.factory";

export function useDeleteSubmission() {
  const deleteSubmission = useServerFn(deleteSubmissionFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      args: DeleteSubmissionRequest & { formId: string },
    ) => {
      await deleteSubmission({ data: args });

      return args;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: formKeys.submissions.lists(data.formId),
      });
      toast.success("Submission deleted");
    },
  });
}
