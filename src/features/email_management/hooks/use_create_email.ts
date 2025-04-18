import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  createEmailFn,
  type CreateEmailRequest,
} from "../functions/create_email.fn";
import { toast } from "sonner";

export function useCreateEmail() {
  const createEmail = useServerFn(createEmailFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: CreateEmailRequest) => {
      const result = await createEmail({ data: args });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
      toast.success("Email created, validation email sent");
    },
  });
}
