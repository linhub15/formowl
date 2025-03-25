import { useServerFn } from "@tanstack/react-start";
import {
  toggleFormTurnstileFn,
  type ToggleFormTurnstileRequest,
} from "../functions/toggle_turnstile_fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useToggleFormTurnstile() {
  const toggleFormTurnstile = useServerFn(toggleFormTurnstileFn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: ToggleFormTurnstileRequest) => {
      await toggleFormTurnstile({ data: args });
    },
    onSuccess: () => {
      toast.success("Saved");
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
}
