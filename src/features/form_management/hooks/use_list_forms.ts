import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listFormsFn } from "../functions/list_forms.fn";
import { formKeys } from "./form_keys.factory";

export function useListForms() {
  const listForms = useServerFn(listFormsFn);
  return useQuery({
    queryKey: formKeys.lists(),
    queryFn: async () => {
      return await listForms();
    },
  });
}
