import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
};

// Summary metric tile with trend indicator
export function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <Card className="border-slate-800 bg-slate-900/80 ring-slate-700/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-slate-800 p-2">
          <Icon className="size-4 text-slate-300" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-slate-50">{value}</p>
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-xs",
            trend === "up" ? "text-emerald-400" : "text-rose-400",
          )}
        >
          <TrendIcon className="size-3" />
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}
