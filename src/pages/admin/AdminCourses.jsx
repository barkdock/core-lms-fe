import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BookOpen, Filter, CalendarDays, X, Star, ShieldAlert, Eye, Send, Sparkles, TrendingUp, BarChart3, ChevronDown } from "lucide-react";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminFilterBar from "@/components/admin/AdminFilterBar";

const VIEW_MODES = [
	{ id: "day", label: "Daily" },
	{ id: "week", label: "Weekly" },
	{ id: "month", label: "Monthly" },
];

const DATA_BY_VIEW = {
	day: [
		{ name: "React Advanced", enrollments: 42 },
		{ name: "Node.js APIs", enrollments: 35 },
		{ name: "UI/UX Design", enrollments: 27 },
		{ name: "Data Analysis", enrollments: 19 },
	],
	week: [
		{ name: "React Advanced", enrollments: 220 },
		{ name: "Node.js APIs", enrollments: 198 },
		{ name: "UI/UX Design", enrollments: 174 },
		{ name: "Data Analysis", enrollments: 156 },
	],
	month: [
		{ name: "React Advanced", enrollments: 920 },
		{ name: "Node.js APIs", enrollments: 840 },
		{ name: "UI/UX Design", enrollments: 780 },
		{ name: "Data Analysis", enrollments: 640 },
	],
};

const formatDate = (d) => new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const TOP_COURSES = [
	{ name: "React Advanced Patterns", instructor: "Sarah Chen", enrollments: 920, completionRate: 82, rating: 4.9 },
	{ name: "Node.js & REST APIs", instructor: "Ahmed Hassan", enrollments: 840, completionRate: 74, rating: 4.7 },
	{ name: "UI/UX Fundamentals", instructor: "Lisa Park", enrollments: 780, completionRate: 88, rating: 4.8 },
	{ name: "Python for Data Science", instructor: "John Smith", enrollments: 640, completionRate: 69, rating: 4.6 },
];

const INITIAL_COURSES = [
	{ id: 1, title: "React Advanced Patterns", instructor: "Sarah Chen", category: "Frontend", enrollments: 920, revenue: 81880, rating: 4.9, status: "published", featured: true, updated: "2h ago" },
	{ id: 2, title: "Node.js & REST APIs", instructor: "Ahmed Hassan", category: "Backend", enrollments: 840, revenue: 74760, rating: 4.7, status: "published", featured: false, updated: "5h ago" },
	{ id: 3, title: "UX Research Methods", instructor: "Lisa Park", category: "Design", enrollments: 212, revenue: 15900, rating: 4.8, status: "pending", featured: false, updated: "1d ago" },
	{ id: 4, title: "Growth Analytics Bootcamp", instructor: "Minh Tran", category: "Marketing", enrollments: 126, revenue: 7434, rating: 4.4, status: "flagged", featured: false, updated: "2d ago" },
	{ id: 5, title: "Python for Data Science", instructor: "John Smith", category: "Data Science", enrollments: 640, revenue: 63360, rating: 4.6, status: "draft", featured: false, updated: "3d ago" },
];

const STATUS_CFG = {
	published: { label: "Published", variant: "success" },
	draft: { label: "Draft", variant: "neutral" },
	pending: { label: "Pending", variant: "warning" },
	flagged: { label: "Flagged", variant: "danger" },
	archived: { label: "Archived", variant: "info" },
};

const money = (value) => `$${value.toLocaleString()}`;

const CustomTooltip = ({ active, payload, label }) => {
	if (!active || !payload?.length) return null;
	return (
		<div className="rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/80">
			<p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
			<p className="font-heading text-lg font-bold text-primary-600 dark:text-primary-400">
				{payload[0].value.toLocaleString()} <span className="text-sm font-medium text-slate-500">enrollments</span>
			</p>
		</div>
	);
};

const STAT_COLORS = {
	emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", glow: "bg-emerald-400/20", border: "border-emerald-200/50 dark:border-emerald-800/30" },
	indigo: { bg: "bg-indigo-50 dark:bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", glow: "bg-indigo-400/20", border: "border-indigo-200/50 dark:border-indigo-800/30" },
	amber: { bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", glow: "bg-amber-400/20", border: "border-amber-200/50 dark:border-amber-800/30" },
	rose: { bg: "bg-rose-50 dark:bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", glow: "bg-rose-400/20", border: "border-rose-200/50 dark:border-rose-800/30" },
};

const PremiumStatCard = ({ label, value, icon, color, delay }) => {
	const c = STAT_COLORS[color] || STAT_COLORS.indigo;
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay }}
			className={`group relative overflow-hidden rounded-[2rem] border bg-white/40 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/40 dark:shadow-none ${c.border}`}
		>
			<div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 ${c.glow}`} />
			<div className="relative flex items-center justify-between">
				<span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</span>
				<div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${c.bg} ${c.text} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
					{icon}
				</div>
			</div>
			<div className="relative mt-5">
				<p className="font-heading text-4xl font-black tracking-tight text-slate-900 dark:text-white">
					{value}
				</p>
			</div>
		</motion.div>
	);
};

const AdminCourses = () => {
	const [viewMode, setViewMode] = useState("week");
	const [dateOpen, setDateOpen] = useState(false);
	const [courses, setCourses] = useState(INITIAL_COURSES);
	const [courseSearch, setCourseSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [notice, setNotice] = useState("");
	const popoverRef = useRef(null);
	const [currentMonth, setCurrentMonth] = useState(() => new Date());
	const [range, setRange] = useState(undefined);

	const baseData = DATA_BY_VIEW[viewMode];

	const daysSelected = useMemo(() => {
		if (viewMode !== "day") return null;
		if (!range?.from) return 1;
		if (!range?.to) return 1;
		const a = new Date(range.from);
		const b = new Date(range.to);
		a.setHours(0, 0, 0, 0);
		b.setHours(0, 0, 0, 0);
		return clamp(Math.round((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000)) + 1, 1, 366);
	}, [range, viewMode]);

	const chartData = useMemo(() => {
		if (viewMode !== "day") return baseData;
		const n = daysSelected || 1;
		return baseData.map((item) => ({ ...item, enrollments: Math.max(0, Math.round(item.enrollments * n)) }));
	}, [baseData, viewMode, daysSelected]);

	const rangeLabel = useMemo(() => {
		if (viewMode !== "day") return "";
		if (!range?.from) return "Select date range";
		if (!range?.to) return `${formatDate(range.from)}`;
		return `${formatDate(range.from)} → ${formatDate(range.to)}`;
	}, [range, viewMode]);

	const presets = useMemo(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const addDays = (d, delta) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta);
		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
		return [
			{ id: "today", label: "Today", get: () => ({ from: today, to: today }) },
			{ id: "yesterday", label: "Yesterday", get: () => ({ from: addDays(today, -1), to: addDays(today, -1) }) },
			{ id: "7d", label: "7 days", get: () => ({ from: addDays(today, -6), to: today }) },
			{ id: "30d", label: "30 days", get: () => ({ from: addDays(today, -29), to: today }) },
			{ id: "month", label: "This month", get: () => ({ from: startOfMonth, to: endOfMonth }) },
		];
	}, []);

	const filteredCourses = useMemo(() => {
		const needle = courseSearch.trim().toLowerCase();
		return courses.filter((course) => {
			const matchesSearch = !needle || [course.title, course.instructor, course.category].some((value) => value.toLowerCase().includes(needle));
			const matchesStatus = statusFilter === "all" || course.status === statusFilter;
			const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
			return matchesSearch && matchesStatus && matchesCategory;
		});
	}, [categoryFilter, courseSearch, courses, statusFilter]);

	const categories = useMemo(() => [...new Set(courses.map((course) => course.category))], [courses]);

	const inventoryStats = useMemo(
		() => [
			{ label: "Published", value: courses.filter((c) => c.status === "published").length, icon: <BookOpen size={20} />, color: "emerald" },
			{ label: "Drafts", value: courses.filter((c) => c.status === "draft").length, icon: <Eye size={20} />, color: "indigo" },
			{ label: "Pending", value: courses.filter((c) => c.status === "pending").length, icon: <Send size={20} />, color: "amber" },
			{ label: "Flagged", value: courses.filter((c) => c.status === "flagged").length, icon: <ShieldAlert size={20} />, color: "rose" },
		],
		[courses]
	);

	useEffect(() => {
		if (!dateOpen) return;
		const onDown = (e) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target)) setDateOpen(false);
		};
		document.addEventListener("mousedown", onDown);
		return () => document.removeEventListener("mousedown", onDown);
	}, [dateOpen]);

	const courseColumns = [
		{
			key: "title",
			header: "Course",
			render: (c) => (
				<div>
					<p className="font-heading text-sm font-bold text-slate-900 dark:text-white">{c.title}</p>
					<p className="text-xs font-medium text-slate-500">
						{c.instructor} · {c.category}
					</p>
				</div>
			),
		},
		{ key: "enrollments", header: "Enrollments", align: "right", cellClassName: "font-bold text-slate-700 dark:text-slate-200" },
		{
			key: "revenue",
			header: "Revenue",
			align: "right",
			render: (c) => <span className="font-bold text-primary-600 dark:text-primary-400">{money(c.revenue)}</span>,
		},
		{
			key: "rating",
			header: "Rating",
			align: "center",
			render: (c) => (
				<span className="inline-flex items-center gap-1.5 text-sm font-bold">
					<Star size={14} className="fill-amber-400 text-amber-400" />
					{c.rating}
				</span>
			),
		},
		{
			key: "status",
			header: "Status",
			align: "center",
			render: (c) => {
				const cfg = STATUS_CFG[c.status] || STATUS_CFG.draft;
				return <AdminBadge variant={cfg.variant}>{cfg.label}</AdminBadge>;
			},
		},
		{ key: "updated", header: "Updated", align: "right", cellClassName: "text-xs font-medium text-slate-400" },
	];

	return (
		<div className="relative min-h-screen pb-12">
			{/* Ambient Background */}
			<div className="pointer-events-none absolute left-0 top-0 -z-10 h-[800px] w-full overflow-hidden opacity-70">
				<div className="absolute -top-[20%] left-[-10%] h-[600px] w-[600px] animate-float rounded-full bg-primary-400/20 mix-blend-multiply blur-[120px] dark:bg-primary-600/10 dark:mix-blend-screen" />
				<div
					className="absolute -top-[10%] right-[-5%] h-[500px] w-[500px] animate-float rounded-full bg-amber-400/20 mix-blend-multiply blur-[120px] dark:bg-amber-600/10 dark:mix-blend-screen"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			<div className="space-y-8">
				{/* Custom Premium Header */}
				<div className="relative mt-2 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="z-10">
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-600 shadow-sm dark:border-primary-900/50 dark:bg-primary-500/10 dark:text-primary-400"
						>
							<Sparkles size={12} /> Premium Analytics
						</motion.div>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="font-heading text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl"
						>
							Course Intelligence
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="mt-3 max-w-xl text-sm font-medium text-slate-600 dark:text-slate-400"
						>
							Deep dive into enrollment metrics, revenue performance, and catalog health with precision analytics.
						</motion.p>
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3 }}
						className="z-10 flex flex-col items-end gap-3"
					>
						<div className="inline-flex items-center gap-1 rounded-2xl border border-white/60 bg-white/60 p-1.5 shadow-sm backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/60">
							{VIEW_MODES.map((mode) => (
								<button
									key={mode.id}
									type="button"
									onClick={() => setViewMode(mode.id)}
									className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
										viewMode === mode.id
											? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
											: "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
									}`}
								>
									{mode.label}
								</button>
							))}
						</div>

						{viewMode === "day" && (
							<div className="relative">
								<button
									type="button"
									onClick={() => setDateOpen((v) => !v)}
									className="inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/60 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:border-slate-700/50 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
								>
									<CalendarDays size={14} className="text-primary-500" />
									<span className="max-w-[240px] truncate">{rangeLabel}</span>
									<ChevronDown size={14} className="ml-1 opacity-50" />
								</button>
								<AnimatePresence>
									{dateOpen && (
										<motion.div
											ref={popoverRef}
											initial={{ opacity: 0, y: 10, scale: 0.98 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: 10, scale: 0.98 }}
											transition={{ duration: 0.2, ease: "easeOut" }}
											className="absolute right-0 top-[calc(100%+12px)] z-30 w-[340px] overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-1 shadow-2xl backdrop-blur-2xl dark:border-slate-700/60 dark:bg-slate-900/80"
										>
											<div className="flex items-center justify-between border-b border-slate-200/50 px-5 py-4 dark:border-slate-800/50">
												<div>
													<p className="text-sm font-bold text-slate-900 dark:text-white">Select Range</p>
													<p className="text-[10px] font-medium text-slate-500">Pick start and end dates</p>
												</div>
												<button
													type="button"
													onClick={() => setDateOpen(false)}
													className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
												>
													<X size={14} />
												</button>
											</div>
											<div className="p-4">
												<div className="mb-4 flex flex-wrap gap-2">
													{presets.map((p) => (
														<button
															key={p.id}
															type="button"
															onClick={() => {
																const next = p.get();
																setRange(next);
																setCurrentMonth(next.from);
																setDateOpen(false);
															}}
															className="rounded-xl bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
														>
															{p.label}
														</button>
													))}
												</div>
												<div className="rounded-2xl border border-slate-200/50 bg-white/50 p-3 dark:border-slate-800/50 dark:bg-slate-950/30">
													<DayPicker
														mode="range"
														selected={range}
														onSelect={(next) => setRange(next)}
														month={currentMonth}
														onMonthChange={setCurrentMonth}
														showOutsideDays
														fixedWeeks
														weekStartsOn={1}
														captionLayout="dropdown-buttons"
														fromYear={2018}
														toYear={2035}
														className="rdp"
													/>
												</div>
												<div className="mt-4 flex items-center justify-between px-1">
													<span className="text-[11px] font-bold text-slate-500">
														{daysSelected ? `${daysSelected} days` : "None"}
													</span>
													<button
														type="button"
														onClick={() => setDateOpen(false)}
														className="rounded-xl bg-slate-900 px-4 py-2 text-[11px] font-bold text-white shadow-md transition-transform hover:scale-105 dark:bg-white dark:text-slate-900"
													>
														Apply Filter
													</button>
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						)}
					</motion.div>
				</div>

				<AnimatePresence>
					{notice && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="overflow-hidden"
						>
							<div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/80 px-5 py-4 text-sm font-bold text-emerald-700 backdrop-blur-sm dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-400">
								{notice}
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Stat Cards Grid */}
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
					{inventoryStats.map((stat, i) => (
						<PremiumStatCard key={stat.label} {...stat} delay={0.1 * i} />
					))}
				</div>

				{/* Charts and Lists */}
				<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/40 p-6 shadow-2xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/40 dark:shadow-none xl:col-span-2"
					>
						<div className="mb-8 flex items-start justify-between">
							<div>
								<h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Enrollment Trends</h2>
								<p className="mt-1 text-xs font-medium text-slate-500">
									{viewMode === "day"
										? `Total enrollments by date range (${daysSelected || 1} days)`
										: viewMode === "week"
											? "Total enrollments in the last 7 days"
											: "Total enrollments in the last 30 days"}
								</p>
							</div>
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 text-slate-400 shadow-sm dark:bg-slate-800/60">
								<BarChart3 size={20} />
							</div>
						</div>
						<div className="h-[280px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
									<defs>
										<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="#d45a1f" stopOpacity={1} />
											<stop offset="100%" stopColor="#e16c38" stopOpacity={0.4} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} opacity={0.5} />
									<XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} interval={0} dy={10} />
									<YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} width={60} />
									<Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(212, 90, 31, 0.05)" }} />
									<Bar dataKey="enrollments" radius={[8, 8, 0, 0]} isAnimationActive animationBegin={200} animationDuration={1000} animationEasing="ease-out">
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill="url(#barGradient)" />
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/40 p-6 shadow-2xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/40 dark:shadow-none"
					>
						<div className="mb-6">
							<h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Top Performers</h2>
							<p className="mt-1 text-xs font-medium text-slate-500">Highest converting courses.</p>
						</div>
						<div className="space-y-3">
							{TOP_COURSES.map((course, i) => (
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
									key={course.name}
									className="group flex items-center gap-4 rounded-2xl border border-white/60 bg-white/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-700/40 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 dark:hover:shadow-none"
								>
									<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 shadow-inner transition-colors duration-300 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white dark:from-primary-900/40 dark:to-primary-800/20 dark:text-primary-400">
										<BookOpen className="h-5 w-5" />
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate font-heading text-sm font-bold text-slate-800 dark:text-slate-100">{course.name}</p>
										<p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{course.instructor}</p>
									</div>
									<div className="text-right">
										<p className="font-heading text-sm font-bold text-slate-900 dark:text-slate-50">{course.enrollments.toLocaleString()}</p>
										<p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] font-bold text-emerald-500">
											{course.completionRate}% <TrendingUp size={10} />
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>

				{/* Filter & Table Area */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="space-y-6"
				>
					<AdminFilterBar
						searchValue={courseSearch}
						onSearchChange={setCourseSearch}
						searchPlaceholder="Search courses..."
						filters={
							<>
								<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="field-input w-auto bg-white/60 backdrop-blur-md dark:bg-slate-900/60">
									<option value="all">All statuses</option>
									{Object.entries(STATUS_CFG).map(([value, cfg]) => (
										<option key={value} value={value}>
											{cfg.label}
										</option>
									))}
								</select>
								<select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="field-input w-auto bg-white/60 backdrop-blur-md dark:bg-slate-900/60">
									<option value="all">All categories</option>
									{categories.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</>
						}
					/>

					<div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-2xl shadow-slate-200/30 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/40 dark:shadow-none">
						<div className="border-b border-slate-200/50 px-6 py-5 dark:border-slate-800/50">
							<h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Course Inventory</h2>
							<p className="mt-0.5 text-xs font-medium text-slate-500">
								{`${filteredCourses.length} course${filteredCourses.length === 1 ? "" : "s"} match current filters`}
							</p>
						</div>
						<div className="bg-white/40 dark:bg-transparent">
							<AdminDataTable columns={courseColumns} rows={filteredCourses} getRowKey={(row) => row.id} minWidth="900px" />
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default AdminCourses;
