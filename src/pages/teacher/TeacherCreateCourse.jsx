import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	Save,
	Eye,
	Upload,
	X,
	Plus,
	Trash2,
	GripVertical,
	BookOpen,
	DollarSign,
	Tag,
	Users,
	Clock,
	FileText,
	Image as ImageIcon,
	Video,
	CheckCircle,
	AlertCircle,
	Sparkles,
	ChevronRight,
	Info,
} from "lucide-react";

const CATEGORIES = [
	"Development",
	"Design",
	"Business",
	"Marketing",
	"IT & Software",
	"Photography",
	"Music",
	"Health & Fitness",
];
const LEVELS = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const LANGUAGES = ["English", "Vietnamese", "Spanish", "French", "German", "Chinese", "Japanese", "Korean"];

const TeacherCreateCourse = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1);
	const [courseData, setCourseData] = useState({
		title: "",
		subtitle: "",
		description: "",
		category: "",
		subcategory: "",
		level: "",
		language: "English",
		price: "",
		thumbnail: null,
		promoVideo: null,
		requirements: [""],
		objectives: [""],
		targetAudience: [""],
		curriculum: [
			{
				id: 1,
				title: "",
				lectures: [{ id: 1, title: "", duration: "", type: "video" }],
			},
		],
	});

	const updateField = (field, value) => {
		setCourseData((prev) => ({ ...prev, [field]: value }));
	};

	const addArrayItem = (field) => {
		setCourseData((prev) => ({
			...prev,
			[field]: [...prev[field], ""],
		}));
	};

	const updateArrayItem = (field, index, value) => {
		setCourseData((prev) => ({
			...prev,
			[field]: prev[field].map((item, i) => (i === index ? value : item)),
		}));
	};

	const removeArrayItem = (field, index) => {
		setCourseData((prev) => ({
			...prev,
			[field]: prev[field].filter((_, i) => i !== index),
		}));
	};

	const addSection = () => {
		setCourseData((prev) => ({
			...prev,
			curriculum: [
				...prev.curriculum,
				{
					id: Date.now(),
					title: "",
					lectures: [{ id: Date.now(), title: "", duration: "", type: "video" }],
				},
			],
		}));
	};

	const addLecture = (sectionIndex) => {
		setCourseData((prev) => ({
			...prev,
			curriculum: prev.curriculum.map((section, idx) =>
				idx === sectionIndex
					? {
							...section,
							lectures: [
								...section.lectures,
								{ id: Date.now(), title: "", duration: "", type: "video" },
							],
					  }
					: section,
			),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Course data:", courseData);
		// Handle course creation
	};

	const steps = [
		{ num: 1, title: "Basic Info", icon: BookOpen },
		{ num: 2, title: "Curriculum", icon: FileText },
		{ num: 3, title: "Pricing & Media", icon: DollarSign },
		{ num: 4, title: "Publish", icon: CheckCircle },
	];

	return (
		<div className="max-w-6xl mx-auto">
			{/* Header */}
			<div className="mb-6">
				<button
					onClick={() => navigate("/teacher/courses")}
					className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
				>
					<ArrowLeft size={20} />
					<span className="font-medium">Back to Courses</span>
				</button>
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
							Create New Course
						</h1>
						<p className="text-slate-500 dark:text-slate-400">
							Share your knowledge with students worldwide
						</p>
					</div>
					<button className="btn-secondary flex items-center gap-2">
						<Eye size={18} />
						Preview
					</button>
				</div>
			</div>

			{/* Progress Steps */}
			<div className="card p-6 mb-6 relative overflow-hidden">
				<motion.div
					aria-hidden="true"
					className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br from-primary-200/40 to-violet-200/40 blur-2xl dark:from-primary-700/20 dark:to-violet-700/20"
					animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
					transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
				/>
				<div className="flex items-center justify-between relative">
					{/* Progress Bar */}
					<div className="absolute top-5 left-0 right-0 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
						<motion.div
							className="h-full rounded-full bg-gradient-to-r from-primary-500 via-violet-500 to-indigo-500"
							initial={{ width: "0%" }}
							animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
							transition={{ duration: 0.45, ease: "easeOut" }}
						/>
						<motion.div
							aria-hidden="true"
							className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
							animate={{ x: ["-30%", "120%"] }}
							transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
						/>
					</div>

					{steps.map((step) => {
						const isCompleted = currentStep > step.num;
						const isActive = currentStep === step.num;
						const StepIcon = isCompleted ? CheckCircle : step.icon;

						return (
							<motion.div
								key={step.num}
								className="flex flex-col items-center z-10 relative"
								animate={{ y: isActive ? -2 : 0 }}
								transition={{ duration: 0.2 }}
							>
								<button
									onClick={() => setCurrentStep(step.num)}
									className={`relative mb-2 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
										currentStep >= step.num
											? "bg-gradient-to-br from-primary-500 to-violet-500 text-white shadow-lg shadow-primary-500/25"
											: "border-2 border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900"
									} ${
										isActive ? "ring-4 ring-primary-200/70 dark:ring-primary-700/40" : ""
									}`}
								>
									{isActive && (
										<motion.span
											className="absolute inset-0 rounded-full border-2 border-white/60"
											animate={{ scale: [1, 1.28], opacity: [0.75, 0] }}
											transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
										/>
									)}
									<StepIcon size={18} />
								</button>

								<div className="flex items-center gap-1">
									<span
										className={`text-xs font-bold transition-colors ${
											currentStep >= step.num
												? "text-slate-900 dark:text-white"
												: "text-slate-400"
										}`}
									>
										{step.title}
									</span>
									{isActive && <Sparkles size={13} className="text-amber-400" />}
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>

			{/* Form Content */}
			<form onSubmit={handleSubmit}>
				{/* Step 1: Basic Info */}
				{currentStep === 1 && (
					<div className="space-y-6">
						<div className="card p-6">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
									<BookOpen className="text-primary-600 dark:text-primary-400" size={20} />
								</div>
								<div>
									<h2 className="text-xl font-bold text-slate-900 dark:text-white">
										Course Information
									</h2>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										Tell us about your course
									</p>
								</div>
							</div>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
										Course Title *
									</label>
									<input
										type="text"
										value={courseData.title}
										onChange={(e) => updateField("title", e.target.value)}
										placeholder="e.g., Complete Web Development Bootcamp 2026"
										className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400"
										required
									/>
									<p className="text-xs text-slate-400 mt-1.5">Maximum 60 characters</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
										Course Subtitle
									</label>
									<input
										type="text"
										value={courseData.subtitle}
										onChange={(e) => updateField("subtitle", e.target.value)}
										placeholder="A short description of what students will learn"
										className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
										Description *
									</label>
									<textarea
										value={courseData.description}
										onChange={(e) => updateField("description", e.target.value)}
										placeholder="Provide a detailed description of your course..."
										rows={6}
										className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
										required
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Category *
										</label>
										<select
											value={courseData.category}
											onChange={(e) => updateField("category", e.target.value)}
											className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
											required
										>
											<option value="">Select Category</option>
											{CATEGORIES.map((cat) => (
												<option key={cat} value={cat}>
													{cat}
												</option>
											))}
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Level *
										</label>
										<select
											value={courseData.level}
											onChange={(e) => updateField("level", e.target.value)}
											className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
											required
										>
											<option value="">Select Level</option>
											{LEVELS.map((level) => (
												<option key={level} value={level}>
													{level}
												</option>
											))}
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
											Language *
										</label>
										<select
											value={courseData.language}
											onChange={(e) => updateField("language", e.target.value)}
											className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
											required
										>
											{LANGUAGES.map((lang) => (
												<option key={lang} value={lang}>
													{lang}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
						</div>

						{/* Learning Objectives */}
						<div className="card p-6">
							<h3 className="font-bold text-slate-900 dark:text-white mb-4">
								What will students learn?
							</h3>
							<div className="space-y-3">
								{courseData.objectives.map((obj, index) => (
									<div key={index} className="flex gap-2">
										<input
											type="text"
											value={obj}
											onChange={(e) =>
												updateArrayItem("objectives", index, e.target.value)
											}
											placeholder="e.g., Build responsive websites with HTML, CSS, and JavaScript"
											className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400"
										/>
										{courseData.objectives.length > 1 && (
											<button
												type="button"
												onClick={() => removeArrayItem("objectives", index)}
												className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
											>
												<Trash2 size={18} />
											</button>
										)}
									</div>
								))}
								<button
									type="button"
									onClick={() => addArrayItem("objectives")}
									className="btn-secondary w-full"
								>
									<Plus size={18} />
									Add Learning Objective
								</button>
							</div>
						</div>

						{/* Requirements */}
						<div className="card p-6">
							<h3 className="font-bold text-slate-900 dark:text-white mb-4">Requirements</h3>
							<div className="space-y-3">
								{courseData.requirements.map((req, index) => (
									<div key={index} className="flex gap-2">
										<input
											type="text"
											value={req}
											onChange={(e) =>
												updateArrayItem("requirements", index, e.target.value)
											}
											placeholder="e.g., Basic computer skills"
											className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
										/>
										{courseData.requirements.length > 1 && (
											<button
												type="button"
												onClick={() => removeArrayItem("requirements", index)}
												className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
											>
												<Trash2 size={18} />
											</button>
										)}
									</div>
								))}
								<button
									type="button"
									onClick={() => addArrayItem("requirements")}
									className="btn-secondary w-full"
								>
									<Plus size={18} />
									Add Requirement
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Step 2: Curriculum */}
				{currentStep === 2 && (
					<div className="space-y-4">
						<div className="card p-6 mb-6">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
										<FileText
											className="text-violet-600 dark:text-violet-400"
											size={20}
										/>
									</div>
									<div>
										<h2 className="text-xl font-bold text-slate-900 dark:text-white">
											Course Curriculum
										</h2>
										<p className="text-sm text-slate-500 dark:text-slate-400">
											Structure your course content
										</p>
									</div>
								</div>
								<button type="button" onClick={addSection} className="btn-primary">
									<Plus size={18} />
									Add Section
								</button>
							</div>

							<div className="space-y-4">
								{courseData.curriculum.map((section, sectionIndex) => (
									<div
										key={section.id}
										className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
									>
										<div className="bg-slate-50 dark:bg-slate-800 p-4 flex items-center gap-3">
											<GripVertical size={18} className="text-slate-400 cursor-move" />
											<input
												type="text"
												value={section.title}
												onChange={(e) => {
													setCourseData((prev) => ({
														...prev,
														curriculum: prev.curriculum.map((s, i) =>
															i === sectionIndex
																? { ...s, title: e.target.value }
																: s,
														),
													}));
												}}
												placeholder="Section Title (e.g., Introduction to React)"
												className="flex-1 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400"
											/>
											<button
												type="button"
												onClick={() =>
													setCourseData((prev) => ({
														...prev,
														curriculum: prev.curriculum.filter(
															(_, i) => i !== sectionIndex,
														),
													}))
												}
												className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
											>
												<Trash2 size={18} />
											</button>
										</div>

										<div className="p-4 space-y-3">
											{section.lectures.map((lecture, lectureIndex) => (
												<div
													key={lecture.id}
													className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700"
												>
													<Video size={16} className="text-slate-400" />
													<input
														type="text"
														placeholder="Lecture Title"
														className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 outline-none text-sm focus:ring-0"
													/>
													<input
														type="text"
														placeholder="Duration"
														className="w-24 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary-500"
													/>
													<button
														type="button"
														className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
													>
														<X size={16} />
													</button>
												</div>
											))}
											<button
												type="button"
												onClick={() => addLecture(sectionIndex)}
												className="w-full py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500"
											>
												+ Add Lecture
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Step 3: Pricing & Media */}
				{currentStep === 3 && (
					<div className="space-y-6">
						<div className="card p-6">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
									<DollarSign className="text-emerald-600 dark:text-emerald-400" size={20} />
								</div>
								<div>
									<h2 className="text-xl font-bold text-slate-900 dark:text-white">
										Pricing
									</h2>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										Set your course price
									</p>
								</div>
							</div>

							<div className="max-w-md">
								<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
									Course Price (USD) *
								</label>
								<div className="relative">
									<DollarSign
										size={18}
										className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
									/>
									<input
										type="number"
										value={courseData.price}
										onChange={(e) => updateField("price", e.target.value)}
										placeholder="0.00"
										min="0"
										step="0.01"
										className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400"
										required
									/>
								</div>
								<p className="text-xs text-slate-400 mt-2">
									<Info size={12} className="inline mr-1" />
									Platform fee: 20% of course price
								</p>
							</div>
						</div>

						<div className="card p-6">
							<h3 className="font-bold text-slate-900 dark:text-white mb-4">Course Media</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
										Course Thumbnail *
									</label>
									<div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer">
										<ImageIcon size={48} className="mx-auto text-slate-400 mb-3" />
										<p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
											Upload Thumbnail
										</p>
										<p className="text-xs text-slate-400">
											PNG, JPG (1280x720px recommended)
										</p>
										<input type="file" className="hidden" accept="image/*" />
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
										Promo Video
									</label>
									<div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer">
										<Video size={48} className="mx-auto text-slate-400 mb-3" />
										<p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
											Upload Video
										</p>
										<p className="text-xs text-slate-400">MP4, MOV (Max 2 minutes)</p>
										<input type="file" className="hidden" accept="video/*" />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Step 4: Publish */}
				{currentStep === 4 && (
					<div className="card p-8 text-center">
						<div className="max-w-2xl mx-auto">
							<div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center mx-auto mb-6">
								<Sparkles size={40} className="text-white" />
							</div>
							<h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
								Ready to Publish?
							</h2>
							<p className="text-slate-600 dark:text-slate-400 mb-8">
								Your course is almost ready! Review everything one more time before publishing.
							</p>

							<div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-8 text-left">
								<h3 className="font-bold text-slate-900 dark:text-white mb-4">
									Course Summary
								</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-slate-500">Title:</span>
										<span className="font-medium text-slate-900 dark:text-white">
											{courseData.title || "Not set"}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-slate-500">Category:</span>
										<span className="font-medium text-slate-900 dark:text-white">
											{courseData.category || "Not set"}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-slate-500">Price:</span>
										<span className="font-medium text-slate-900 dark:text-white">
											${courseData.price || "0.00"}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-slate-500">Sections:</span>
										<span className="font-medium text-slate-900 dark:text-white">
											{courseData.curriculum.length}
										</span>
									</div>
								</div>
							</div>

							<div className="flex gap-4 justify-center">
								<button type="button" className="btn-secondary px-8">
									Save as Draft
								</button>
								<button type="submit" className="btn-primary px-8">
									<CheckCircle size={18} />
									Publish Course
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Navigation Buttons */}
				<div className="flex justify-between mt-8">
					<button
						type="button"
						onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
						disabled={currentStep === 1}
						className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ArrowLeft size={18} />
						Previous
					</button>

					{currentStep < 4 ? (
						<button
							type="button"
							onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
							className="btn-primary"
						>
							Next Step
							<ChevronRight size={18} />
						</button>
					) : null}
				</div>
			</form>
		</div>
	);
};

export default TeacherCreateCourse;
