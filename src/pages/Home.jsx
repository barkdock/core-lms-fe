import { memo, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, PlayCircle, Users, CheckCircle2, Zap, Quote, Sparkles, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import { publicCourses } from "@/data/publicCourses";

// ─── Data ────────────────────────────────────────────────────────────────────

const courses = publicCourses.slice(0, 4);

const features = [
	{
		icon: <PlayCircle className="h-6 w-6" />,
		title: "Guided Roadmaps",
		description: "Expert-designed curriculum to help you reach your goals faster.",
		stat: "500+",
		statLabel: "courses",
		span: "large",
	},
	{
		icon: <Users className="h-6 w-6" />,
		title: "Professional Mentors",
		description: "Learn directly from professionals working at top tech companies.",
		stat: "50+",
		statLabel: "mentors",
		span: "small",
	},
	{
		icon: <CheckCircle2 className="h-6 w-6" />,
		title: "Real-world Projects",
		description: "Build your portfolio with hands-on projects and best practices.",
		stat: "200+",
		statLabel: "projects",
		span: "small",
	},
	{
		icon: <Zap className="h-6 w-6" />,
		title: "Measurable Results",
		description: "Track your progress with analytics, certificates, and skill assessments.",
		stat: "98%",
		statLabel: "satisfaction",
		span: "large",
	},
];

const testimonials = [
	{
		id: 1,
		name: "Minh Nguyen",
		role: "Frontend Engineer at Fintech Co.",
		avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
		quote: "The LMS helped me transition from a fresh graduate to a frontend engineer in 6 months. Very clear and practical roadmap.",
		course: "Frontend Career Path",
		rating: 5,
	},
	{
		id: 2,
		name: "Lan Pham",
		role: "Product Designer at SaaS Startup",
		avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
		quote: "The platform interface is extremely modern. Learning here feels like using a premium SaaS product.",
		course: "UI/UX Design Essentials",
		rating: 5,
	},
	{
		id: 3,
		name: "Quang Tran",
		role: "Data Analyst at E-commerce",
		avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
		quote: "The data analytics exercises use real-world datasets. After completing the course, I passed my interviews with confidence.",
		course: "Data Analysis with Python",
		rating: 4.8,
	},
];

// ─── Reusable Section Header ─────────────────────────────────────────────────

const SectionHeader = memo(({ label, title, subtitle }) => (
	<div className="mb-10 md:mb-14">
		{label && (
			<motion.span
				initial={{ opacity: 0, y: 12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4 }}
				className="font-heading mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--accent-2)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]"
			>
				<Sparkles className="h-3.5 w-3.5" />
				{label}
			</motion.span>
		)}
		<motion.h2
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: 0.05 }}
			className="font-heading text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl"
		>
			{title}
		</motion.h2>
		{subtitle && (
			<motion.p
				initial={{ opacity: 0, y: 12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="font-body mt-2.5 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-[17px]"
			>
				{subtitle}
			</motion.p>
		)}
	</div>
));

// ─── Course Card ─────────────────────────────────────────────────────────────

const CourseCard = memo(({ course, index }) => (
	<motion.article
		className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/[0.06]"
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-10%" }}
		transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
	>
		{/* Thumbnail */}
		<div className="relative h-44 overflow-hidden">
			<img
				src={course.thumbnail}
				alt={course.title}
				loading="lazy"
				decoding="async"
				className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
			/>
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

			{/* Level Badge */}
			<div className="absolute left-3 top-3 rounded-lg bg-[#0f1119]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
				{course.level}
			</div>

			{/* Hover CTA */}
			<Link
				to={`/courses/${course.id}`}
				className="absolute bottom-3 right-3 translate-y-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 py-2 text-[11px] font-bold text-[#0f1119] opacity-0 shadow-lg transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
			>
				View Details
			</Link>
		</div>

		{/* Content */}
		<div className="flex flex-1 flex-col gap-3 p-5">
			<div className="flex items-center justify-between text-xs">
				<span className="rounded-md bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">
					{course.category}
				</span>
				<span className="inline-flex items-center gap-1">
					<Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
					<span className="font-bold text-slate-800">{course.rating}</span>
					<span className="text-slate-400">({course.ratingsCount})</span>
				</span>
			</div>

			<h3 className="font-heading line-clamp-2 text-base font-bold text-slate-900 leading-snug">
				{course.title}
			</h3>

			<div className="mt-auto flex items-end justify-between pt-3 border-t border-slate-100">
				<div>
					<div className="flex items-baseline gap-2">
						<span className="text-xl font-extrabold text-slate-900">{course.price}</span>
						<span className="text-xs text-slate-400 line-through">{course.oldPrice}</span>
					</div>
					<p className="text-xs font-semibold text-amber-600">Weekly Offer</p>
				</div>
				<button className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-bold text-white opacity-0 shadow-sm transition-all duration-400 group-hover:opacity-100 hover:bg-slate-800">
					Enroll
					<ArrowRight className="h-3 w-3" />
				</button>
			</div>
		</div>
	</motion.article>
));

// ─── Feature Card ────────────────────────────────────────────────────────────

const FeatureCard = memo(({ feature, index }) => (
	<motion.div
		className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent-2)] hover:shadow-xl hover:shadow-[var(--shadow)] ${
			feature.span === "large" ? "md:col-span-7" : "md:col-span-5"
		}`}
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-10%" }}
		transition={{ duration: 0.5, delay: index * 0.1 }}
	>
		{/* Icon with glow */}
		<div className="relative">
			<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-2)] text-[var(--accent)] transition-all duration-300 group-hover:shadow-md group-hover:shadow-[0_14px_30px_rgba(212,90,31,0.18)]">
				{feature.icon}
			</div>
		</div>

		{/* Content */}
		<div className="flex-1">
			<h3 className="font-heading text-lg font-bold text-[var(--ink)] md:text-xl">{feature.title}</h3>
			<p className="font-body mt-2 text-base leading-relaxed text-[var(--muted)]">{feature.description}</p>
		</div>

		{/* Stat */}
		<div className="flex items-baseline gap-2 border-t border-[var(--border)] pt-5">
			<span className="font-heading text-3xl font-extrabold text-[var(--ink)]">{feature.stat}</span>
			<span className="font-body text-base text-[var(--muted)]">{feature.statLabel}</span>
		</div>

		{/* Decorative corner accent */}
		<div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--accent)]/10 transition-all duration-500 group-hover:bg-[var(--accent)]/15 group-hover:scale-150" />
	</motion.div>
));

const TestimonialsSection = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 7000);
		return () => clearInterval(timer);
	}, []);

	const handlePrev = useCallback(() => {
		setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	}, []);

	const handleNext = useCallback(() => {
		setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
	}, []);

	return (
		<section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
			<SectionHeader
				label="Community"
				title="What our students say"
				subtitle="Real stories from students who upgraded their careers."
			/>

			<div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-10">
				<div className="mb-8 flex items-center justify-between">
					<div className="inline-flex items-center gap-2.5 rounded-full bg-[#0f1119] px-4 py-2 text-xs font-bold text-white shadow-lg">
						<Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
						<span>4.9/5</span>
						<span className="text-slate-500">·</span>
						<span className="text-slate-300">Community Rating</span>
					</div>
					<div className="hidden items-center gap-2 md:flex">
						<button
							onClick={handlePrev}
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-amber-300 hover:text-amber-600 hover:shadow-sm"
						>
							<ArrowRight className="h-4 w-4 rotate-180" />
						</button>
						<button
							onClick={handleNext}
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f1119] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
						>
							<ArrowRight className="h-4 w-4" />
						</button>
					</div>
				</div>

				<div className="relative min-h-[240px]">
					<AnimatePresence mode="wait">
						{testimonials.map(
							(testimonial, index) =>
								index === currentTestimonial && (
									<motion.div
										key={testimonial.id}
										initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
										transition={{
											duration: prefersReducedMotion ? 0.2 : 0.5,
											ease: [0.25, 0.46, 0.45, 0.94],
										}}
										className="grid gap-8 md:grid-cols-[1.3fr,0.8fr] md:items-center"
									>
										<div className="space-y-5">
											<Quote className="h-10 w-10 text-amber-400/30" />
											<p className="font-heading text-xl leading-relaxed text-slate-800 sm:text-2xl md:text-3xl font-semibold">
												&ldquo;{testimonial.quote}&rdquo;
											</p>
											<div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
												<div className="flex items-center gap-1">
													{Array.from({ length: 5 }).map((_, i) => (
														<Star
															key={i}
															className={`h-3.5 w-3.5 ${
																i < Math.round(testimonial.rating)
																	? "fill-amber-400 text-amber-400"
																	: "text-slate-200"
															}`}
														/>
													))}
												</div>
												<span className="font-semibold text-slate-600">
													{testimonial.rating.toFixed(1)}
												</span>
												<span className="hidden text-slate-300 md:inline">·</span>
												<span className="hidden text-slate-500 md:inline">
													Completed {testimonial.course}
												</span>
											</div>
										</div>

										<div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-amber-50/30 p-6">
											<div
												className="h-16 w-16 flex-shrink-0 rounded-2xl bg-slate-200 bg-cover bg-center ring-2 ring-amber-200/50 ring-offset-2"
												style={{
													backgroundImage: `url(${testimonial.avatar})`,
												}}
											/>
											<div>
												<p className="font-heading text-base font-bold text-slate-900">
													{testimonial.name}
												</p>
												<p className="mt-0.5 text-sm text-slate-500">
													{testimonial.role}
												</p>
												<p className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[#0f1119] px-3 py-1 text-xs font-bold text-white">
													<GraduationCap className="h-3 w-3" />
													{testimonial.course}
												</p>
											</div>
										</div>
									</motion.div>
								),
						)}
					</AnimatePresence>
				</div>

				<div className="mt-8 flex items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						{testimonials.map((t, index) => (
							<button
								key={t.id}
								onClick={() => setCurrentTestimonial(index)}
								className={`h-1.5 rounded-full transition-all duration-400 ${
									index === currentTestimonial
										? "w-8 bg-gradient-to-r from-amber-400 to-orange-500"
										: "w-2.5 bg-slate-300 hover:bg-slate-400"
								}`}
							/>
						))}
					</div>
					<div className="flex items-center gap-2 md:hidden">
						<button
							onClick={handlePrev}
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-amber-300 hover:text-amber-600"
						>
							<ArrowRight className="h-4 w-4 rotate-180" />
						</button>
						<button
							onClick={handleNext}
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f1119] text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
						>
							<ArrowRight className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

// ─── Home Component ──────────────────────────────────────────────────────────

function Home() {
	const prefersReducedMotion = useReducedMotion();

	return (
		<div className="font-body">
			{/* ─── Banner ─── */}
			<Banner />

			{/* ─── Featured Courses ─── */}
			<section className="content-auto mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
				<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
					<SectionHeader
						label="Curated"
						title="Featured Courses"
						subtitle="Hand-picked by mentors, suitable for beginners and working professionals."
					/>
					<motion.div
						initial={prefersReducedMotion ? false : { opacity: 0 }}
						whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.3, delay: 0.1 }}
					>
						<span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
							Updated Weekly
						</span>
					</motion.div>
				</div>

				<div className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{courses.map((course, index) => (
						<CourseCard key={course.id} course={course} index={index} />
					))}
				</div>

				{/* View all */}
				<motion.div
					initial={prefersReducedMotion ? false : { opacity: 0 }}
					whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.3, delay: 0.1 }}
					className="mt-12 text-center"
				>
					<Link
						to="/courses"
						className="font-heading group inline-flex items-center gap-2.5 text-base font-bold text-amber-600 transition-colors hover:text-amber-500"
					>
						View all courses
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</motion.div>
			</section>

			{/* ─── Why Choose Us — Bento Grid ─── */}
			<section className="content-auto relative overflow-hidden border-y border-[var(--border)] bg-[var(--bg)]">
				{/* Decorative background */}
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[var(--accent-2)]/40 blur-[100px]" />
					<div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-[var(--accent-3)]/25 blur-[80px]" />
				</div>

				<div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
					<SectionHeader
						label="Why Choose Us"
						title="Why learn with us?"
						subtitle="Combining a modern experience with high-quality educational content."
					/>
					<div className="grid gap-5 md:grid-cols-12">
						{features.map((feature, index) => (
							<FeatureCard key={feature.title} feature={feature} index={index} />
						))}
					</div>
				</div>
			</section>

			<TestimonialsSection />

			{/* ─── CTA Section ─── */}
			<section className="content-auto relative overflow-hidden bg-[#0f1119]">
				{/* Decorative background */}
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-[100px]" />
					<div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-indigo-500/10 blur-[80px]" />
				</div>

				<div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28">
					<motion.div
						initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
						whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.35 }}
					>
						<span className="font-heading inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.12em] text-amber-400">
							<Sparkles className="h-3.5 w-3.5" />
							Start for free
						</span>
						<h2 className="font-heading mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
							Ready to{" "}
							<span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
								upgrade
							</span>{" "}
							your career?
						</h2>
						<p className="font-body mx-auto mt-4 max-w-lg text-lg leading-relaxed text-slate-400 md:text-xl">
							Join 10,000+ students developing their skills daily with our LMS.
						</p>

						<div className="mt-9 flex flex-wrap items-center justify-center gap-3">
							<Link
								to="/register"
								className="group inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 text-base font-bold text-[#0f1119] shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30"
							>
								Register Now
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
							<Link
								to="/courses"
								className="inline-flex items-center gap-2 rounded-lg border border-slate-600/60 px-6 py-3.5 text-base font-semibold text-slate-300 transition-all duration-300 hover:border-amber-400/40 hover:text-white"
							>
								Explore Courses
							</Link>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}

export default Home;
