import { Activity } from "lucide-react";

type UserListItem = {
  id: string;
  action: string;
  detail: string;
  submitted: string;
};

type UserListProps = {
  items: UserListItem[];
};

// Scrollable feed of recent dashboard events
export function UserList({ items }: UserListProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-400">List of users on all barangays</p>
      </div>

      <ul className="divide-y divide-slate-800">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-800">
              <Activity className="size-3.5 text-sky-400" />
            </div>
            <div className="flex items-center flex-1 justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-50">{item.action}</p>
              <p className="truncate text-sm text-slate-400">{item.detail}</p>
            </div>
            <p className="truncate text-sm text-slate-400">{item.submitted}/50</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
