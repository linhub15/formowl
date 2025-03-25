import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { useGetTurnstile } from "@/features/cloudflare_turnstile/hooks/use_get_turnstile";
import { useUpsertTurnstile } from "@/features/cloudflare_turnstile/hooks/use_upsert_turnstile";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export function TurnstileFormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: turnstile } = useGetTurnstile();
  const upsert = useUpsertTurnstile();

  const form = useForm({
    defaultValues: {
      siteKey: turnstile?.siteKey,
      secretKey: turnstile?.secretKey,
    },
    onSubmit: async ({ value }) => {
      await upsert.mutateAsync({
        turnstileId: turnstile?.id,
        siteKey: value.siteKey,
        secretKey: value.secretKey,
      }, { onSuccess: close });
    },
  });

  const close = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      {/* Trigger */}
      <Button type="button" onClick={() => setIsOpen(true)} outline>
        <PencilSquareIcon />
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
          <DialogTitle>Update Cloudflare Turnstile</DialogTitle>

          <DialogBody>
            <FieldGroup>
              <Field>
                <form.Field name="siteKey">
                  {(field) => (
                    <>
                      <Label htmlFor={field.name}>Turnstile Site Key</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="0x4AAAAAAANYYyy5YYyyyyYy"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </>
                  )}
                </form.Field>
              </Field>

              <Field>
                <form.Field name="secretKey">
                  {(field) => (
                    <>
                      <Label htmlFor={field.name}>Turnstile Secret Key</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
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
            <Button onClick={close} plain>Cancel</Button>
            <Button type="submit" outline>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
