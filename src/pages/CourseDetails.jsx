import { Link, Navigate, useParams } from "react-router-dom";
import { Award, Clock3, Globe, PlayCircle, Star, Users } from "lucide-react";
import { getPublicCourseById } from "@/data/publicCourses";

function CourseDetails() {
	const { courseId } = useParams();
	const course = getPublicCourseById(courseId);

	if (!course) {
		return <Navigate to="/courses" replace />;
	}

	const totalCurriculumLessons = course.curriculum.reduce((sum, section) => sum + section.lessons, 0);

	return (
		<div className="min-h-screen bg-slate-50 py-8">
			<div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[minmax(0,1fr),360px]">
				<div className="space-y-6">
					<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-amber-600">
							{course.category}
						</p>
						<h1 className="font-heading text-2xl font-extrabold text-slate-900 md:text-4xl">{course.title}</h1>
						<p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{course.subtitle}</p>
						<p className="mt-3 text-sm text-slate-600">
							Created by{" "}
							<span className="font-semibold text-indigo-700">{course.instructor.name}</span>
						</p>

						<div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
							<span className="inline-flex items-center gap-1">
								<Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
								<strong className="text-slate-900">{course.rating}</strong> ({course.ratingsCount} ratings)
							</span>
							<span className="inline-flex items-center gap-1">
								<Users className="h-3.5 w-3.5" />
								{course.students.toLocaleString()} students
							</span>
							<span className="inline-flex items-center gap-1">
								<Clock3 className="h-3.5 w-3.5" />
								{course.duration}
							</span>
							<span className="inline-flex items-center gap-1">
								<Globe className="h-3.5 w-3.5" />
								{course.language}
							</span>
						</div>
					</div>

					<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
						<h2 className="text-lg font-bold text-slate-900 md:text-xl">What you'll learn</h2>
						<div className="mt-4 grid gap-3 sm:grid-cols-2">
							{course.whatYouWillLearn.map((item) => (
								<div key={item} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
									{item}
								</div>
							))}
						</div>
					</div>

					<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-bold text-slate-900 md:text-xl">Course content</h2>
							<p className="text-xs text-slate-500">
								{course.curriculum.length} sections • {totalCurriculumLessons} lessons
							</p>
						</div>
						<div className="space-y-2">
							{course.curriculum.map((section) => (
								<div key={section.section} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
									<div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
										<PlayCircle className="h-4 w-4 text-indigo-500" />
										{section.section}
									</div>
									<p className="text-xs text-slate-500">
										{section.lessons} lessons • {section.duration}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
						<h2 className="text-lg font-bold text-slate-900 md:text-xl">Instructor</h2>
						<p className="mt-4 text-base font-semibold text-slate-900">{course.instructor.name}</p>
						<p className="text-sm text-indigo-600">{course.instructor.title}</p>
						<p className="mt-3 text-sm leading-relaxed text-slate-600">{course.instructor.bio}</p>
					</div>

					<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
						<h2 className="text-lg font-bold text-slate-900 md:text-xl">Student reviews</h2>
						<div className="mt-4 space-y-3">
							{course.reviews.map((review, idx) => (
								<div key={review} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
									<p className="mb-1 text-xs font-semibold text-slate-500">Review {idx + 1}</p>
									<p>{review}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<aside className="h-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
					<img src={course.thumbnail} alt={course.title} className="h-48 w-full rounded-2xl object-cover" />
					<div className="mt-4 flex items-baseline gap-2">
						<span className="text-3xl font-black text-slate-900">{course.price}</span>
						<span className="text-sm text-slate-400 line-through">{course.oldPrice}</span>
					</div>
					<p className="mt-1 text-xs text-amber-600">Offer ends soon</p>

					<div className="mt-4 space-y-2">
						<button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
							Enroll now
						</button>
						<button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
							Add to wishlist
						</button>
					</div>

					<div className="mt-5 space-y-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
						<p>
							Created by <span className="font-semibold text-slate-800">{course.instructor.name}</span>
						</p>
						<p className="inline-flex items-center gap-1">
							<Award className="h-3.5 w-3.5 text-emerald-600" />
							Certificate of completion
						</p>
						<p>Last updated: {course.lastUpdated}</p>
						<p>Level: {course.level}</p>
					</div>

					<Link
						to="/courses"
						className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
					>
						Back to all courses
					</Link>
				</aside>
			</div>
		</div>
	);
}

export default CourseDetails;
