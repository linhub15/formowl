import { ToggleGroup, ToggleOption } from "@/components/ui/toggle_group";
import { useToggleFormTurnstile } from "./hooks/use_toggle_form_turnstile";
import { useGetTurnstile } from "../cloudflare_turnstile/hooks/use_get_turnstile";
import { useGetForm } from "./hooks/use_get_form";
import { LockClosedIcon } from "@heroicons/react/20/solid";

type Options = "enabled" | "disabled";

export function FormTurnstileToggler(props: { formSlug: string }) {
  const { data: form } = useGetForm({ formSlug: props.formSlug });
  const { data: orgTurnstile } = useGetTurnstile();
  const toggle = useToggleFormTurnstile();
  const value: Options = form?.cloudflareTurnstileId &&
      orgTurnstile?.siteKey &&
      orgTurnstile?.secretKey
    ? "enabled"
    : "disabled";

  const preventProtection = !orgTurnstile?.siteKey;

  if (!form) {
    return;
  }

  const handleChange = async (value: Options) => {
    await toggle.mutateAsync({
      formId: form?.id,
      cloudflareTurnstileId: value === "enabled" ? orgTurnstile?.id : undefined,
    });
  };

  return (
    <ToggleGroup
      name="turnstile_enabled"
      value={value}
      onChange={handleChange}
      data-slot="control"
      disabled={preventProtection}
    >
      <ToggleOption value="disabled">Allow bots</ToggleOption>
      <ToggleOption value="enabled">
        <LockClosedIcon data-slot="icon" />
        <span>
          Protect
        </span>
      </ToggleOption>
    </ToggleGroup>
  );
}
