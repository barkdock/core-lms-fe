import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
	Users,
	Star,
	BookOpen,
	TrendingUp,
	Calendar,
	CheckCircle2,
	MessageSquare,
	ClipboardList,
	ArrowUpRight,
	PlayCircle,
	BarChart3,
} from "lucide-react";
import { useStats } from "@/hooks/useStats";
import StatCard from "@/components/ui/StatCard";
import SkeletonCard, { SkeletonChart } from "@/components/ui/SkeletonCard";

const ICON_MAP = {
	"Total Students": <Users size={18} />,
	"Average Rating": <Star size={18} />,
	"Total Courses": <BookOpen size={18} />,
	"Monthly Revenue": <TrendingUp size={18} />,
};

const BAR_COLORS = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"];

const CustomTooltip = ({ active, payload, label }) => {
	if (!active || !payload?.length) return null;
	return (
		<div className="card px-4 py-3 shadow-lg">
			<p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
			<p className="text-base font-bold text-primary-600">${payload[0].value.toLocaleString()}</p>
		</div>
	);
};

const TeacherDashboard = () => {
	const { stats, isLoading } = useStats();

	const quickActions = [
		{ label: "Create new course", icon: <PlayCircle size={16} />, to: "/teacher/create-course" },
		{ label: "Review assignments", icon: <ClipboardList size={16} />, to: "/teacher/messages" },
		{ label: "Message students", icon: <MessageSquare size={16} />, to: "/teacher/messages" },
		{ label: "View analytics", icon: <BarChart3 size={16} />, to: "/teacher/dashboard" },
	];

	const upcomingSessions = [
		{ title: "Live Q&A: React Hooks", time: "Today · 18:30", cohort: "Cohort A" },
		{ title: "Code Review: Node.js Pro", time: "Tomorrow · 20:00", cohort: "Cohort B" },
		{ title: "Portfolio Clinic", time: "Fri · 19:00", cohort: "Cohort C" },
	];

	const pendingTasks = [
		{ title: "Approve 3 student submissions", meta: "Due today" },
		{ title: "Update course outline for UI/UX", meta: "Due tomorrow" },
		{ title: "Reply to 5 student messages", meta: "New" },
	];

	const topCourses = [
		{ name: "React Basics", students: 420, rating: 4.8, progress: 72 },
		{ name: "Node.js Pro", students: 310, rating: 4.6, progress: 58 },
		{ name: "UI/UX Design", students: 280, rating: 4.9, progress: 81 },
	];

	const activityFeed = [
		{ text: "New enrollment in React Basics", time: "10m ago" },
		{ text: "Course review posted: Node.js Pro", time: "1h ago" },
		{ text: "Payout processed successfully", time: "3h ago" },
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">Instructor Dashboard</h1>
				<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
					Track your courses, students, and earnings
				</p>
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

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
				{/* Revenue Bar Chart */}
				<div className="xl:col-span-2">
					{isLoading ? (
						<SkeletonChart />
					) : (
						<div className="card p-6">
							<div className="mb-6">
								<h2 className="text-base font-bold text-slate-900 dark:text-white">
									Revenue per Course
								</h2>
								<p className="text-xs text-slate-400 mt-0.5">This month's earnings breakdown</p>
							</div>
							<ResponsiveContainer width="100%" height={240}>
								<BarChart
									data={stats?.chartData || []}
									margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
									barCategoryGap={24}
								>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="#e2e8f0"
										className="dark:stroke-slate-700"
									/>
									<XAxis
										dataKey="course"
										tick={{ fontSize: 10, fill: "#94a3b8" }}
										axisLine={false}
										tickLine={false}
									/>
									<YAxis
										tick={{ fontSize: 11, fill: "#94a3b8" }}
										axisLine={false}
										tickLine={false}
										width={45}
										tickFormatter={(v) => `$${v}`}
									/>
									<Tooltip content={<CustomTooltip />} />
									<Bar
										dataKey="revenue"
										radius={[6, 6, 0, 0]}
										isAnimationActive={false}
										activeBar={{
											radius: [8, 8, 0, 0],
											stroke: "#0f172a",
											strokeWidth: 1,
											fillOpacity: 0.95,
										}}
									>
										{stats?.chartData?.map((_, index) => (
											<Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					)}
				</div>

				{/* Recent reviews */}
				<div className="card p-6">
					<h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Recent Reviews</h2>
					<div className="space-y-4">
						{[
							{
								name: "Alice Chen",
								rating: 5,
								comment: "Absolutely loved this course!",
								course: "React Basics",
							},
							{
								name: "Bob Kim",
								rating: 4,
								comment: "Very clear explanations.",
								course: "Node.js Pro",
							},
							{
								name: "Sara Li",
								rating: 5,
								comment: "Best instructor on the platform!",
								course: "UI/UX",
							},
						].map((r) => (
							<div
								key={r.name}
								className="pb-4 last:pb-0 border-b last:border-0 border-slate-100 dark:border-slate-800"
							>
								<div className="flex items-center gap-2 mb-1">
									<div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold">
										{r.name.slice(0, 2).toUpperCase()}
									</div>
									<div>
										<p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
											{r.name}
										</p>
										<p className="text-[10px] text-slate-400">{r.course}</p>
									</div>
									<div className="ml-auto flex">
										{Array(5)
											.fill(0)
											.map((_, i) => (
												<Star
													key={i}
													size={10}
													className={
														i < r.rating
															? "text-amber-400 fill-amber-400"
															: "text-slate-200"
													}
												/>
											))}
									</div>
								</div>
								<p className="text-xs text-slate-500 dark:text-slate-400 italic">
									"{r.comment}"
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
				<div className="card p-6">
					<h2 className="text-base font-bold text-slate-900 dark:text-white">Teaching Outcomes</h2>
					<p className="text-xs text-slate-400 mt-1">Objective learning signals</p>
					<div className="mt-4 space-y-3">
						{[
							{ label: "Median Completion", value: "71%" },
							{ label: "Avg. Assignment Score", value: "84 / 100" },
							{ label: "Drop-off After Week 2", value: "6.2%" },
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

				<div className="card p-6">
					<h2 className="text-base font-bold text-slate-900 dark:text-white">Student Engagement</h2>
					<p className="text-xs text-slate-400 mt-1">Last 14 days</p>
					<div className="mt-4 space-y-3">
						{[
							{ label: "Response Time", value: "2h 18m" },
							{ label: "Discussion Replies", value: "43" },
							{ label: "Live Session Attendance", value: "78%" },
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

				<div className="card p-6">
					<h2 className="text-base font-bold text-slate-900 dark:text-white">Course Health</h2>
					<p className="text-xs text-slate-400 mt-1">Compliance and quality</p>
					<div className="mt-4 space-y-3">
						{[
							{ label: "Outdated Lessons", value: "1" },
							{ label: "Pending Revisions", value: "3" },
							{ label: "Assessment Coverage", value: "92%" },
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

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
				<div className="card p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-base font-bold text-slate-900 dark:text-white">Quick Actions</h2>
						<ArrowUpRight size={14} className="text-slate-400" />
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						{quickActions.map((action) => (
							<Link
								key={action.label}
								to={action.to}
								className="flex items-center gap-2 rounded-xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition hover:border-primary-200 hover:text-primary-600"
							>
								<span className="text-primary-500">{action.icon}</span>
								{action.label}
							</Link>
						))}
					</div>
				</div>

				<div className="card p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-base font-bold text-slate-900 dark:text-white">Upcoming Sessions</h2>
						<Calendar size={14} className="text-slate-400" />
					</div>
					<div className="space-y-3">
						{upcomingSessions.map((session) => (
							<div
								key={session.title}
								className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 px-3 py-3"
							>
								<div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
								<div>
									<p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
										{session.title}
									</p>
									<p className="text-[11px] text-slate-400">{session.time}</p>
									<p className="text-[11px] text-slate-500">{session.cohort}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="card p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-base font-bold text-slate-900 dark:text-white">Pending Tasks</h2>
						<CheckCircle2 size={14} className="text-slate-400" />
					</div>
					<div className="space-y-3">
						{pendingTasks.map((task) => (
							<div
								key={task.title}
								className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 px-3 py-3"
							>
								<div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
								<div>
									<p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
										{task.title}
									</p>
									<p className="text-[11px] text-slate-400">{task.meta}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
				<div className="card p-6 xl:col-span-2">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-base font-bold text-slate-900 dark:text-white">Top Courses</h2>
						<span className="text-[11px] text-slate-400">Last 30 days</span>
					</div>
					<div className="space-y-4">
						{topCourses.map((course) => (
							<div
								key={course.name}
								className="rounded-xl border border-slate-100 dark:border-slate-800 p-4"
							>
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
											{course.name}
										</p>
										<p className="text-[11px] text-slate-400">
											{course.students} students · {course.rating} rating
										</p>
									</div>
									<div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
										{course.progress}% complete
									</div>
								</div>
								<div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
									<div
										className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-amber-400"
										style={{ width: `${course.progress}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="card p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-base font-bold text-slate-900 dark:text-white">Activity Feed</h2>
						<Users size={14} className="text-slate-400" />
					</div>
					<div className="space-y-3">
						{activityFeed.map((item) => (
							<div key={item.text} className="flex items-start gap-3">
								<div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
								<div>
									<p className="text-xs text-slate-700 dark:text-slate-200">{item.text}</p>
									<p className="text-[11px] text-slate-400">{item.time}</p>
								</div>
							</div>
						))}
					</div>
					<div className="mt-6 rounded-xl border border-slate-100 dark:border-slate-800 p-4">
						<p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Revenue goal</p>
						<p className="text-[11px] text-slate-400">$6,500 / $10,000</p>
						<div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
							<div
								className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-primary-500"
								style={{ width: "65%" }}
							/>
						</div>
						<button className="mt-3 w-full rounded-xl bg-slate-900 text-white py-2 text-xs font-semibold hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600">
							View earnings
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherDashboard;
