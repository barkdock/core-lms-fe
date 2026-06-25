import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
	Plus,
	Search,
	Filter,
	MoreVertical,
	Users,
	Star,
	BookOpen,
	Clock,
	LayoutGrid,
	List as ListIcon,
	ChevronRight,
	Edit,
	Trash2,
	Eye,
	TrendingUp,
	DollarSign,
	Award,
	Sparkles,
	BarChart3,
} from "lucide-react";

// Mock data for courses
const MOCK_TEACHER_COURSES = [
	{
		id: 1,
		title: "React Advanced Patterns",
		category: "Development",
		students: 124,
		rating: 4.8,
		price: 49.99,
		status: "Published",
		updatedAt: "2 days ago",
		image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
		progress: 100,
	},
	{
		id: 2,
		title: "Node.js & REST APIs",
		category: "Backend",
		students: 89,
		rating: 4.9,
		price: 59.99,
		status: "Published",
		updatedAt: "5 days ago",
		image: "https://images.unsplash.com/photo-1618477247222-acbac0e159b3?auto=format&fit=crop&q=80&w=400",
		progress: 100,
	},
	{
		id: 3,
		title: "UI/UX Fundamentals",
		category: "Design",
		students: 210,
		rating: 4.7,
		price: 39.99,
		status: "Draft",
		updatedAt: "1 week ago",
		image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=400",
		progress: 45,
	},
	{
		id: 4,
		title: "TypeScript Mastery",
		category: "Development",
		students: 56,
		rating: 4.6,
		price: 45.0,
		status: "Under Review",
		updatedAt: "3 days ago",
		image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400",
		progress: 80,
	},
];

const TeacherCourses = () => {
	const navigate = useNavigate();
	const [viewMode, setViewMode] = useState("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");

	const filteredCourses = MOCK_TEACHER_COURSES.filter((course) => {
		const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter === "All" || course.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const stats = [
		{
			icon: BookOpen,
			label: "Total Courses",
			value: MOCK_TEACHER_COURSES.length,
			color: "from-violet-500 to-purple-600",
			bg: "bg-violet-500/10",
			iconColor: "text-violet-600",
		},
		{
			icon: Users,
			label: "Total Students",
			value: MOCK_TEACHER_COURSES.reduce((sum, c) => sum + c.students, 0),
			color: "from-blue-500 to-cyan-600",
			bg: "bg-blue-500/10",
			iconColor: "text-blue-600",
		},
		{
			icon: DollarSign,
			label: "Total Revenue",
			value: `$${MOCK_TEACHER_COURSES.reduce((sum, c) => sum + c.price * c.students, 0).toLocaleString()}`,
			color: "from-emerald-500 to-teal-600",
			bg: "bg-emerald-500/10",
			iconColor: "text-emerald-600",
		},
		{
			icon: Star,
			label: "Avg Rating",
			value: (
				MOCK_TEACHER_COURSES.reduce((sum, c) => sum + c.rating, 0) / MOCK_TEACHER_COURSES.length
			).toFixed(1),
			color: "from-amber-500 to-orange-600",
			bg: "bg-amber-500/10",
			iconColor: "text-amber-600",
		},
	];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="space-y-6"
		>
			{/* Header section with gradient */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-violet-500 to-purple-600 p-8 shadow-2xl shadow-primary-500/20">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
				<div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Sparkles className="text-amber-300" size={20} />
							<span className="text-xs font-bold text-white/80 uppercase tracking-widest">
								Teaching Dashboard
							</span>
						</div>
						<h1 className="text-3xl font-extrabold text-white mb-2">Course Management</h1>
						<p className="text-sm text-white/80">Create, manage and track your published content</p>
					</div>
					<button
						onClick={() => navigate("/teacher/create-course")}
						className="self-start sm:self-auto bg-white text-primary-600 hover:bg-white/90 font-bold py-3 px-6 rounded-xl shadow-lg shadow-black/10 hover:shadow-xl transition-all flex items-center gap-2 group"
					>
						<Plus size={20} />
						<span>Create Course</span>
						<ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat, idx) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: idx * 0.1, duration: 0.4 }}
						className="relative group"
					>
						<div
							className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl"
							style={{ backgroundImage: `linear-gradient(to bottom right, ${stat.color})` }}
						/>
						<div className="relative card p-5 hover:shadow-xl transition-all duration-300">
							<div
								className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
							>
								<stat.icon className={`${stat.iconColor} w-6 h-6`} />
							</div>
							<p className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
								{stat.value}
							</p>
							<p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
								{stat.label}
							</p>
						</div>
					</motion.div>
				))}
			</div>

			{/* Filters & Controls with glassmorphism */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="flex flex-col md:flex-row md:items-center gap-4 card p-5"
			>
				<div className="relative flex-1">
					<Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						type="text"
						placeholder="Search your courses..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-12 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary-400 dark:focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none font-medium"
					/>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative">
						<Filter
							size={16}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
						/>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="pl-10 pr-10 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-all font-bold appearance-none cursor-pointer"
						>
							<option value="All">All Status</option>
							<option value="Published">✓ Published</option>
							<option value="Draft">✎ Draft</option>
							<option value="Under Review">⏳ Review</option>
						</select>
					</div>

					<div className="h-10 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

					<div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl gap-1">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-2 rounded-lg transition-all duration-200 ${
								viewMode === "grid"
									? "bg-white dark:bg-slate-700 shadow-md text-primary-600 scale-105"
									: "text-slate-400 hover:text-slate-600"
							}`}
						>
							<LayoutGrid size={18} />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-2 rounded-lg transition-all duration-200 ${
								viewMode === "list"
									? "bg-white dark:bg-slate-700 shadow-md text-primary-600 scale-105"
									: "text-slate-400 hover:text-slate-600"
							}`}
						>
							<ListIcon size={18} />
						</button>
					</div>
				</div>
			</motion.div>

			{/* Course List/Grid */}
			<div
				className={
					viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"
				}
			>
				<AnimatePresence mode="popLayout">
					{filteredCourses.map((course, index) =>
						viewMode === "grid" ? (
							<motion.div
								layout
								key={course.id}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.2, delay: index * 0.05 }}
								className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all"
							>
								<div className="relative h-44 overflow-hidden">
									<img
										src={course.image}
										alt={course.title}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									<div className="absolute top-3 left-3 right-3 flex justify-between items-start">
										<span
											className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-xl shadow-xl border border-white/20
                      ${
						course.status === "Published"
							? "bg-emerald-500/90 text-white"
							: course.status === "Draft"
							? "bg-slate-600/90 text-white"
							: "bg-amber-500/90 text-white"
					}
                    `}
										>
											{course.status}
										</span>
										{course.status === "Published" && (
											<div className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm flex items-center gap-1">
												<TrendingUp size={12} className="text-emerald-600" />
												<span className="text-[10px] font-bold text-emerald-600">
													Active
												</span>
											</div>
										)}
									</div>
									{course.progress < 100 && (
										<div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 backdrop-blur-sm">
											<div
												className="h-full bg-gradient-to-r from-primary-500 to-violet-500 transition-all duration-500"
												style={{ width: `${course.progress}%` }}
											/>
										</div>
									)}
								</div>

								<div className="p-5">
									<div className="flex justify-between items-start mb-3">
										<div className="flex items-center gap-2">
											<div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-400 to-violet-500 flex items-center justify-center">
												<BookOpen size={12} className="text-white" />
											</div>
											<span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest">
												{course.category}
											</span>
										</div>
										<button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
											<MoreVertical size={18} />
										</button>
									</div>
									<h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1 line-clamp-2 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
										{course.title}
									</h3>
									<p className="text-xs text-slate-400 mb-4">Updated {course.updatedAt}</p>

									<div className="grid grid-cols-2 gap-3 mb-5">
										<div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-3 border border-blue-100 dark:border-blue-900/30">
											<div className="absolute top-0 right-0 w-16 h-16 bg-blue-400/10 rounded-full -mr-8 -mt-8" />
											<div className="relative">
												<Users
													size={16}
													className="text-blue-600 dark:text-blue-400 mb-1"
												/>
												<p className="text-xl font-black text-blue-700 dark:text-blue-300">
													{course.students}
												</p>
												<p className="text-[10px] text-blue-600/70 dark:text-blue-400/70 font-bold uppercase tracking-wide">
													Students
												</p>
											</div>
										</div>
										<div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-3 border border-amber-100 dark:border-amber-900/30">
											<div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/10 rounded-full -mr-8 -mt-8" />
											<div className="relative">
												<Star
													size={16}
													className="text-amber-600 dark:text-amber-400 mb-1"
												/>
												<p className="text-xl font-black text-amber-700 dark:text-amber-300">
													{course.rating}
												</p>
												<p className="text-[10px] text-amber-600/70 dark:text-amber-400/70 font-bold uppercase tracking-wide">
													Rating
												</p>
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
										<div>
											<p className="text-xs text-slate-400 font-medium mb-0.5">
												Course Price
											</p>
											<p className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
												${course.price}
											</p>
										</div>
										<div className="flex gap-2">
											<button className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:scale-110 transition-all">
												<Edit size={16} />
											</button>
											<button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:scale-110 transition-all">
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						) : (
							<motion.div
								layout
								key={course.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.2, delay: index * 0.05 }}
								className="group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-all"
							>
								<div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
									<img
										src={course.image}
										alt={course.title}
										className="w-full h-full object-cover"
									/>
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">
											{course.category}
										</span>
										<span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
										<span
											className={`text-[10px] font-bold uppercase
                      ${
						course.status === "Published"
							? "text-emerald-500"
							: course.status === "Draft"
							? "text-slate-500"
							: "text-amber-500"
					}
                    `}
										>
											{course.status}
										</span>
									</div>
									<h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
										{course.title}
									</h3>
									<p className="text-xs text-slate-400 mt-1">
										Last updated {course.updatedAt}
									</p>
								</div>

								<div className="hidden lg:flex flex-col items-center px-6">
									<p className="text-xs font-bold text-slate-700 dark:text-slate-200">
										{course.students}
									</p>
									<p className="text-[10px] text-slate-400">Students</p>
								</div>

								<div className="hidden lg:flex flex-col items-center px-6">
									<p className="text-xs font-bold text-slate-700 dark:text-slate-200">
										${course.price}
									</p>
									<p className="text-[10px] text-slate-400">Price</p>
								</div>

								<div className="flex items-center gap-2">
									<button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-primary-600 transition-colors">
										<Edit size={18} />
									</button>
									<button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
										<Eye size={18} />
									</button>
								</div>
							</motion.div>
						),
					)}
				</AnimatePresence>
			</div>

			{/* Empty State */}
			{filteredCourses.length === 0 && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className="py-24 flex flex-col items-center justify-center text-center card border-2 border-dashed border-slate-200 dark:border-slate-800"
				>
					<div className="relative mb-6">
						<div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-violet-400/20 rounded-full blur-2xl" />
						<div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-xl">
							<BookOpen size={48} className="text-slate-400 dark:text-slate-600" />
						</div>
					</div>
					<h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
						No courses found
					</h3>
					<p className="text-slate-500 dark:text-slate-400 max-w-md">
						{searchQuery || statusFilter !== "All"
							? "Try adjusting your search or filters to find what you're looking for."
							: "Start creating amazing content for your students today!"}
					</p>
					<div className="flex gap-3 mt-8">
						{(searchQuery || statusFilter !== "All") && (
							<button
								onClick={() => {
									setSearchQuery("");
									setStatusFilter("All");
								}}
								className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
							>
								Clear Filters
							</button>
						)}
						<button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-violet-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105 transition-all flex items-center gap-2">
							<Plus size={18} />
							Create Your First Course
						</button>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default TeacherCourses;
