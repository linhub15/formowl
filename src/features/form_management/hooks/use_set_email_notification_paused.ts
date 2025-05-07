import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  setEmailNotificationPausedFn,
  type SetEmailNotificationPausedRequest,
} from "../functions/set_email_notification_paused.fn";
import { formKeys } from "./form_keys.factory";

export function useSetEmailNotificationPaused() {
  const setPaused = useServerFn(setEmailNotificationPausedFn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: SetEmailNotificationPausedRequest) => {
      await setPaused({ data: args });

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
