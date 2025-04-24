import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/ui/dropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteSubmission } from "./hooks/use_delete_submission";

type Props = {
  formSlug: string;
  formId: string;
  submissionId: string;
};
export function FormSubmissionActionDropdown(props: Props) {
  const navigate = useNavigate();
  const deleteSubmission = useDeleteSubmission();

  const deleteSub = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this submission?",
    );

    if (!confirmed) return;

    await deleteSubmission.mutateAsync(
      { formId: props.formId, submissionId: props.submissionId },
      {
        onSuccess: () => {
          navigate({
            to: "/dashboard/forms/$formSlug/submissions",
            params: { formSlug: props.formSlug },
          });
        },
      },
    );
  };

  return (
    <Dropdown>
      <DropdownButton variant="outline">
        <EllipsisVerticalIcon />
      </DropdownButton>
      <DropdownMenu anchor="bottom end">
        <DropdownItem onClick={deleteSub}>
          Delete submission
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
