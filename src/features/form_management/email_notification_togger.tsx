import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { ToggleGroup, ToggleOption } from "@/components/ui/toggle_group";
import { useGetForm } from "./hooks/use_get_form";
import { useSetEmailNotificationPaused } from "./hooks/use_set_email_notification_paused";

type Options = "paused" | "enabled";
const options = [
  { isPaused: "paused", label: "Paused", Icon: <PauseIcon /> },
  { isPaused: "enabled", label: "Accept", Icon: <PlayIcon /> },
] as const;

export function EmailNotificationToggler(props: { formId: string }) {
  const { data: form } = useGetForm({ formId: props.formId });
  const toggle = useSetEmailNotificationPaused();
  const value: Options = form?.isEmailNotificationsPaused
    ? "paused"
    : "enabled";

  if (!form) {
    return;
  }

  const handleChange = async (value: Options) => {
    await toggle.mutateAsync({
      formId: form?.id,
      isPaused: value === "paused",
    });
  };

  return (
    <ToggleGroup
      value={value}
      onChange={handleChange}
      data-slot="control"
    >
      {options.map(({ isPaused: value, label, Icon }) => (
        <ToggleOption value={value} key={value}>
          {Icon}
          {label}
        </ToggleOption>
      ))}
    </ToggleGroup>
  );
}
