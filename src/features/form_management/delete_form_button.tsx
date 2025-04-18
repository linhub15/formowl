import { useNavigate } from "@tanstack/react-router";
import { useDeleteForm } from "./hooks/use_delete_form";
import { Button } from "@/components/ui/button";

type Props = {
  formId: string;
};

export function DeleteFormButton(props: Props) {
  const navigate = useNavigate();
  const tryDeleteForm = useDeleteForm();

  const deleteForm = async () => {
    const confirmed = confirm("Are you sure you want to delete this form?");
    if (!confirmed) {
      return;
    }
    await tryDeleteForm.mutateAsync({ formId: props.formId }, {
      onSuccess: () => {
        navigate({ to: "/dashboard/forms" });
      },
    });
  };

  return (
    <Button onClick={deleteForm} color="red">
      Delete form
    </Button>
  );
}
