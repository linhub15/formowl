import { useRouter } from "@tanstack/react-router";

export function useFormActionUrl(args: { formSlug: string }) {
  const domain = import.meta.env.VITE_APP_URL;
  const router = useRouter();

  const path = router.buildLocation({
    to: "/api/@/$formSlug",
    params: { formSlug: args.formSlug },
  });

  return new URL(path.pathname, domain);
}
