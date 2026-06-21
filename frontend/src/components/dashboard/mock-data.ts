// Placeholder dashboard metrics — replace with real API data later
export const statCards = [
  {
    title: "Total Members",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
  },
  {
    title: "Active This Month",
    value: "1,204",
    change: "+8.2%",
    trend: "up" as const,
  },
  {
    title: "Pending Approvals",
    value: "38",
    change: "-4.1%",
    trend: "down" as const,
  },
  {
    title: "Monthly Revenue",
    value: "₱124,500",
    change: "+18.3%",
    trend: "up" as const,
  },
];

// Monthly enrollment counts for the bar chart
export const monthlyEnrollments = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 58 },
  { label: "Mar", value: 71 },
  { label: "Apr", value: 65 },
  { label: "May", value: 89 },
  { label: "Jun", value: 94 },
  { label: "Jul", value: 78 },
  { label: "Aug", value: 102 },
  { label: "Sep", value: 88 },
  { label: "Oct", value: 115 },
  { label: "Nov", value: 97 },
  { label: "Dec", value: 124 },
];

// Weekly activity trend for the line chart (0–100 scale)
export const weeklyActivity = [
  { label: "Mon", value: 62 },
  { label: "Tue", value: 74 },
  { label: "Wed", value: 68 },
  { label: "Thu", value: 85 },
  { label: "Fri", value: 91 },
  { label: "Sat", value: 45 },
  { label: "Sun", value: 38 },
];

// Recent activity feed items
export const recentActivity = [
  {
    id: "1",
    action: "New member registered",
    detail: "Maria Santos joined Group A",
    time: "2 min ago",
  },
  {
    id: "2",
    action: "Payment received",
    detail: "₱2,500 from Juan Dela Cruz",
    time: "18 min ago",
  },
  {
    id: "3",
    action: "Profile updated",
    detail: "Ana Reyes changed contact info",
    time: "1 hr ago",
  },
  {
    id: "4",
    action: "Report generated",
    detail: "Monthly summary for May 2026",
    time: "3 hr ago",
  },
  {
    id: "5",
    action: "Approval completed",
    detail: "12 pending applications reviewed",
    time: "Yesterday",
  },
];

export const mockUsers = [
  {
    id: "1",
    action: "John Doe",
    detail: "Balintonga",
    submitted: "20",
  },
  {
    id: "2",
    action: "Juan Dela Cruz",
    detail: "Dalisay",
    submitted: "37",
  },
  {
    id: "3",
    action: "Ana Reyes",
    detail: "Ibabao",
    submitted: "50",
  },
  {
    id: "4",
    action: "Arnold Sanchez",
    detail: "Maular",
    submitted: "28",
  },
  {
    id: "5",
    action: "Stephanie Yap",
    detail: "Palayan",
    submitted: "17",
  },
];


export const revenueData = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
];

export const activityData = [
  { name: "Mon", users: 400, sessions: 240 },
  { name: "Tue", users: 300, sessions: 139 },
  { name: "Wed", users: 200, sessions: 980 },
  { name: "Thu", users: 278, sessions: 390 },
  { name: "Fri", users: 189, sessions: 480 },
  { name: "Sat", users: 239, sessions: 380 },
  { name: "Sun", users: 349, sessions: 430 },
];

export const distributionData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 300 },
  { name: "Unknown", value: 200 },
];