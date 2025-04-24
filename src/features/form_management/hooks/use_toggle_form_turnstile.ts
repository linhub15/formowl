import { useServerFn } from "@tanstack/react-start";
import {
  toggleFormTurnstileFn,
  type ToggleFormTurnstileRequest,
} from "../functions/toggle_turnstile_fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formKeys } from "./form_keys.factory";

export function useToggleFormTurnstile() {
  const toggleFormTurnstile = useServerFn(toggleFormTurnstileFn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: ToggleFormTurnstileRequest) => {
      await toggleFormTurnstile({ data: args });

      return { formId: args.formId };
    },
    onSuccess: async ({ formId }) => {
      toast.success("Saved");

      await queryClient.invalidateQueries({
        queryKey: formKeys.single(formId),
      });
    },
  });
}
