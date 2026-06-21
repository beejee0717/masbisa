import { lazy, type ReactNode } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Bell, ChartArea, Edit, LayoutDashboard, LogOut, MessagesSquare, Settings, User, Users, Wrench } from "lucide-react";
import { useAuth } from "@/context/-auth-context";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar";
// Sidebar nav items — add more entries here as you add routesa
const menuItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/profile", label: "Profile", icon: User, exact: false },
    { to: "/assessment", label: "Baranggay Assessment", icon: Edit, exact: false }
] as const;
const criteriaItems = [
    { to: "/criteria-setup", label: "Set-Up Criteria", icon: Settings, exact: false },
    { to: "/criteria-maintenance", label: "Criteria Maintenance", icon: Wrench, exact: false }
] as const;
const barangayItems = [
    { to: "/users", label: "Users", icon: Users, exact: false },
    { to: "/reports", label: "Reports", icon: ChartArea, exact: false }
] as const;
type AppShellProps = {
    children: ReactNode;
};
// One nav link with active-state highlighting
function NavItem({
    to,
    label,
    icon: Icon,
    exact = false,
}: {
    to: string;
    label: string;
    icon: typeof LayoutDashboard;
    exact?: boolean;
}) {
    const matchRoute = useMatchRoute();
    const isActive = !!matchRoute({ to, fuzzy: !exact });
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
                <Link to={to}>
                    <Icon />
                    <span>{label}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
export function AppShell({ children }: AppShellProps) {
    const { user, logout } = useAuth();
    return (
        <TooltipProvider>
            {/* Slate palette matches login page: 950 backdrop, 900 sidebar panel */}
            <SidebarProvider className="min-h-svh bg-slate-950">
                <Sidebar
                    collapsible="icon"
                    className="border-r border-slate-800 text-slate-50 [&_[data-sidebar=sidebar]]:bg-slate-900 [&_[data-sidebar=menu-button]:hover]:bg-slate-800
                            [&_[data-sidebar=menu-button]:hover]:text-slate-50 [&_[data-sidebar=menu-button][data-active=true]]:bg-slate-800
                            [&_[data-sidebar=menu-button][data-active=true]]:text-slate-50 [&_[data-sidebar=menu-button][data-active=true]_svg]:text-slate-50"
                >
                    {/* App branding */}
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" className="pointer-events-none">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-800 text-slate-50">
                                        <span className="text-sm font-bold">M</span>
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">MASBISA</span>
                                        <span className="truncate text-xs text-slate-400">
                                            Dashboard
                                        </span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    {/* Primary navigation */}
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-slate-400">Menu</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.map((item) => (
                                        <NavItem key={item.to} {...item} />
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                            <SidebarGroupLabel className="text-slate-400">Criteria Management</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {criteriaItems.map((item) => (
                                        <NavItem key={item.to} {...item} />
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                            <SidebarGroupLabel className="text-slate-400">Barangay Management</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {barangayItems.map((item) => (
                                        <NavItem key={item.to} {...item} />
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    {/* Signed-in user + logout */}
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="pointer-events-none">
                                    <User />
                                    <span className="truncate">
                                        {user?.name ?? user?.email ?? "Signed in"}
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="h-8 w-full justify-start gap-2 px-2 font-normal text-slate-50 hover:bg-slate-800 hover:text-slate-50"
                                        onClick={() => void logout()}
                                    >
                                        <LogOut />
                                        <span>Log out</span>
                                    </Button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>
                {/* Page content area — slate-950 matches login page backdrop */}
                <SidebarInset className="bg-slate-950 text-slate-50">
                    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 px-4">
                        <SidebarTrigger className="text-slate-50" />
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative text-slate-400 hover:bg-slate-800/60 hover:text-slate-50 transition-colors"
                                aria-label="Messages"
                            >
                                <MessagesSquare className="size-5" />
                                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-semibold text-white ring-2 ring-slate-950">
                                    3
                                </span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative text-slate-400 hover:bg-slate-800/60 hover:text-slate-50 transition-colors"
                                aria-label="Notifications"
                            >
                                <Bell className="size-5"/>
                                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-semibold text-white ring-2 ring-slate-950">
                                    5
                                </span>
                            </Button>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col p-6">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}