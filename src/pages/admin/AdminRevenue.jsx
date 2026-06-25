import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarRange, CircleDollarSign, Percent, Ticket, TrendingUp } from "lucide-react";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminCard from "@/components/admin/AdminCard";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/ui/StatCard";

const COUPONS = [
	{ code: "SPRING25", used: 240, remaining: 60, discount: "25%" },
	{ code: "WELCOME10", used: 180, remaining: 20, discount: "10%" },
	{ code: "STUDENT30", used: 90, remaining: 210, discount: "30%" },
	{ code: "BLACKFRI", used: 420, remaining: 10, discount: "40%" },
];
const LEAST_USED = COUPONS.filter((c) => c.used < 150);
const DAILY_REVENUE = [
	{ day: "Mon", revenue: 3200 }, { day: "Tue", revenue: 2800 }, { day: "Wed", revenue: 4100 }, { day: "Thu", revenue: 3600 }, { day: "Fri", revenue: 5200 }, { day: "Sat", revenue: 2900 }, { day: "Sun", revenue: 2400 },
];
const STATS = [
	{ label: "Weekly Revenue", value: "$24.8k", change: "+9.4%", trend: "up", color: "emerald", icon: <CircleDollarSign size={18} /> },
	{ label: "Active Coupons", value: "4", change: "2 expiring soon", trend: "neutral", color: "indigo", icon: <Ticket size={18} /> },
	{ label: "Avg. Discount", value: "26%", change: "+3.2%", trend: "up", color: "amber", icon: <Percent size={18} /> },
	{ label: "Peak Day", value: "$5.2k", change: "Friday", trend: "up", color: "violet", icon: <TrendingUp size={18} /> },
];

const CustomRevenueTooltip = ({ active, payload, label }) => {
	if (!active || !payload?.length) return null;
	return <div className="card px-4 py-3 shadow-lg"><p className="mb-1 text-xs font-semibold text-slate-500">{label}</p><p className="text-base font-bold text-primary-600">${payload[0].value.toLocaleString()}</p></div>;
};

const AdminRevenue = () => {
	const [showDaily, setShowDaily] = useState(true);
	const columns = [
		{ key: "code", header: "Coupon", render: (coupon) => <span className="font-mono text-xs font-bold text-primary-600">{coupon.code}</span> },
		{ key: "discount", header: "Discount", align: "center", render: (coupon) => <AdminBadge variant="primary">{coupon.discount}</AdminBadge> },
		{ key: "used", header: "Used", align: "right", cellClassName: "font-bold" },
		{ key: "remaining", header: "Remaining", align: "right" },
	];

	return (
		<div className="space-y-6 animate-fade-in">
			<AdminPageHeader title="Revenue & Coupons" description="Analyze daily revenue, coupon usage, and discount effectiveness." actions={<button type="button" onClick={() => setShowDaily((v) => !v)} className="btn-secondary"><CalendarRange className="h-4 w-4" />{showDaily ? "Daily view" : "Weekly view"}</button>} />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{STATS.map((stat) => <StatCard key={stat.label} {...stat} variant="plain" />)}</div>
			<div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
				<AdminCard title="Daily Revenue" description="Last 7 days revenue trend." className="xl:col-span-2"><ResponsiveContainer width="100%" height={260}><LineChart data={DAILY_REVENUE} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={54} tickFormatter={(v) => `$${v / 1000}k`} /><Tooltip content={<CustomRevenueTooltip />} /><Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3.5, strokeWidth: 2, stroke: "#fff", fill: "#6366f1" }} activeDot={{ r: 6 }} isAnimationActive={showDaily} animationDuration={800} /></LineChart></ResponsiveContainer></AdminCard>
				<AdminCard title="Underused Coupons" description="Coupons with usage below threshold."><div className="space-y-3">{LEAST_USED.map((coupon) => <div key={coupon.code} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/40"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300"><Percent className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-slate-800 dark:text-slate-100">{coupon.code}</p><p className="text-[11px] text-slate-500 dark:text-slate-400">Used {coupon.used} times · {coupon.remaining} remaining</p></div><AdminBadge variant="success">{coupon.discount}</AdminBadge></div>)}</div></AdminCard>
			</div>
			<AdminCard title="Coupon Usage Distribution" description="Compare total usage for each coupon."><ResponsiveContainer width="100%" height={220}><BarChart data={COUPONS} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="code" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={48} /><Tooltip content={({ active, payload, label }) => active && payload?.length ? <div className="card px-4 py-3 shadow-lg"><p className="mb-1 text-xs font-semibold text-slate-500">{label}</p><p className="text-xs text-slate-500">Used <span className="font-semibold text-slate-800 dark:text-slate-100">{payload[0].value}</span> times</p></div> : null} /><Bar dataKey="used" fill="#14b8a6" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></AdminCard>
			<AdminCard title="Coupon Inventory" description="Current discount code usage and remaining allocation." bodyClassName="p-0"><AdminDataTable columns={columns} rows={COUPONS} getRowKey={(row) => row.code} /></AdminCard>
		</div>
	);
};

export default AdminRevenue;
