import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listTurnstilesFn } from "../functions/list_turnstiles.fn";

export function useListTurnstiles() {
  const listTurnstiles = useServerFn(listTurnstilesFn);
  return useQuery({
    queryKey: ["turnstiles", "list"],
    queryFn: async () => {
      const turnstiles = await listTurnstiles();
      return turnstiles;
    },
  });
}
