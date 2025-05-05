import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, Label } from "@/components/ui/fieldset";
import { InputTextarea } from "@/components/ui/input_textarea";
import { SidebarItem, SidebarLabel } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth/hooks/use_session";
import { LightBulbIcon } from "@heroicons/react/20/solid";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const feedbackForm = new URL("https://formowl.dev/api/@/5GWjVN");

export function FeedbackDialog() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const submission = useMutation({
    mutationFn: async (form: { feedback: string }) => {
      const postBody = new FormData();
      postBody.append("email", session?.user.email || "");
      postBody.append("feedback", form.feedback);

      const response = await fetch(feedbackForm, {
        method: "POST",
        body: postBody,
      });

      if (!response.ok) {
        alert("error");
        return;
      }

      toast.success("Feedback received, thank you!");
    },
  });

  const form = useForm({
    defaultValues: {
      feedback: "",
    },
    onSubmit: async ({ value }) => {
      await submission.mutateAsync(value);

      close();
    },
  });

  const close = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      <SidebarItem onClick={() => setIsOpen(true)}>
        <LightBulbIcon />
        <SidebarLabel>
          Share Feedback <Badge color="green">New</Badge>
        </SidebarLabel>
      </SidebarItem>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogTitle>Thanks for using Form Owl!</DialogTitle>
          <DialogDescription>
            Let me know your experience using Form Owl. Any bugs or feature
            requests would be greatly appreciated! 👍
          </DialogDescription>

          <DialogBody>
            <FieldGroup>
              <Field>
                <form.Field name="feedback">
                  {(field) => (
                    <>
                      <Label htmlFor={field.name}>Feedback</Label>
                      <InputTextarea
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

          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <DialogActions>
                <Button onClick={close} variant="plain" disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="outline" pending={isSubmitting}>
                  Save
                </Button>
              </DialogActions>
            )}
          </form.Subscribe>
        </form>
      </Dialog>
    </>
  );
}
