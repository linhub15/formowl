import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { deleteEmailFn } from "../functions/delete_email.fn";
import { toast } from "sonner";

export function useDeleteEmail() {
  const deleteEmail = useServerFn(deleteEmailFn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (emailId: string) => {
      await deleteEmail({ data: { emailId: emailId } });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["emails"] });
      toast.success("Email deleted");
    },
  });
}
