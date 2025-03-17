import { useQuery } from "@tanstack/react-query";
import { authClient } from "../auth.client";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const session = await authClient.getSession();
    },
  });
}
