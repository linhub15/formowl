import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type SetSubmissionPausedRequest,
  setSubmissionsPausedFn,
} from "../functions/set_submissions_paused.fn";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

export function useSetSubmissionPaused() {
  const setSubmissionPause = useServerFn(setSubmissionsPausedFn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: SetSubmissionPausedRequest) => {
      await setSubmissionPause({ data: args });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["forms"] });
      toast.success("Changes saved");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
