import { useQuery } from "@tanstack/react-query";
import { authClient } from "../auth.client";

export function useOrganizations() {
  return useQuery({
    queryKey: ["auth", "organizations"],
    queryFn: async () => {
      const response = await authClient.organization.list();
      return response.data;
    },
  });
}
