import { useQuery } from "@tanstack/react-query";
import { getFormFn, type GetFormRequest } from "../functions/get_form.fn";
import { useServerFn } from "@tanstack/react-start";

export function useGetForm(args: GetFormRequest) {
  const getForm = useServerFn(getFormFn);
  return useQuery({
    queryKey: ["forms", args],
    queryFn: async () => {
      console.log("here");
      return await getForm({ data: args });
    },
  });
}
