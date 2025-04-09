import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, Label } from "@/components/ui/fieldset";
import { InputPassword } from "@/components/ui/input_password";
import { authClient } from "@/lib/auth/auth.client";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  currentPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password can't exceed 32 characters"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password can't exceed 32 characters"),
});

export function ChangePasswordFormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.changePassword({
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
        revokeOtherSessions: true,
      });
      setIsOpen(false);
      toast.success("Password changed");
    },
  });

  return (
    <>
      {/* Trigger */}
      <Button type="button" onClick={() => setIsOpen(true)} variant="plain">
        Change password
      </Button>

      {/* Dialog */}
      <Dialog open={isOpen} onClose={setIsOpen}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogTitle>Change your password</DialogTitle>
          <DialogDescription>
            Use a password at least 8 characters with both letters and numbers.
          </DialogDescription>

          <DialogBody>
            <FieldGroup>
              <Field>
                <form.Field name="currentPassword">
                  {(field) => (
                    <>
                      <Label htmlFor={field.name}>Current password</Label>
                      <InputPassword
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </>
                  )}
                </form.Field>
              </Field>

              <Field>
                <form.Field name="newPassword">
                  {(field) => (
                    <>
                      <Label htmlFor={field.name}>New password</Label>
                      <InputPassword
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </>
                  )}
                </form.Field>
              </Field>
            </FieldGroup>
          </DialogBody>

          <DialogActions>
            <Button onClick={close} variant="plain">Cancel</Button>
            <form.Subscribe selector={(state) => [state.isSubmitting]}>
              {([isSubmitting]) => (
                <Button type="submit" variant="outline" pending={isSubmitting}>
                  Save
                </Button>
              )}
            </form.Subscribe>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
