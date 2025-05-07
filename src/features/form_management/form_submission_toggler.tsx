import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { useSetSubmissionPaused } from "./hooks/use_set_submission_paused";
import { ToggleGroup, ToggleOption } from "@/components/ui/toggle_group";

type Options = "true" | "false";
const options = [
  { isPaused: "true", label: "Paused", Icon: <PauseIcon /> },
  { isPaused: "false", label: "Accept", Icon: <PlayIcon /> },
] as const;

export function FormSubmissionToggler(
  props: { formId: string; isPaused: boolean },
) {
  const value = props.isPaused ? "true" : "false";
  const toggle = useSetSubmissionPaused();

  // todo: handle pending state

  const setFormIsPaused = async (value: Options) => {
    await toggle.mutateAsync({
      formId: props.formId,
      isPaused: value === "true",
    });
  };

  return (
    <ToggleGroup
      value={value}
      onChange={setFormIsPaused}
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
