import { Code } from "@/components/ui/text";
import { useListSubmissions } from "@/features/form_management/hooks/use_list_submissions";
import { maskLocalDate } from "@/lib/masks/mask_local_date";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/$formSlug/submissions")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const submissions = useListSubmissions({ formSlug: params.formSlug });
  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Submitted at</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {submissions.data?.map((s) => (
            <tr key={s.id} className="space-x-4">
              <td className="text-sm">
                {maskLocalDate(s.createdAt)}
              </td>
              <td>
                <Code>{JSON.stringify(s.data, null, 2)}</Code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
