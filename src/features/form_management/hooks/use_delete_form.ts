import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteFormFn,
  type DeleteFormRequest,
} from "../functions/delete_form.fn";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { formKeys } from "./form_keys.factory";

export function useDeleteForm() {
  const deleteForm = useServerFn(deleteFormFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: DeleteFormRequest) => {
      await deleteForm({ data: args });
    },
    onSuccess: async () => {
      toast.success("Form deleted");

      await queryClient.invalidateQueries({ queryKey: formKeys.lists() });
    },
  });
}
