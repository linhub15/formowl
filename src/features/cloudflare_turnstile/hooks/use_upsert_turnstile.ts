import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  upsertTurnstileFn,
  type UpsertTurnstileRequest,
  upsertTurnstileRequest,
} from "../functions/upsert_turnstile.fn";
import { toast } from "sonner";

export function useUpsertTurnstile() {
  const upsertTurnstile = useServerFn(upsertTurnstileFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: Partial<UpsertTurnstileRequest>) => {
      const request = upsertTurnstileRequest.parse(args);
      await upsertTurnstile({ data: request });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["turnstiles"] });
      toast.success("Saved");
    },
  });
}
