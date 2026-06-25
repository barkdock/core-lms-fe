import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const logoImg = "/logo/logo.png";

const AnimatedNumber = ({ to, duration = 2, formatter }) => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => (formatter ? formatter(latest) : Math.floor(latest)));

	useEffect(() => {
		const controls = animate(count, to, { duration, ease: "easeOut" });
		return () => controls.stop();
	}, [count, to, duration]);

	return <motion.span>{rounded}</motion.span>;
};

/**
 * AuthLayout — centered card layout for Login/Register pages.
 * Features a split design with a branded hero on the left and the form on the right.
 */
const AuthLayout = ({ children, title, subtitle }) => {
	return (
		<div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
			{/* Left hero panel */}
			<div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-violet-800 p-12 relative overflow-hidden">
				{/* Decorative circles */}
				<div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/5" />
				<div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-white/5" />
				<div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/5" />

				{/* Logo */}
				<div className="flex items-center relative">
					<div className="w-32 h-32 overflow-hidden p-1">
						<img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
					</div>
				</div>

				{/* Hero content */}
				<div className="mt-20 relative">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
					>
						<h1 className="text-4xl font-bold text-white leading-tight mb-4">
							Empower Learning,
							<br />
							Elevate Potential
						</h1>
						<p className="text-primary-200 text-lg leading-relaxed max-w-sm">
							A modern platform connecting students, teachers, and administrators in one seamless
							experience.
						</p>
					</motion.div>

					{/* Stats row */}
					<div className="mt-10 grid grid-cols-3 gap-6">
						{[
							{
								to: 50000,
								label: "Students",
								formatter: (v) => `${Math.round(v / 1000)}K+`,
							},
							{
								to: 1200,
								label: "Courses",
								formatter: (v) => `${(v / 1000).toFixed(1)}K+`,
							},
							{
								to: 98,
								label: "Satisfaction",
								formatter: (v) => `${Math.round(v)}%`,
							},
						].map((s) => (
							<motion.div
								key={s.label}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<p className="text-2xl font-bold text-white">
									<AnimatedNumber to={s.to} formatter={s.formatter} />
								</p>
								<p className="text-primary-300 text-sm">{s.label}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Right form panel */}
			<div className="flex-1 flex items-center justify-center p-6 lg:p-12">
				<motion.div
					className="w-full max-w-md card p-8"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.45 }}
				>
					{/* Mobile logo */}
					<Link to="/" className="flex lg:hidden items-center mb-8">
						<div className="w-8 h-8 overflow-hidden bg-white shadow-sm border border-slate-200">
							<img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
						</div>
					</Link>

					<div className="mb-8">
						<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1.5">{title}</h2>
						{subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm">{subtitle}</p>}
					</div>

					{children}
				</motion.div>
			</div>
		</div>
	);
};

export default AuthLayout;
