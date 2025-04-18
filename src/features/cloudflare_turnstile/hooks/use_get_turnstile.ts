import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getTurnstileFn } from "../functions/get_turnstile.fn";

export function useGetTurnstile() {
  const getTurnstile = useServerFn(getTurnstileFn);
  return useQuery({
    queryKey: ["turnstiles", "get"],
    queryFn: async () => {
      const turnstile = await getTurnstile();
      return turnstile ?? null;
    },
  });
}
