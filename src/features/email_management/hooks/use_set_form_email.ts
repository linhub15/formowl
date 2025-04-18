import { useServerFn } from "@tanstack/react-start";
import {
  setFormEmailFn,
  type SetFormEmailRequest,
} from "../functions/set_form_email.fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSetFormEmail() {
  const setFormEmail = useServerFn(setFormEmailFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: SetFormEmailRequest) => {
      await setFormEmail({ data: args });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      toast.success("Email updated");
    },
  });
}
