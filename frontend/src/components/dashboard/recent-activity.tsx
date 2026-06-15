import { Activity } from "lucide-react";

type ActivityItem = {
  id: string;
  action: string;
  detail: string;
  time: string;
};

type RecentActivityProps = {
  items: ActivityItem[];
};

// Scrollable feed of recent dashboard events
export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium text-slate-50">Recent Activity</h3>
        <p className="text-sm text-slate-400">Latest updates across the workspace</p>
      </div>

      <ul className="divide-y divide-slate-800">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-800">
              <Activity className="size-3.5 text-sky-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-50">{item.action}</p>
              <p className="truncate text-sm text-slate-400">{item.detail}</p>
            </div>
            <span className="shrink-0 text-xs text-slate-500">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
