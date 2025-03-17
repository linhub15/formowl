import { useMutation } from "@tanstack/react-query";
import { authClient } from "../auth.client";

type Args = {
  name: string;
  slug: string;
  logo: string;
};

export function useCreateOrganization() {
  return useMutation({
    mutationFn: async (args: Args) => {
      // todo: implement
      authClient.organization.create({
        name: args.name,
        slug: args.slug,
        logo: args.logo,
      });
    },
  });
}
