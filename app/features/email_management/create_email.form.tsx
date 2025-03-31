import { Card, CardBody, CardFooter } from "@/components/layout/card";
import { Button } from "@/components/ui/button";
import { Field, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useCreateEmail } from "./hooks/use_create_email";

export function CreateEmailForm() {
  const mutation = useCreateEmail();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({
        email: value.email,
      });

      await navigate({ to: "/dashboard/emails" });
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
      <Card>
        <CardBody>
          <form.Field name="email">
            {(field) => (
              <Field className="w-full max-w-sm">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="text"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={field.form.state.isSubmitting}
                />
              </Field>
            )}
          </form.Field>
        </CardBody>

        <CardFooter>
          <form.Subscribe>
            {(form) => (
              <Button
                type="submit"
                disabled={form.isSubmitting || !form.canSubmit}
              >
                Create email
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
