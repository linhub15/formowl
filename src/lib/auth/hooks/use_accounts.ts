import { useQuery } from "@tanstack/react-query";
import { authClient } from "../auth_client";

export function useAccounts() {
  return useQuery({
    queryKey: ["auth", "accounts"],
    queryFn: async () => {
      const accounts = await authClient.listAccounts();
      return accounts.data;
    },
  });
}
