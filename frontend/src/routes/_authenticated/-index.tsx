import { BarChart } from "@/components/dashboard/bar-chart";
import { LineChart } from "@/components/dashboard/line-chart";
import {
  monthlyEnrollments,
  recentActivity,
  statCards,
  weeklyActivity,
} from "@/components/dashboard/mock-data";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/-auth-context";
import { api } from "@/lib/api";
import {
  Activity,
  CheckCircle2,
  DollarSign,
  Server,
  Users,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

interface HealthStatus {
  status: string;
  workspace: string;
}

// Icons mapped to each stat card by index
const statIcons = [Users, UserCheck, Activity, DollarSign] as const;

export function HomePage() {
  const { user } = useAuth();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);

  // Real API health check — shown alongside placeholder dashboard data
  useEffect(() => {
    api
      .get<HealthStatus>("/api/health")
      .then(setHealth)
      .catch(console.error)
      .finally(() => setHealthLoading(false));
  }, []);

  const greeting = user?.name ?? user?.email?.split("@")[0] ?? "there";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">
            Welcome back, {greeting}
          </h1>
          <p className="text-sm text-slate-400">
            Here&apos;s an overview of your workspace. Sample data shown below.
          </p>
        </div>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleDateString("en-PH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Key metrics row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            icon={statIcons[index] ?? Users}
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900/80 ring-slate-700/50">
          <CardContent className="pt-6">
            <BarChart
              title="Monthly Enrollments"
              description="New member sign-ups per month (placeholder)"
              data={monthlyEnrollments}
            />
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/80 ring-slate-700/50">
          <CardContent className="pt-6">
            <LineChart
              title="Weekly Activity"
              description="Active sessions this week (placeholder)"
              data={weeklyActivity}
            />
          </CardContent>
        </Card>
      </div>

      {/* Activity feed + system status */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900/80 ring-slate-700/50 lg:col-span-2">
          <CardContent className="pt-6">
            <RecentActivity items={recentActivity} />
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/80 ring-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-50">
              <Server className="size-4 text-slate-400" />
              System Status
            </CardTitle>
            <CardDescription className="text-slate-400">
              Live data from the API health endpoint
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthLoading ? (
              <>
                <Skeleton className="h-4 w-24 bg-slate-800" />
                <Skeleton className="h-4 w-32 bg-slate-800" />
              </>
            ) : health ? (
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <span className="text-sm capitalize text-slate-50">
                    {health.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">Workspace</p>
                  <p className="text-sm text-slate-300">{health.workspace}</p>
                </div>
              </>
            ) : (
              <p className="text-sm text-rose-400">
                Unable to reach the API. Check that the backend is running.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
