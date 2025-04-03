import { Listbox, ListboxLabel, ListboxOption } from "@/components/ui/listbox";
import { useListEmails } from "./hooks/use_list_emails";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useSetFormEmail } from "./hooks/use_set_form_email";

type Props = {
  formId: string;
  value: string;
};
export function SelectEmail(props: Props) {
  const { data: emails } = useVerifiedEmails();
  const setEmail = useSetFormEmail();

  if (emails.length === 1) {
    return (
      <div className="relative">
        <Badge
          className="absolute right-0 mr-2 inset-y-2"
          color="green"
        >
          Verified
        </Badge>
        <Input defaultValue={props.value} disabled />
      </div>
    );
  }

  return (
    <Listbox
      value={props.value}
      onChange={(value) =>
        setEmail.mutateAsync({ email: value, formId: props.formId })}
    >
      {emails.map((email) => (
        <ListboxOption
          className="relative"
          value={email.email}
          key={email.email}
        >
          <ListboxLabel>{email.email}</ListboxLabel>
          <Badge className="absolute right-0" color="green">
            Verified
          </Badge>
        </ListboxOption>
      ))}
    </Listbox>
  );
}

export function useVerifiedEmails() {
  const { data: emails, ...rest } = useListEmails();

  const orgMemberEmails: { email: string; type: "org_member" }[] =
    emails?.memberEmails.map((email) => ({
      email: email.user.email,
      type: "org_member",
    })) ?? [];

  const verifiedEmails: { email: string; type: "external" }[] =
    emails?.organizationEmails.filter((email) => email.emailVerified).map((
      email,
    ) => ({ email: email.email, type: "external" })) ?? [];

  return { ...rest, data: [...orgMemberEmails, ...verifiedEmails] };
}
