import { recentActivity } from "@/components/dashboard/mock-data";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Card, CardContent } from "@/components/ui/card";

export function BarangayAssessmentPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-50">Baranggay Assessment</h1>
                <p className="text-sm text-slate-400">
                    Manage and edit assessments here.
                </p>
            </div>

            {
                <Card className="border-slate-800 bg-slate-900/80 ring-slate-700/50 lg:col-span-2">
                    <CardContent className="pt-6">
                        <RecentActivity items={recentActivity} />
                    </CardContent>
                </Card>
            }
        </div>
    );
}