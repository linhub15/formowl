import { useQuery } from "@tanstack/react-query";
import { authClient } from "../auth.client";

export function useSession() {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const session = await authClient.getSession();

      return session.data;
    },
  });
}
