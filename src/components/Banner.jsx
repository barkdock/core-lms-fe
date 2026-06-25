import { memo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Slide Data ──────────────────────────────────────────────────────────────

const slides = [
	{
		id: 1,
		tag: "New Course",
		title: "Master",
		titleAccent: "Full-Stack",
		titleEnd: "in 6 months",
		description:
			"A comprehensive roadmap from zero to hero, 1-on-1 mentoring, and real-world projects from top tech companies.",
		image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop&q=80",
		cta: "Start Now",
		ctaLink: "/courses",
	},
	{
		id: 2,
		tag: "🔥 Flash Sale",
		title: "Up to",
		titleAccent: "50%",
		titleEnd: "off all courses",
		description: "Limited time offer! Enroll today to get the best price on any course on the LMS platform.",
		image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1400&auto=format&fit=crop&q=80",
		cta: "View Offers",
		ctaLink: "/pricing",
	},
	{
		id: 3,
		tag: "Trending",
		title: "AI & Machine Learning",
		titleAccent: "for",
		titleEnd: "beginners",
		description: "Master AI fundamentals, build your first model, and apply it to real-world products.",
		image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&auto=format&fit=crop&q=80",
		cta: "Explore Now",
		ctaLink: "/courses",
	},
	{
		id: 4,
		tag: "🏆 Bootcamp",
		title: "Career Switch",
		titleAccent: "Roadmap",
		titleEnd: "in 3 months",
		description:
			"Intensive 12-week Bootcamp. Job support guarantee, CV reviews, and mock interviews with real HR professionals.",
		image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&auto=format&fit=crop&q=80",
		cta: "Join Bootcamp",
		ctaLink: "/courses",
	},
	{
		id: 5,
		tag: "Premium",
		title: "UI/UX Design —",
		titleAccent: "Professional",
		titleEnd: "Design Thinking",
		description: "Learn to design like a real product designer, from research to prototyping and handoff.",
		image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&auto=format&fit=crop&q=80",
		cta: "View Details",
		ctaLink: "/courses",
	},
	{
		id: 6,
		tag: "🎓 Certificate",
		title: "Earn a",
		titleAccent: "Globally Recognized",
		titleEnd: "Certificate",
		description:
			"Complete your course and receive a valuable digital certificate recognized by international employers.",
		image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1400&auto=format&fit=crop&q=80",
		cta: "Learn More",
		ctaLink: "/courses",
	},
	{
		id: 7,
		tag: "🤝 Community",
		title: "LMS Hackathon",
		titleAccent: "2025",
		titleEnd: "— Coming Soon!",
		description:
			"Join our 48h coding competition with amazing prizes. Networking, mentoring, and job opportunities.",
		image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&auto=format&fit=crop&q=80",
		cta: "Register Now",
		ctaLink: "/resources",
	},
];

const stats = [
	{ icon: BookOpen, value: "500+", label: "Courses" },
	{ icon: Users, value: "10K+", label: "Students" },
	{ icon: Award, value: "98%", label: "Satisfaction" },
	{ icon: TrendingUp, value: "85%", label: "Salary Bump" },
];

const SLIDE_INTERVAL = 6000;

// ─── Floating Particle Component ─────────────────────────────────────────────

const FloatingParticle = memo(({ delay, duration, x, y, size }) => (
	<motion.div
		className="absolute rounded-full bg-amber-400/10"
		style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
		animate={{
			y: [0, -30, 10, -20, 0],
			x: [0, 15, -10, 5, 0],
			opacity: [0.15, 0.35, 0.2, 0.4, 0.15],
		}}
		transition={{
			duration,
			delay,
			repeat: Infinity,
			ease: "easeInOut",
		}}
	/>
));

// ─── Banner Component ────────────────────────────────────────────────────────

const Banner = () => {
	const [current, setCurrent] = useState(0);
	const [direction, setDirection] = useState(1);
	const [isCompactMotion, setIsCompactMotion] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 768px)");
		const updateMode = () => setIsCompactMotion(mediaQuery.matches);
		updateMode();
		mediaQuery.addEventListener("change", updateMode);
		return () => mediaQuery.removeEventListener("change", updateMode);
	}, []);

	const goTo = useCallback(
		(index) => {
			setDirection(index > current ? 1 : -1);
			setCurrent(index);
		},
		[current],
	);

	const goNext = useCallback(() => {
		setDirection(1);
		setCurrent((prev) => (prev + 1) % slides.length);
	}, []);

	const goPrev = useCallback(() => {
		setDirection(-1);
		setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			goNext();
		}, SLIDE_INTERVAL);
		return () => clearInterval(timer);
	}, [goNext]);

	const slide = slides[current];

	const contentVariants = {
		enter: (dir) => ({ x: prefersReducedMotion ? 0 : dir > 0 ? 40 : -40, opacity: 0 }),
		center: { x: 0, opacity: 1 },
		exit: (dir) => ({ x: prefersReducedMotion ? 0 : dir > 0 ? -40 : 40, opacity: 0 }),
	};

	const imageVariants = {
		enter: { scale: prefersReducedMotion ? 1 : 1.04, opacity: 0 },
		center: {
			scale: 1,
			opacity: 0.22,
			transition: { duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" },
		},
		exit: { scale: 1, opacity: 0, transition: { duration: prefersReducedMotion ? 0.2 : 0.35 } },
	};

	return (
		<section className="relative bg-transparent">
			<div className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-7">
				<div className="relative min-h-[420px] overflow-hidden rounded-[26px] border border-[var(--border)] bg-[#0f1119] shadow-[var(--shadow)] sm:min-h-[480px] md:min-h-[520px]">
					{/* ─── Animated Gradient Mesh Background ─── */}
					<div className="absolute inset-0">
						<div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-indigo-900/10" />
						<div className="absolute -top-1/2 -left-1/4 h-[700px] w-[700px] rounded-full bg-amber-500/5 blur-[110px] animate-float" />
						<div
							className="absolute -bottom-1/3 -right-1/4 h-[520px] w-[520px] rounded-full bg-indigo-500/5 blur-[90px] animate-float"
							style={{ animationDelay: "3s" }}
						/>
					</div>

					{/* ─── Background Image Crossfade ─── */}
					<AnimatePresence mode="sync">
						<motion.div
							key={`bg-${slide.id}`}
							variants={imageVariants}
							initial="enter"
							animate="center"
							exit="exit"
							className="absolute inset-0"
						>
							<img
								src={slide.image}
								alt=""
								loading="eager"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</motion.div>
					</AnimatePresence>

					{/* ─── Dark Overlays ─── */}
					<div className="absolute inset-0 bg-gradient-to-r from-[#0f1119] via-[#0f1119]/90 to-[#0f1119]/60" />
					<div className="absolute inset-0 bg-gradient-to-t from-[#0f1119] via-transparent to-[#0f1119]/35" />

					{/* ─── Floating Particles ─── */}
					{!prefersReducedMotion && !isCompactMotion && (
						<div className="pointer-events-none absolute inset-0">
							<FloatingParticle delay={0} duration={8} x={15} y={20} size={6} />
							<FloatingParticle delay={1.5} duration={10} x={75} y={15} size={4} />
							<FloatingParticle delay={3} duration={7} x={45} y={60} size={5} />
						</div>
					)}

					{/* ─── Geometric Lines ─── */}
					<div className="pointer-events-none absolute inset-0 overflow-hidden">
						<div className="absolute -right-10 top-0 h-full w-px bg-gradient-to-b from-amber-400/5 via-amber-400/10 to-transparent rotate-[12deg] origin-top" />
						<div className="absolute right-32 top-0 h-full w-px bg-gradient-to-b from-white/3 via-white/6 to-transparent rotate-[12deg] origin-top" />
						<div className="absolute bottom-0 left-0 h-px w-2/5 bg-gradient-to-r from-amber-400/15 to-transparent" />
					</div>

					{/* ─── Main Content ─── */}
					<div className="relative mx-auto flex max-w-6xl items-center px-6 py-12 sm:px-8 sm:py-14 lg:max-w-5xl">
						<div className="w-full lg:max-w-2xl">
							<AnimatePresence mode="wait" custom={direction}>
								<motion.div
									key={slide.id}
									custom={direction}
									variants={contentVariants}
									initial="enter"
									animate="center"
									exit="exit"
									transition={{
										duration: prefersReducedMotion ? 0.2 : 0.4,
										ease: [0.25, 0.46, 0.45, 0.94],
									}}
								>
									<span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-amber-400 sm:text-xs">
										<span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
										{slide.tag}
									</span>

									<h1 className="font-heading mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl">
										{slide.title}{" "}
										<span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
											{slide.titleAccent}
										</span>{" "}
										{slide.titleEnd}
									</h1>

									<p className="font-body mt-4 max-w-lg text-base leading-relaxed text-slate-400 sm:mt-5 md:text-[18px]">
										{slide.description}
									</p>

									<div className="mt-7 flex flex-wrap items-center gap-3">
										<Link
											to={slide.ctaLink}
											className="group inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-[15px] font-bold text-[#0f1119] shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30"
										>
											{slide.cta}
											<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
										<Link
											to="/register"
											className="inline-flex items-center gap-2 rounded-lg border border-slate-600/60 px-5 py-3 text-[15px] font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:text-white"
										>
											Register Free
										</Link>
									</div>

									<div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
										{stats.map(({ icon: Icon, value, label }) => (
											<div key={label} className="flex items-center gap-2">
												<Icon className="h-4 w-4 text-amber-400/70" />
												<span className="font-semibold text-slate-100">
													{value}
												</span>
												<span className="text-slate-400">{label}</span>
											</div>
										))}
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>

					<div className="absolute bottom-4 right-6 flex items-center gap-2 text-[10px] font-semibold text-slate-400 sm:bottom-6 sm:right-8 sm:text-[11px]">
						<span className="tabular-nums">{String(current + 1).padStart(2, "0")}</span>
						<span className="h-px w-6 bg-slate-600" />
						<span className="tabular-nums">{String(slides.length).padStart(2, "0")}</span>
					</div>

					<div className="absolute bottom-4 left-6 flex items-center gap-1 sm:bottom-6 sm:left-8">
						<button
							onClick={goPrev}
							className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-white/10 hover:text-amber-400"
							aria-label="Previous slide"
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
						<button
							onClick={goNext}
							className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-white/10 hover:text-amber-400"
							aria-label="Next slide"
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
