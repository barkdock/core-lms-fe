import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { DollarSign, Wallet, Receipt, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const REVENUE_DATA = [
	{ month: "Jan", revenue: 5200 },
	{ month: "Feb", revenue: 6100 },
	{ month: "Mar", revenue: 7400 },
	{ month: "Apr", revenue: 6800 },
	{ month: "May", revenue: 7900 },
	{ month: "Jun", revenue: 8600 },
];

const PAYOUTS = [
	{ id: 1, label: "March payout", amount: 3240, status: "Paid", date: "Apr 2" },
	{ id: 2, label: "April payout", amount: 2780, status: "Processing", date: "Apr 30" },
	{ id: 3, label: "Course bonus", amount: 540, status: "Scheduled", date: "May 6" },
];

const STATS = [
	{ label: "Total revenue", value: "$38,420", icon: <DollarSign size={18} />, trend: "+12%" },
	{ label: "Pending payout", value: "$2,780", icon: <Wallet size={18} />, trend: "2 items" },
	{ label: "Avg monthly", value: "$6,820", icon: <Receipt size={18} />, trend: "+5%" },
	{ label: "Growth rate", value: "18%", icon: <TrendingUp size={18} />, trend: "QoQ" },
];

const CustomTooltip = ({ active, payload, label }) => {
	if (!active || !payload?.length) return null;
	return (
		<div className="card px-4 py-3 shadow-lg">
			<p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
			<p className="text-base font-bold text-primary-600">${payload[0].value.toLocaleString()}</p>
		</div>
	);
};

const TeacherRevenue = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-6"
		>
			<div>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">Revenue</h1>
				<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
					Track earnings, payouts, and growth over time
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				{STATS.map((stat) => (
					<div key={stat.label} className="card p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</p>
								<p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
							</div>
							<div className="h-9 w-9 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
								{stat.icon}
							</div>
						</div>
						<p className="text-xs text-emerald-500 mt-2">{stat.trend}</p>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
				<div className="xl:col-span-2">
					<motion.div
						className="card p-6"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
					>
						<div className="flex items-center justify-between mb-4">
							<div>
								<h2 className="text-base font-bold text-slate-900 dark:text-white">
									Revenue trend
								</h2>
								<p className="text-xs text-slate-400">Last 6 months</p>
							</div>
							<div className="flex items-center gap-2 text-emerald-500 text-xs font-semibold">
								<ArrowUpRight size={14} /> +14.6%
							</div>
						</div>
						<ResponsiveContainer width="100%" height={260}>
							<LineChart data={REVENUE_DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#e2e8f0"
									className="dark:stroke-slate-800"
								/>
								<XAxis
									dataKey="month"
									tick={{ fill: "#94a3b8", fontSize: 11 }}
									axisLine={false}
									tickLine={false}
								/>
								<YAxis
									tick={{ fill: "#94a3b8", fontSize: 11 }}
									axisLine={false}
									tickLine={false}
									width={40}
								/>
								<Tooltip content={<CustomTooltip />} />
								<Line
									type="monotone"
									dataKey="revenue"
									stroke="#d45a1f"
									strokeWidth={3}
									dot={{ r: 4 }}
									activeDot={{ r: 6 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</motion.div>
				</div>

				<motion.div
					className="card p-6"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-base font-bold text-slate-900 dark:text-white">Payouts</h2>
						<span className="text-xs text-slate-400">Next payout Apr 30</span>
					</div>
					<div className="space-y-3">
						{PAYOUTS.map((item) => (
							<div
								key={item.id}
								className="rounded-xl border border-slate-100 dark:border-slate-800 p-3"
							>
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
											{item.label}
										</p>
										<p className="text-xs text-slate-400">{item.date}</p>
									</div>
									<p className="text-sm font-bold text-slate-900 dark:text-white">
										${item.amount}
									</p>
								</div>
								<p className="text-xs mt-2 text-emerald-500">{item.status}</p>
							</div>
						))}
					</div>
					<div className="mt-4 rounded-xl border border-slate-100 dark:border-slate-800 p-4">
						<p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Revenue goal</p>
						<p className="text-[11px] text-slate-400">$8,600 / $12,000</p>
						<div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
							<div
								className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
								style={{ width: "72%" }}
							/>
						</div>
						<div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
							<ArrowDownRight size={12} /> next milestone in 18 days
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default TeacherRevenue;
