import { useServerFn } from "@tanstack/react-start";
import {
  setFormEmailFn,
  type SetFormEmailRequest,
} from "../functions/set_form_email.fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formKeys } from "@/features/form_management/hooks/form_keys.factory";

export function useSetFormEmail() {
  const setFormEmail = useServerFn(setFormEmailFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: SetFormEmailRequest) => {
      await setFormEmail({ data: args });
      return { formId: args.formId };
    },
    onSuccess: ({ formId }) => {
      queryClient.invalidateQueries({ queryKey: formKeys.single(formId) });
      toast.success("Email updated");
    },
  });
}
