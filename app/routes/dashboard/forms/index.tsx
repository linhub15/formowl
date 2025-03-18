import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/forms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/forms/"!</div>
}
