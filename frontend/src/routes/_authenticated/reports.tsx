import { createFileRoute } from '@tanstack/react-router'
import { ReportsPage } from './-reports'

export const Route = createFileRoute('/_authenticated/reports')({
  component: ReportsPage,
})
