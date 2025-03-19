import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/forms/$formSlug/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/forms/$formSlug/settings"!</div>
}
