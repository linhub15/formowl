import { useQuery } from "@tanstack/react-query";
import { listOrganizationEmailsFn } from "../functions/list_organization_emails.fn";
import { useServerFn } from "@tanstack/react-start";

export function useListEmails() {
  const listEmails = useServerFn(listOrganizationEmailsFn);

  return useQuery({
    queryKey: ["emails"],
    queryFn: async () => {
      const result = await listEmails();
      return result;
    },
  });
}
