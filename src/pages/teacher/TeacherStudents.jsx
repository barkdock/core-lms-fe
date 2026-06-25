import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Users, GraduationCap, TrendingUp, Mail, MessageSquare, MoreVertical } from "lucide-react";

const STUDENTS = [
	{
		id: 1,
		name: "Emily Johnson",
		email: "emily.johnson@email.com",
		course: "React Advanced Patterns",
		progress: 72,
		status: "Active",
		lastActive: "2h ago",
		score: 4.8,
	},
	{
		id: 2,
		name: "Michael Chen",
		email: "michael.chen@email.com",
		course: "Node.js Pro",
		progress: 58,
		status: "Active",
		lastActive: "1d ago",
		score: 4.6,
	},
	{
		id: 3,
		name: "Sara Williams",
		email: "sara.w@email.com",
		course: "UI/UX Design",
		progress: 91,
		status: "Top",
		lastActive: "3h ago",
		score: 4.9,
	},
	{
		id: 4,
		name: "David Park",
		email: "david.park@email.com",
		course: "TypeScript Mastery",
		progress: 35,
		status: "At Risk",
		lastActive: "5d ago",
		score: 4.2,
	},
	{
		id: 5,
		name: "Lea Morgan",
		email: "lea.morgan@email.com",
		course: "Product Design",
		progress: 64,
		status: "Active",
		lastActive: "6h ago",
		score: 4.7,
	},
];

const STATS = [
	{
		label: "Total students",
		value: "1,284",
		icon: <Users size={18} />,
		trend: "+6%",
	},
	{
		label: "Active cohorts",
		value: "8",
		icon: <GraduationCap size={18} />,
		trend: "+1",
	},
	{
		label: "Avg completion",
		value: "69%",
		icon: <TrendingUp size={18} />,
		trend: "+4%",
	},
];

const getInitials = (name) =>
	name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

const getStatusClasses = (status) => {
	switch (status) {
		case "Top":
			return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
		case "At Risk":
			return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
		default:
			return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
	}
};

const TeacherStudents = () => {
	const [query, setQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");

	const filteredStudents = STUDENTS.filter((student) => {
		const matchesQuery =
			student.name.toLowerCase().includes(query.toLowerCase()) ||
			student.email.toLowerCase().includes(query.toLowerCase());
		const matchesStatus = statusFilter === "All" || student.status === statusFilter;
		return matchesQuery && matchesStatus;
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-6"
		>
			<div>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">Students</h1>
				<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
					Manage progress, engagement, and performance
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
						<p className="text-xs text-emerald-500 mt-2">{stat.trend} vs last month</p>
					</div>
				))}
			</div>

			<div className="card p-4 flex flex-col md:flex-row md:items-center gap-3">
				<div className="relative flex-1">
					<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						type="text"
						placeholder="Search students by name or email"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-primary-400 dark:focus:border-primary-500 outline-none"
					/>
				</div>
				<div className="relative">
					<Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
					<select
						value={statusFilter}
						onChange={(event) => setStatusFilter(event.target.value)}
						className="pl-9 pr-8 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-primary-400 dark:focus:border-primary-500 outline-none font-semibold"
					>
						<option value="All">All Status</option>
						<option value="Active">Active</option>
						<option value="Top">Top</option>
						<option value="At Risk">At Risk</option>
					</select>
				</div>
			</div>

			<div className="card overflow-hidden">
				<div className="divide-y divide-slate-100 dark:divide-slate-800">
					{filteredStudents.map((student) => (
						<div key={student.id} className="p-4 flex flex-col lg:flex-row lg:items-center gap-4">
							<div className="flex items-center gap-3 flex-1 min-w-0">
								<div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 text-white flex items-center justify-center text-sm font-bold">
									{getInitials(student.name)}
								</div>
								<div className="min-w-0">
									<p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
										{student.name}
									</p>
									<p className="text-xs text-slate-400 truncate">{student.email}</p>
									<p className="text-xs text-slate-500 mt-1">{student.course}</p>
								</div>
							</div>

							<div className="flex-1">
								<p className="text-xs text-slate-400">Progress</p>
								<div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
									<div
										className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-emerald-400"
										style={{ width: `${student.progress}%` }}
									/>
								</div>
								<div className="mt-1 flex items-center justify-between text-xs text-slate-400">
									<span>{student.progress}%</span>
									<span>Score {student.score}</span>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<span
									className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${getStatusClasses(
										student.status,
									)}`}
								>
									{student.status}
								</span>
								<span className="text-xs text-slate-400">{student.lastActive}</span>
							</div>

							<div className="flex items-center gap-2">
								<button className="h-9 w-9 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary-600 hover:border-primary-200 transition">
									<Mail size={16} className="mx-auto" />
								</button>
								<button className="h-9 w-9 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary-600 hover:border-primary-200 transition">
									<MessageSquare size={16} className="mx-auto" />
								</button>
								<button className="h-9 w-9 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-slate-700 transition">
									<MoreVertical size={16} className="mx-auto" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default TeacherStudents;
