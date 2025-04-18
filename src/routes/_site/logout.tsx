import { authClient } from "@/lib/auth/auth.client";
import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_site/logout")({
  component: () => {
    useEffect(() => {
      authClient.signOut();
    }, []);

    return <Navigate to="/login" />;
  },
});
