import { mockUsers } from "@/components/dashboard/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { UserList } from "@/components/users/user-list";

export function UsersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-50">Users</h1>
            </div>

            <Card className="border-slate-800 bg-slate-900/80 ring-slate-700/50 lg:col-span-2">
                <CardContent className="pt-6">
                    <UserList items={mockUsers} />
                </CardContent>
            </Card>
        </div>
    );
}