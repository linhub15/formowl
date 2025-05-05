import { useQuery } from "@tanstack/react-query";
import { getFormFn, type GetFormRequest } from "../functions/get_form.fn";
import { useServerFn } from "@tanstack/react-start";
import { formKeys } from "./form_keys.factory";

export function useGetForm(args: GetFormRequest) {
  const getForm = useServerFn(getFormFn);

  return useQuery({
    queryKey: formKeys.single(args.formId),
    enabled: !!args.formId,
    queryFn: async () => {
      return await getForm({ data: args });
    },
  });
}
