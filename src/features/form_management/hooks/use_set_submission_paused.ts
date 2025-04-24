import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type SetSubmissionPausedRequest,
  setSubmissionsPausedFn,
} from "../functions/set_submissions_paused.fn";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { formKeys } from "./form_keys.factory";

export function useSetSubmissionPaused() {
  const setSubmissionPause = useServerFn(setSubmissionsPausedFn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: SetSubmissionPausedRequest) => {
      await setSubmissionPause({ data: args });

      return { formId: args.formId };
    },
    onSuccess: async ({ formId }) => {
      toast.success("Changes saved");

      await queryClient.invalidateQueries({
        queryKey: formKeys.single(formId),
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
