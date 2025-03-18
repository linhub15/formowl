import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteFormFn,
  type DeleteFormRequest,
} from "../functions/delete_form.fn";
import { useServerFn } from "@tanstack/react-start";

export function useDeleteForm() {
  const deleteForm = useServerFn(deleteFormFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: DeleteFormRequest) => {
      await deleteForm({ data: args });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
}
