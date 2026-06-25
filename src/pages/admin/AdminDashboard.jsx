import { Link } from "react-router-dom";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import {
	DollarSign,
	Users,
	CheckSquare,
	BookOpen,
	Activity,
	ShieldCheck,
	Clock3,
	CircleDollarSign,
	AlertTriangle,
	ArrowRight,
	Settings,
	CreditCard,
} from "lucide-react";
import { useStats } from "@/hooks/useStats";
import StatCard from "@/components/ui/StatCard";
import SkeletonCard, { SkeletonChart } from "@/components/ui/SkeletonCard";

const ICON_MAP = {
	"Total Revenue": <DollarSign size={18} />,
	"Active Users": <Users size={18} />,
	"Pending Approvals": <CheckSquare size={18} />,
	"Total Courses": <BookOpen size={18} />,
};

const ACTIVITY_FEED = [
	{
		id: 1,
		title: "Payment gateway sync completed",
		detail: "Stripe + VNPay reconciliation finished · 0 mismatch",
		time: "5 mins ago",
		tone: "bg-emerald-500",
	},
	{
		id: 2,
		title: "Course approval updated",
		detail: "4 courses approved, 1 returned for revision",
		time: "18 mins ago",
		tone: "bg-blue-500",
	},
	{
		id: 3,
		title: "Security policy reminder",
		detail: "2FA re-validation required for 6 admin accounts",
		time: "42 mins ago",
		tone: "bg-amber-500",
	},
	{
		id: 4,
		title: "Peak traffic detected",
		detail: "+22% active sessions from marketing campaign",
		time: "1 hour ago",
		tone: "bg-violet-500",
	},
];

const REVENUE_CHANNELS = [
	{ label: "Web Checkout", value: "$28.4k", share: 62, color: "bg-indigo-500" },
	{ label: "Mobile App", value: "$11.7k", share: 25, color: "bg-sky-500" },
	{ label: "B2B Plans", value: "$6.1k", share: 13, color: "bg-emerald-500" },
];

const CRITICAL_ALERTS = [
	{ label: "Pending payouts", value: "$12.8k", detail: "Needs finance approval", tone: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300" },
	{ label: "Overdue reviews", value: "6", detail: "Courses waiting over 48h", tone: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-300" },
	{ label: "Failed payments", value: "14", detail: "Retry or refund required", tone: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300" },
	{ label: "Support escalations", value: "3", detail: "Admin response requested", tone: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/50 dark:bg-violet-900/20 dark:text-violet-300" },
];

const QUICK_ACTIONS = [
	{ label: "Review approvals", path: "/admin/approvals", icon: CheckSquare, desc: "Clear course and content queue" },
	{ label: "Manage courses", path: "/admin/courses", icon: BookOpen, desc: "Moderate inventory and quality" },
	{ label: "View payments", path: "/admin/payments", icon: CreditCard, desc: "Audit transactions and payouts" },
	{ label: "System settings", path: "/admin/settings", icon: Settings, desc: "Tune platform controls" },
];

const CustomTooltip = ({ active, payload, label }) => {
	if (!active || !payload?.length) return null;
	return (
		<div className="card px-4 py-3 shadow-lg">
			<p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
			<p className="text-base font-bold text-primary-600">{payload[0].value.toLocaleString()} users</p>
		</div>
	);
};

const AdminDashboard = () => {
	const { stats, isLoading } = useStats();

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="card p-5 md:p-6">
				<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
							<Activity size={13} />
							Live system status
						</div>
						<h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
							Admin Dashboard
						</h1>
						<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
							Platform-wide statistics, operations, and governance overview
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
						<div className="rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5">
							<p className="text-slate-500 dark:text-slate-400">Avg response time</p>
							<p className="mt-1 font-bold text-slate-900 dark:text-white">162ms</p>
						</div>
						<div className="rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5">
							<p className="text-slate-500 dark:text-slate-400">Risk alerts</p>
							<p className="mt-1 font-bold text-amber-600 dark:text-amber-400">2 medium</p>
						</div>
						<div className="rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5">
							<p className="text-slate-500 dark:text-slate-400">Data freshness</p>
							<p className="mt-1 font-bold text-slate-900 dark:text-white">12 mins</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{CRITICAL_ALERTS.map((alert) => (
					<div key={alert.label} className={`rounded-2xl border px-4 py-3 ${alert.tone}`}>
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="text-xs font-semibold uppercase tracking-wide opacity-80">{alert.label}</p>
								<p className="mt-1 text-xl font-black">{alert.value}</p>
								<p className="mt-0.5 text-xs opacity-80">{alert.detail}</p>
							</div>
							<AlertTriangle size={18} />
						</div>
					</div>
				))}
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{QUICK_ACTIONS.map((action) => (
					<Link
						key={action.path}
						to={action.path}
						className="card group flex items-center justify-between gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
					>
						<div className="flex items-center gap-3">
							<div className="rounded-2xl bg-slate-100 p-3 text-slate-700 transition group-hover:bg-primary-600 group-hover:text-white dark:bg-slate-900 dark:text-slate-200">
								<action.icon size={18} />
							</div>
							<div>
								<p className="text-sm font-bold text-slate-900 dark:text-white">{action.label}</p>
								<p className="text-xs text-slate-500 dark:text-slate-400">{action.desc}</p>
							</div>
						</div>
						<ArrowRight size={16} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-primary-500" />
					</Link>
				))}
			</div>

			{/* Stat Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				{isLoading
					? Array(4)
							.fill(0)
							.map((_, i) => <SkeletonCard key={i} />)
					: (stats?.cards || []).map((card) => (
							<StatCard key={card.label} {...card} icon={ICON_MAP[card.label]} />
					  ))}
			</div>

			{/* Charts row */}
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
				{/* User Growth Line Chart — xl: 2/3 width */}
				<div className="xl:col-span-2">
					{isLoading ? (
						<SkeletonChart />
					) : (
						<div className="card p-6">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h2 className="text-base font-bold text-slate-900 dark:text-white">
										User Growth
									</h2>
									<p className="text-xs text-slate-400 mt-0.5">Last 7 months</p>
								</div>
								<span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-lg">
									+
									{(() => {
										const first = stats?.chartData?.[0]?.users || 1;
										const last = stats?.chartData?.at(-1)?.users || first;
										return Math.round(((last - first) / first) * 100);
									})()}
									%
								</span>
							</div>
							<ResponsiveContainer width="100%" height={240}>
								<AreaChart
									data={stats?.chartData || []}
									margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
								>
									<defs>
										<linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
											<stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="#e2e8f0"
										className="dark:stroke-slate-700"
									/>
									<XAxis
										dataKey="month"
										tick={{ fontSize: 11, fill: "#94a3b8" }}
										axisLine={false}
										tickLine={false}
									/>
									<YAxis
										tick={{ fontSize: 11, fill: "#94a3b8" }}
										axisLine={false}
										tickLine={false}
										width={45}
									/>
									<Tooltip content={<CustomTooltip />} />
									<Area
										type="monotone"
										dataKey="users"
										stroke="#6366f1"
										strokeWidth={2.5}
										fill="url(#userGradient)"
										dot={{ r: 3.5, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }}
										activeDot={{
											r: 7,
											style: { filter: "drop-shadow(0 0 8px rgba(99,102,241,0.7))" },
										}}
										isAnimationActive={false}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					)}
				</div>

				{/* Quick stats column */}
				<div className="card p-6 space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-base font-bold text-slate-900 dark:text-white">Platform Health</h2>
						<ShieldCheck size={16} className="text-emerald-500" />
					</div>
					{[
						{ label: "API availability", value: "99.9%", bar: 99.9, color: "bg-emerald-500" },
						{ label: "Payment success rate", value: "97%", bar: 97, color: "bg-primary-500" },
						{ label: "Course review SLA", value: "84%", bar: 84, color: "bg-violet-500" },
						{ label: "Support response SLA", value: "91%", bar: 91, color: "bg-sky-500" },
					].map((item) => (
						<div key={item.label}>
							<div className="flex justify-between text-sm mb-1.5">
								<span className="text-slate-600 dark:text-slate-400 font-medium">
									{item.label}
								</span>
								<span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
							</div>
							<div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
								<div
									className={`h-full rounded-full ${item.color}`}
									style={{ width: `${item.bar}%` }}
								/>
							</div>
						</div>
					))}
					<div className="grid grid-cols-2 gap-2 pt-2">
						<div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 px-3 py-2.5">
							<p className="text-[11px] text-slate-500 dark:text-slate-400">Error budget</p>
							<p className="text-sm font-bold text-slate-900 dark:text-white">94%</p>
						</div>
						<div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 px-3 py-2.5">
							<p className="text-[11px] text-slate-500 dark:text-slate-400">API success</p>
							<p className="text-sm font-bold text-slate-900 dark:text-white">99.4%</p>
						</div>
					</div>
				</div>
			</div>

			{/* Revenue + activity */}
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
				<div className="card p-6 xl:col-span-1">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-base font-bold text-slate-900 dark:text-white">Revenue Channels</h2>
						<CircleDollarSign size={16} className="text-slate-500" />
					</div>
					<div className="space-y-4">
						{REVENUE_CHANNELS.map((item) => (
							<div key={item.label}>
								<div className="flex items-center justify-between text-sm mb-1.5">
									<span className="text-slate-600 dark:text-slate-400">{item.label}</span>
									<span className="font-semibold text-slate-900 dark:text-white">
										{item.value}
									</span>
								</div>
								<div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
									<div
										className={`h-full rounded-full ${item.color}`}
										style={{ width: `${item.share}%` }}
									/>
								</div>
								<p className="mt-1 text-[11px] text-slate-400">{item.share}% share</p>
							</div>
						))}
					</div>
				</div>

				<div className="card p-6 xl:col-span-2">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h2 className="text-base font-bold text-slate-900 dark:text-white">
								Recent Admin Activities
							</h2>
							<Link to="/admin/audit" className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400">
								Open audit log <ArrowRight size={12} />
							</Link>
						</div>
						<span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
							<Clock3 size={13} />
							Updated in real-time
						</span>
					</div>
					<div className="space-y-3">
						{ACTIVITY_FEED.map((item) => (
							<div
								key={item.id}
								className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 px-3.5 py-3"
							>
								<span className={`mt-1 h-2 w-2 rounded-full ${item.tone}`} />
								<div className="min-w-0">
									<p className="text-sm font-semibold text-slate-900 dark:text-white">
										{item.title}
									</p>
									<p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
										{item.detail}
									</p>
								</div>
								<span className="ml-auto flex-shrink-0 text-[11px] text-slate-400">
									{item.time}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Operational summary */}
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
				<div className="card p-6">
					<h2 className="text-base font-bold text-slate-900 dark:text-white">Operational Summary</h2>
					<p className="text-xs text-slate-400 mt-1">Last updated: Today 09:30</p>
					<div className="mt-4 space-y-3">
						{[
							{
								label: "System Status",
								value: "All services healthy",
								tone: "text-emerald-600 dark:text-emerald-400",
							},
							{
								label: "Data Freshness",
								value: "Sync 12 mins ago",
								tone: "text-slate-700 dark:text-slate-300",
							},
							{
								label: "Payment Reconcile",
								value: "0 unmatched records",
								tone: "text-slate-700 dark:text-slate-300",
							},
						].map((item) => (
							<div key={item.label} className="flex items-center justify-between text-sm">
								<span className="text-slate-500 dark:text-slate-400">{item.label}</span>
								<span className={`font-semibold ${item.tone}`}>{item.value}</span>
							</div>
						))}
					</div>
				</div>

				<div className="card p-6">
					<h2 className="text-base font-bold text-slate-900 dark:text-white">Governance Snapshot</h2>
					<p className="text-xs text-slate-400 mt-1">Objective policy signals</p>
					<div className="mt-4 space-y-3">
						{[
							{
								label: "Open Audit Items",
								value: "2",
								badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
							},
							{
								label: "Policy Exceptions",
								value: "0",
								badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
							},
							{
								label: "High-Risk Tickets",
								value: "1",
								badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
							},
						].map((item) => (
							<div key={item.label} className="flex items-center justify-between text-sm">
								<span className="text-slate-500 dark:text-slate-400">{item.label}</span>
								<span
									className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.badge}`}
								>
									{item.value}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="card p-6">
					<h2 className="text-base font-bold text-slate-900 dark:text-white">Quality Controls</h2>
					<p className="text-xs text-slate-400 mt-1">Content review throughput</p>
					<div className="mt-4 space-y-3">
						{[
							{ label: "Reviews Completed", value: "38 / 40 today" },
							{ label: "Median Review Time", value: "3h 12m" },
							{ label: "Re-review Rate", value: "4.6%" },
						].map((item) => (
							<div key={item.label} className="flex items-center justify-between text-sm">
								<span className="text-slate-500 dark:text-slate-400">{item.label}</span>
								<span className="font-semibold text-slate-800 dark:text-slate-200">
									{item.value}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Approval Queue */}
			<div className="card p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-base font-bold text-slate-900 dark:text-white">Course Approval Queue</h2>
					<Link to="/admin/approvals" className="btn-secondary text-xs px-3 py-1.5">
						View All
					</Link>
				</div>
				<div className="divide-y divide-slate-100 dark:divide-slate-800">
					{[
						{
							title: "Advanced React Patterns 2026",
							teacher: "Sarah Chen",
							submitted: "2h ago",
							price: "$89",
							category: "Frontend",
							status: "pending",
						},
						{
							title: "Machine Learning with Python",
							teacher: "Ahmed Hassan",
							submitted: "5h ago",
							price: "$109",
							category: "Data Science",
							status: "reviewing",
						},
						{
							title: "UX Research Methods",
							teacher: "Lisa Park",
							submitted: "1d ago",
							price: "$75",
							category: "Design",
							status: "pending",
						},
					].map((course) => (
						<div key={course.title} className="flex items-center justify-between py-3.5 gap-4">
							<div className="min-w-0">
								<p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
									{course.title}
								</p>
								<p className="text-xs text-slate-500 mt-0.5">
									{course.teacher} · {course.submitted}
								</p>
								<div className="mt-1 flex items-center gap-2 text-[11px]">
									<span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">
										{course.category}
									</span>
									<span className="font-semibold text-slate-700 dark:text-slate-200">
										{course.price}
									</span>
								</div>
							</div>
							<div className="flex items-center gap-2 flex-shrink-0">
								<span
									className={`px-2.5 py-0.5 text-xs font-semibold rounded-full
                  ${
					course.status === "pending"
						? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
						: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
				}`}
								>
									{course.status}
								</span>
								<Link to="/admin/approvals" className="btn-primary text-xs px-3 py-1.5">
									Review
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
