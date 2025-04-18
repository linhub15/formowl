import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  deleteSubmissionFn,
  type DeleteSubmissionRequest,
} from "../functions/delete_submission.fn";

export function useDeleteSubmission() {
  const deleteSubmission = useServerFn(deleteSubmissionFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: DeleteSubmissionRequest) => {
      await deleteSubmission({ data: args });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      toast.success("Submission deleted");
    },
  });
}
