import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Search, Filter, MessageSquare, ThumbsUp, Flag } from "lucide-react";

const REVIEWS = [
	{
		id: 1,
		name: "Alice Chen",
		course: "React Basics",
		rating: 5,
		comment: "Absolutely loved this course. Clear structure and great pacing.",
		date: "Today",
	},
	{
		id: 2,
		name: "Bob Kim",
		course: "Node.js Pro",
		rating: 4,
		comment: "Very clear explanations. I would love more project examples.",
		date: "Yesterday",
	},
	{
		id: 3,
		name: "Sara Li",
		course: "UI/UX Design",
		rating: 5,
		comment: "Best instructor on the platform. Great feedback on assignments.",
		date: "2 days ago",
	},
];

const DISTRIBUTION = [
	{ label: "5 stars", value: 68 },
	{ label: "4 stars", value: 21 },
	{ label: "3 stars", value: 8 },
	{ label: "2 stars", value: 2 },
	{ label: "1 star", value: 1 },
];

const TeacherReviews = () => {
	const [query, setQuery] = useState("");
	const [ratingFilter, setRatingFilter] = useState("All");

	const filteredReviews = REVIEWS.filter((review) => {
		const matchesQuery =
			review.name.toLowerCase().includes(query.toLowerCase()) ||
			review.course.toLowerCase().includes(query.toLowerCase());
		const matchesRating = ratingFilter === "All" || String(review.rating) === ratingFilter;
		return matchesQuery && matchesRating;
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-6"
		>
			<div>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reviews</h1>
				<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
					Monitor student feedback and respond quickly
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="card p-5 lg:col-span-2">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs text-slate-400 uppercase tracking-wider">Overall rating</p>
							<p className="text-3xl font-bold text-slate-900 dark:text-white">4.8</p>
							<div className="flex items-center gap-1 text-amber-400">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star key={i} size={14} className={i < 5 ? "fill-amber-400" : ""} />
								))}
							</div>
							<p className="text-xs text-slate-400 mt-1">128 reviews</p>
						</div>
						<div className="text-right">
							<p className="text-xs text-slate-400">Response rate</p>
							<p className="text-xl font-bold text-emerald-500">92%</p>
						</div>
					</div>
					<div className="mt-4 space-y-2">
						{DISTRIBUTION.map((row) => (
							<div key={row.label} className="flex items-center gap-3">
								<span className="text-xs text-slate-400 w-14">{row.label}</span>
								<div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
									<div
										className="h-2 rounded-full bg-amber-400"
										style={{ width: `${row.value}%` }}
									/>
								</div>
								<span className="text-xs text-slate-400 w-8 text-right">{row.value}%</span>
							</div>
						))}
					</div>
				</div>

				<div className="card p-5">
					<p className="text-xs text-slate-400 uppercase tracking-wider">Highlights</p>
					<div className="mt-3 space-y-3">
						<div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3">
							<p className="text-xs text-slate-400">Most loved course</p>
							<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
								React Basics
							</p>
						</div>
						<div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3">
							<p className="text-xs text-slate-400">Top feedback</p>
							<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
								Clear explanations
							</p>
						</div>
						<div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3">
							<p className="text-xs text-slate-400">Next focus</p>
							<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
								More project demos
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="card p-4 flex flex-col md:flex-row md:items-center gap-3">
				<div className="relative flex-1">
					<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						type="text"
						placeholder="Search by student or course"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-primary-400 dark:focus:border-primary-500 outline-none"
					/>
				</div>
				<div className="relative">
					<Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
					<select
						value={ratingFilter}
						onChange={(event) => setRatingFilter(event.target.value)}
						className="pl-9 pr-8 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-primary-400 dark:focus:border-primary-500 outline-none font-semibold"
					>
						<option value="All">All ratings</option>
						<option value="5">5 stars</option>
						<option value="4">4 stars</option>
						<option value="3">3 stars</option>
					</select>
				</div>
			</div>

			<div className="card overflow-hidden">
				<div className="divide-y divide-slate-100 dark:divide-slate-800">
					{filteredReviews.map((review) => (
						<div key={review.id} className="p-5">
							<div className="flex items-start justify-between">
								<div>
									<p className="text-sm font-semibold text-slate-900 dark:text-white">
										{review.name}
									</p>
									<p className="text-xs text-slate-400">{review.course}</p>
								</div>
								<span className="text-xs text-slate-400">{review.date}</span>
							</div>
							<div className="flex items-center gap-1 text-amber-400 mt-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										size={12}
										className={i < review.rating ? "fill-amber-400" : "text-slate-200"}
									/>
								))}
							</div>
							<p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{review.comment}</p>
							<div className="mt-4 flex flex-wrap items-center gap-2">
								<button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 dark:border-slate-800 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-200 hover:text-primary-600">
									<MessageSquare size={14} /> Reply
								</button>
								<button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 dark:border-slate-800 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-200">
									<ThumbsUp size={14} /> Mark helpful
								</button>
								<button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 dark:border-slate-800 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-200">
									<Flag size={14} /> Report
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default TeacherReviews;
