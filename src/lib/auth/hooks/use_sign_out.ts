import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/auth.client";

export function useSignOut() {
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: async () => {
      await authClient.signOut();
      await navigate({ to: "/login", search: { redirect: location.pathname } });
    },
  });
}
