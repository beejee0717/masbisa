import { useRouterAuth } from "@/router/use-router-auth";
import { Navigate, Outlet } from "@tanstack/react-router";
import { Route } from "./_authenticated";
import { AppShell } from "@/components/layout/app-shell";

export default function AuthenticatedLayout() {
  const { user, status } = useRouterAuth();
  const { redirectAfterLogin } = Route.useRouteContext();

  if (status === "loading") {
    return <div>Checking session…</div>;
  }

  if (!user) {
    return (
      <Navigate to="/login" search={{ redirect: redirectAfterLogin }} replace />
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
