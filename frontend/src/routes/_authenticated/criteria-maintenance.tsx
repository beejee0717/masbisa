import { createFileRoute } from '@tanstack/react-router'
import { CriteriaMaintenancePage } from './-criteria-maintenance'

export const Route = createFileRoute('/_authenticated/criteria-maintenance')({
  component: CriteriaMaintenancePage,
})
