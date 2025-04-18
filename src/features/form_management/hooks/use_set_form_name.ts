import { useServerFn } from "@tanstack/react-start";
import {
  setFormNameFn,
  SetFormNameRequest,
  setFormNameRequest,
} from "../functions/set_form_name.fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSetFormName() {
  const setFormName = useServerFn(setFormNameFn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: Partial<SetFormNameRequest>) => {
      const request = setFormNameRequest.parse(args);
      const formNameSet = await setFormName({ data: request });
      return formNameSet;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      toast.success("Form renamed");
    },
    onError: () => {
      toast.error("Unable to rename");
    },
  });
}
