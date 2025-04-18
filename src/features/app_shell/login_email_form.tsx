import { Button } from "@/components/ui/button";
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

export function LoginEmailForm() {
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string({ message: "Email is required." }).email(
      "Invalid email address",
    ),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      await navigate({
        to: "/login/$email",
        params: { email: value.email },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Fieldset>
        <FieldGroup>
          <form.Field name="email">
            {(field) => (
              <Field>
                <Label>Email</Label>
                <Input
                  type="email"
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  onBlur={field.handleBlur}
                />

                {field.state.value.length > 0 &&
                  field.state.meta.errors?.length > 0 &&
                  (
                    <ErrorMessage>
                      {field.state.meta.errors.map((x) => x?.message).join(",")}
                    </ErrorMessage>
                  )}
              </Field>
            )}
          </form.Field>
          <Button
            type="submit"
            className="w-full"
            color="white"
          >
            Continue with email
          </Button>
        </FieldGroup>
      </Fieldset>
    </form>
  );
}
