import { redirect } from "@tanstack/react-router";
import { getSessionFn } from "./get_session.fn";

/** @throws `redirect` when not logged in */
export async function authGuard({ location }: { location: { href: string } }) {
  // todo(perf): measure this performance
  const session = await getSessionFn();

  if (!session) {
    throw redirect({
      to: "/login",
      search: { redirect: location.href },
    });
  }
}
