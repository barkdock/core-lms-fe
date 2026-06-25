import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const GRADIENT_MAP = {
	indigo: {
		bg: "bg-gradient-to-br from-indigo-500 to-indigo-700",
		iconBg: "bg-white/20",
	},
	emerald: {
		bg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
		iconBg: "bg-white/20",
	},
	amber: {
		bg: "bg-gradient-to-br from-amber-500 to-orange-600",
		iconBg: "bg-white/20",
	},
	violet: {
		bg: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
		iconBg: "bg-white/20",
	},
	rose: {
		bg: "bg-gradient-to-br from-rose-500 to-pink-600",
		iconBg: "bg-white/20",
	},
	sky: {
		bg: "bg-gradient-to-br from-sky-500 to-blue-700",
		iconBg: "bg-white/20",
	},
};

/**
 * StatCard — displays a metric with trend indicator and gradient background.
 */
const PLAIN_ICON_MAP = {
	indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300",
	emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
	amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
	violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300",
	rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300",
	sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300",
};

const StatCard = ({ label, value, change, trend, color = "indigo", icon, variant = "gradient" }) => {
	const gradient = GRADIENT_MAP[color] || GRADIENT_MAP.indigo;
	const plainIcon = PLAIN_ICON_MAP[color] || PLAIN_ICON_MAP.indigo;

	const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
	const trendColor = trend === "up" ? "text-emerald-300" : trend === "down" ? "text-red-300" : "text-white/50";
	const plainTrendColor = trend === "down" ? "text-rose-600 dark:text-rose-400" : trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400";

	if (variant === "plain") {
		return (
			<div className="stat-card cursor-default overflow-hidden">
				<div className="flex items-start justify-between gap-3">
					<div>
						<p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
						<p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
					</div>
					{icon && <span className={`rounded-xl p-2.5 ${plainIcon}`}>{icon}</span>}
				</div>
				{change && (
					<div className={`mt-3 flex items-center gap-1.5 text-xs font-semibold ${plainTrendColor}`}>
						<TrendIcon size={13} />
						<span>{change}</span>
					</div>
				)}
			</div>
		);
	}

	return (
		<div
			className={`relative overflow-hidden rounded-2xl ${gradient.bg} p-6 shadow-md ring-1 ring-white/10 cursor-default`}
		>
			<div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
			<div className="pointer-events-none absolute -left-4 -bottom-6 h-16 w-16 rounded-full bg-black/10" />

			<div className="relative flex items-start justify-between">
				<p className="text-sm font-semibold text-white/85">{label}</p>
				{icon && <span className={`p-2.5 rounded-xl ${gradient.iconBg}`}>{icon}</span>}
			</div>

			<p className="relative text-3xl font-bold tracking-tight text-white mt-3">{value}</p>

			{change && (
				<div className={`relative flex items-center gap-1.5 text-xs font-semibold mt-3 ${trendColor}`}>
					<TrendIcon size={13} />
					<span>{change} vs last month</span>
				</div>
			)}
		</div>
	);
};

export default StatCard;
