import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading_spinner";
import { ArrowUturnDownIcon } from "@heroicons/react/20/solid";
import { useForm } from "@tanstack/react-form";
import { useSetFormName } from "./use_set_form_name";
import z from "zod";

type Props = {
  formId: string;
  formName: string;
};

export function EditFormNameInput(props: Props) {
  const setFormName = useSetFormName();

  const schema = z.object({
    name: z.string().min(1, "Form name is required."),
  });

  const nameForm = useForm({
    defaultValues: { name: props.formName },
    validators: {
      onChange: schema,
      onSubmit: schema,
    },
    onSubmit: ({ value }) => {
      setFormName.mutateAsync({ name: value.name, formId: props.formId });
    },
  });

  return (
    <nameForm.Field name="name">
      {(field) => (
        <Field>
          <Label>Form Name</Label>
          <div className="flex gap-2" data-slot="control">
            <Input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />

            {field.state.value !== props.formName &&
              (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => nameForm.reset()}
                >
                  <ArrowUturnDownIcon className="rotate-90" />
                </Button>
              )}

            <Button
              onClick={nameForm.handleSubmit}
              type="button"
              variant="outline"
              disabled={field.state.value === props.formName}
            >
              {setFormName.isPending
                ? <LoadingSpinner data-slot="icon" />
                : "Save"}
            </Button>
          </div>
          <ErrorMessage>
            {field.state.meta.errors.map((e) => e?.message).join(
              " ",
            )}
          </ErrorMessage>
        </Field>
      )}
    </nameForm.Field>
  );
}
