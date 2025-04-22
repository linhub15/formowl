import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { deleteEmailFn } from "../functions/delete_email.fn";
import { toast } from "sonner";

type Args = {
  email: string;
  emailId: string;
};

export function useDeleteEmail() {
  const deleteEmail = useServerFn(deleteEmailFn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, emailId }: Args) => {
      await deleteEmail({ data: { emailId: emailId } });

      return { email: email };
    },
    onSuccess: async ({ email }) => {
      await queryClient.invalidateQueries({ queryKey: ["emails"] });
      toast.success(`Deleted email "${email}"`);
    },
  });
}
