import { useForm } from "@tanstack/react-form";
import { useCreateForm } from "./hooks/use_create_form";
import { Field, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Card, CardBody, CardFooter } from "@/components/layout/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function CreateForm() {
  const mutation = useCreateForm();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      formName: "",
    },
    onSubmit: async ({ value }) => {
      const result = await mutation.mutateAsync({
        name: value.formName,
      });

      if (!result?.slug) {
        alert("form created but, failed to get the form slug");
        return;
      }

      await navigate({
        to: "/dashboard/forms/$formSlug",
        params: { formSlug: result.slug },
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
      <Card>
        <CardBody>
          <form.Field name="formName">
            {(field) => (
              <Field className="w-full max-w-sm">
                <Label htmlFor={field.name}>Form name</Label>
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
                Create form
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
