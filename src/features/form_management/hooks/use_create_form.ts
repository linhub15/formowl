import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  createFormFn,
  type CreateFormRequest,
} from "../functions/create_form.fn";
import { formKeys } from "./form_keys.factory";

export function useCreateForm() {
  const createForm = useServerFn(createFormFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: CreateFormRequest) => {
      const created = await createForm({ data: args });
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formKeys.lists() });
    },
  });
}
