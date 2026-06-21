import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { activityData, distributionData, revenueData } from "@/components/dashboard/mock-data";


// Rich aesthetic colors for the Pie chart                                                                                                           
const COLORS = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b"];

export function ReportsPage() {
    return (
        <div className="space-y-6">
            {/* Header and Action Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-50">Reports</h1>
                    <p className="text-sm text-slate-400">
                        Analytics and system overviews.
                    </p>
                </div>

                {/* Dummy Generate Report Button */}
                <Button
                    onClick={() => alert("Report generation started...")}
                    className="gap-2 bg-sky-600 text-white hover:bg-sky-500 transition-colors"
                >
                    <Download className="size-4" />
                    Generate Report
                </Button>
            </div>

            {/* Grid for Graphs */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* 1. Bar Chart */}
                <Card className="border-slate-800 bg-slate-900/80">
                    <CardHeader>
                        <CardTitle className="text-slate-50">Revenue Overview</CardTitle>
                        <CardDescription className="text-slate-400">Monthly revenue for this year</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f8fafc", borderRadius: "8px" }}
                                        itemStyle={{ color: "#e2e8f0" }}
                                        cursor={{ fill: '#1e293b' }}
                                    />
                                    <Bar dataKey="total" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Line Chart */}
                <Card className="border-slate-800 bg-slate-900/80">
                    <CardHeader>
                        <CardTitle className="text-slate-50">User Activity</CardTitle>
                        <CardDescription className="text-slate-400">Daily active users vs sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={activityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f8fafc", borderRadius: "8px" }}
                                        itemStyle={{ color: "#e2e8f0" }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "10px" }} />
                                    <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} activeDot={{ r: 6 }} dot={false} />
                                    <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Area Chart */}
                <Card className="border-slate-800 bg-slate-900/80">
                    <CardHeader>
                        <CardTitle className="text-slate-50">Traffic Growth</CardTitle>
                        <CardDescription className="text-slate-400">Traffic volume over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f8fafc", borderRadius: "8px" }}
                                        itemStyle={{ color: "#e2e8f0" }}
                                    />
                                    <Area type="monotone" dataKey="sessions" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Pie Chart */}
                <Card className="border-slate-800 bg-slate-900/80">
                    <CardHeader>
                        <CardTitle className="text-slate-50">Device Distribution</CardTitle>
                        <CardDescription className="text-slate-400">Traffic source by device category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f8fafc", borderRadius: "8px" }}
                                        itemStyle={{ color: "#e2e8f0" }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}                                                                                                                                                    
