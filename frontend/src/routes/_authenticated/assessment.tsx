import { createFileRoute } from '@tanstack/react-router'
import { BarangayAssessmentPage } from './-assessment'

export const Route = createFileRoute('/_authenticated/assessment')({
    component: BarangayAssessmentPage,
})

