import { useServerFn } from "@tanstack/react-start";
import {
  setFormNameFn,
  type SetFormNameRequest,
  setFormNameRequest,
} from "../functions/set_form_name.fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formKeys } from "./form_keys.factory";

export function useSetFormName() {
  const setFormName = useServerFn(setFormNameFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: Partial<SetFormNameRequest>) => {
      const request = setFormNameRequest.parse(args);
      const formNameSet = await setFormName({ data: request });
      return formNameSet;
    },
    onSuccess: async () => {
      toast.success("Form renamed");

      await queryClient.invalidateQueries({ queryKey: formKeys.all });
    },
    onError: () => {
      toast.error("Unable to rename");
    },
  });
}
