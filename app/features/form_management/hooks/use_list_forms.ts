import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listFormsFn } from "../functions/list_forms.fn";

export function useListForms() {
  const listForms = useServerFn(listFormsFn);
  return useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      return await listForms();
    },
  });
}
