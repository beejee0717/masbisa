import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/-auth-context";

// Single read-only field row for profile details
function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-sm text-slate-50">{value}</p>
    </div>
  );
}

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Profile</h1>
        <p className="text-sm text-slate-400">
          Your account details. Editing will be added later.
        </p>
      </div>

      <Card className="border-slate-800 bg-slate-900/80 ring-slate-700/50">
        <CardHeader>
          <CardTitle className="text-slate-50">Account</CardTitle>
          <CardDescription className="text-slate-400">
            Information from your current session
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfileField label="Name" value={user?.name ?? "Not set"} />
          <ProfileField label="Email" value={user?.email ?? "—"} />
          <ProfileField label="User ID" value={user?.id ?? "—"} />
        </CardContent>
      </Card>
    </div>
  );
}
