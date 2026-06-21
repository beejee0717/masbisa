import { createFileRoute } from '@tanstack/react-router'
import { CriteriaSetupPage } from './-criteria-setup'

export const Route = createFileRoute('/_authenticated/criteria-setup')({
  component: CriteriaSetupPage,
})
