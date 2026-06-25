import { useEffect, useState, useRef } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import {
	ArrowRight,
	Linkedin,
	Twitter,
	Youtube,
	MoonStar,
	SunMedium,
	User,
	LogOut,
	BookOpen,
	ChevronDown,
	ShoppingCart,
	Bell,
	Menu,
	X,
	Repeat2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/uiSlice";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/utils/formatters";
import { setFakeUser } from "@/store/authSlice";
import { ROLE_HOME, ROLES } from "@/utils/constants";

const logoImg = "/logo/logo.png";

const NOTIFICATIONS = [
	{ id: 1, title: "Chào mừng bạn đến với hệ thống", time: "Vừa xong", unread: true },
	{ id: 2, title: "Khóa học mới sắp ra mắt", time: "2 giờ trước", unread: true },
	{ id: 3, title: "Bảo trì hệ thống định kỳ", time: "1 ngày trước", unread: false },
];

function PublicLayout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isDark = useSelector((state) => state.ui.darkMode);
	const [showProfile, setShowProfile] = useState(false);
	const [showNotif, setShowNotif] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showMobileAlerts, setShowMobileAlerts] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const profileRef = useRef(null);
	const notifRef = useRef(null);

	const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

	const { user, isAuthenticated, logout } = useAuth();
	const normalizedRole = (user?.role || "").toString().replace("ROLE_", "").toUpperCase();
	const dashboardRoleSegment =
		normalizedRole === ROLES.ADMIN ? "admin" : normalizedRole === ROLES.TEACHER ? "teacher" : "student";
	const isRoleSwappable = isAuthenticated && (normalizedRole === ROLES.STUDENT || normalizedRole === ROLES.TEACHER);
	const isStudentRole = normalizedRole === ROLES.STUDENT;

	const handleSwapRole = () => {
		if (!isRoleSwappable || !user) return;

		const nextRole = isStudentRole ? ROLES.TEACHER : ROLES.STUDENT;
		dispatch(setFakeUser({ ...user, role: nextRole }));
		setShowProfile(false);
		setShowMobileMenu(false);
		navigate(ROLE_HOME[nextRole] || "/");
	};

	// Track scroll for header shadow
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handler = (e) => {
			if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
			if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const toggleTheme = () => {
		dispatch(toggleDarkMode());
		setShowNotif(false);
		setShowProfile(false);
	};

	const navLinks = [
		{ to: "/", label: "Home", end: true },
		{ to: "/courses", label: "Courses" },
		{ to: "/pricing", label: "Pricing" },
		{ to: "/teams", label: "For Teams" },
		{ to: "/resources", label: "Resources" },
	];

	const toggleMobileMenu = () => {
		setShowMobileMenu((prev) => !prev);
		setShowNotif(false);
		setShowProfile(false);
	};

	useEffect(() => {
		if (!showMobileMenu) setShowMobileAlerts(false);
	}, [showMobileMenu]);

	useEffect(() => {
		const onKeyDown = (event) => {
			if (event.key === "Escape") setShowMobileMenu(false);
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
			{/* Background gradient glows */}
			<div className="pointer-events-none fixed inset-0 -z-10">
				<div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[var(--accent-3)]/15 blur-3xl" />
				<div className="absolute top-40 -right-32 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
			</div>

			{/* Sticky header */}
			<header
				className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? "backdrop-blur-md" : ""}`}
			>
				<div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
					<div
						className={`flex h-14 items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3.5 shadow-[var(--shadow)] transition-all sm:gap-6 sm:px-5 ${
							scrolled ? "shadow-[0_18px_40px_rgba(26,18,10,0.18)]" : ""
						}`}
					>
						{/* ── Logo ── */}
						<Link to="/" className="flex flex-shrink-0 items-center group">
							<div className="h-11 w-11 overflow-hidden bg-[var(--card)] shadow-sm transition-all duration-200 group-hover:shadow-indigo-100/50 group-hover:shadow-md">
								<img src={logoImg} alt="Cognira" className="h-full w-full object-cover" />
							</div>
						</Link>

						{/* ── Nav (desktop) ── */}
						<nav className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] p-1 md:flex">
							{navLinks.map(({ to, label, end }) => (
								<NavLink
									key={to}
									to={to}
									end={end}
									className={({ isActive }) =>
										`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-150 ${
											isActive
												? "text-[var(--ink)]"
												: "text-[var(--muted)] hover:text-[var(--ink)]"
										}`
									}
								>
									{({ isActive }) => (
										<>
											{label}
											{isActive && (
												<motion.span
													layoutId="nav-pill"
													className="absolute inset-0 rounded-full bg-[var(--card)] shadow-sm ring-1 ring-[var(--border)]"
													style={{ zIndex: -1 }}
													transition={{
														type: "spring",
														stiffness: 400,
														damping: 35,
													}}
												/>
											)}
										</>
									)}
								</NavLink>
							))}
						</nav>

						{/* ── Actions ── */}
						<div className="flex items-center gap-2">
							<div className="hidden items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-1.5 py-1 sm:flex">
								{/* Cart */}
								<Link
									to="/cart"
									aria-label="Shopping Cart"
									className="relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-all hover:bg-white hover:text-[var(--ink)]"
								>
									<ShoppingCart size={16} />
									<span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">
										0
									</span>
								</Link>

								{/* Notifications */}
								<div className="relative" ref={notifRef}>
									<button
										type="button"
										onClick={() => {
											setShowNotif((v) => !v);
											setShowProfile(false);
										}}
										aria-label="Notifications"
										className="relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-all hover:bg-white hover:text-[var(--ink)]"
									>
										<Bell size={16} />
										{unreadCount > 0 && (
											<span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
										)}
									</button>

									<AnimatePresence>
										{showNotif && (
											<motion.div
												initial={{ opacity: 0, y: 6, scale: 0.97 }}
												animate={{ opacity: 1, y: 0, scale: 1 }}
												exit={{ opacity: 0, y: 6, scale: 0.97 }}
												transition={{ duration: 0.15, ease: "easeOut" }}
												className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-900/10"
											>
												<div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
													<div className="flex items-center gap-2">
														<h3 className="text-sm font-semibold text-slate-900">
															Notifications
														</h3>
														{unreadCount > 0 && (
															<span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600">
																{unreadCount} new
															</span>
														)}
													</div>
													<button className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
														Mark all read
													</button>
												</div>
												<div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
													{NOTIFICATIONS.map((n) => (
														<div
															key={n.id}
															className={`flex cursor-pointer gap-3 px-4 py-3.5 transition-colors hover:bg-slate-50 ${
																n.unread ? "bg-indigo-50/30" : ""
															}`}
														>
															<div
																className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
																	n.unread
																		? "bg-indigo-500"
																		: "bg-slate-200"
																}`}
															/>
															<div className="min-w-0">
																<p
																	className={`text-sm leading-snug ${
																		n.unread
																			? "font-medium text-slate-900"
																			: "text-slate-600"
																	}`}
																>
																	{n.title}
																</p>
																<p className="mt-0.5 text-xs text-slate-400">
																	{n.time}
																</p>
															</div>
														</div>
													))}
												</div>
												<div className="border-t border-slate-100 px-4 py-2.5">
													<button className="w-full text-center text-xs font-medium text-slate-500 transition-colors hover:text-slate-900">
														View all notifications
													</button>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Dark mode toggle */}
								<button
									type="button"
									onClick={toggleTheme}
									aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
									title={isDark ? "Switch to light mode" : "Switch to dark mode"}
									className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-all hover:bg-[var(--accent-2)] hover:text-[var(--ink)]"
								>
									<span className="relative flex h-4 w-4 items-center justify-center">
										<MoonStar
											className={`absolute h-4 w-4 transition-all duration-200 ${
												isDark
													? "opacity-0 -translate-y-1 rotate-90"
													: "opacity-100"
											}`}
										/>
										<SunMedium
											className={`absolute h-4 w-4 text-amber-400 transition-all duration-200 ${
												isDark
													? "opacity-100"
													: "opacity-0 translate-y-1 -rotate-90"
											}`}
										/>
									</span>
								</button>

								{/* Divider */}
								<div className="mx-1 h-5 w-px bg-slate-200" />

								{/* Auth */}
								{isAuthenticated ? (
									<div className="relative" ref={profileRef}>
										<button
											onClick={() => {
												setShowProfile((v) => !v);
												setShowNotif(false);
											}}
											className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
										>
											<div className="h-6 w-6 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 text-[10px] font-bold text-white flex items-center justify-center flex-shrink-0">
												{user?.avatarUrl ? (
													<img
														src={user.avatarUrl}
														alt={user.fullName}
														className="h-full w-full object-cover"
													/>
												) : (
													getInitials(user?.fullName)
												)}
											</div>
											<ChevronDown
												size={13}
												className={`text-slate-400 transition-transform duration-200 ${
													showProfile ? "rotate-180" : ""
												}`}
											/>
										</button>

										<AnimatePresence>
											{showProfile && (
												<motion.div
													initial={{ opacity: 0, y: 6, scale: 0.97 }}
													animate={{ opacity: 1, y: 0, scale: 1 }}
													exit={{ opacity: 0, y: 6, scale: 0.97 }}
													transition={{ duration: 0.15, ease: "easeOut" }}
													className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl shadow-slate-900/10"
												>
													{/* User info */}
													<div className="mb-1.5 flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5">
														<div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 text-[11px] font-bold text-white flex items-center justify-center">
															{user?.avatarUrl ? (
																<img
																	src={user.avatarUrl}
																	alt={user.fullName}
																	className="h-full w-full object-cover"
																/>
															) : (
																getInitials(user?.fullName)
															)}
														</div>
														<div className="min-w-0">
															<p className="truncate text-sm font-semibold text-slate-900">
																{user?.fullName}
															</p>
															<p className="truncate text-[11px] text-slate-400">
																{user?.email}
															</p>
														</div>
													</div>

													<Link
														to="/profile"
														onClick={() => setShowProfile(false)}
														className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
													>
														<User size={14} className="text-slate-400" />
														My Profile
													</Link>

													<Link
														to={`/${dashboardRoleSegment}/dashboard`}
														onClick={() => setShowProfile(false)}
														className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
													>
														<BookOpen size={14} className="text-slate-400" />
														My Courses
													</Link>

													{isRoleSwappable && (
														<button
															type="button"
															onClick={handleSwapRole}
															className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
														>
															<Repeat2 size={14} />
															Swap to{" "}
															{isStudentRole ? "Instructor" : "Student"}
														</button>
													)}

													<div className="my-1 h-px bg-slate-100" />

													<button
														onClick={() => {
															logout();
															setShowProfile(false);
														}}
														className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
													>
														<LogOut size={14} />
														Sign out
													</button>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								) : (
									<div className="hidden items-center gap-2 sm:flex">
										<Link
											to="/login"
											className="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--accent-2)] hover:text-[var(--ink)]"
										>
											Log in
										</Link>
										<Link
											to="/register"
											className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-[13px] font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-px hover:shadow-xl hover:shadow-amber-500/40"
										>
											Get started
											<ArrowRight className="h-3.5 w-3.5" />
										</Link>
									</div>
								)}
							</div>

							<div className="flex items-center gap-1 sm:hidden">
								<button
									type="button"
									onClick={toggleTheme}
									aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
									title={isDark ? "Switch to light mode" : "Switch to dark mode"}
									className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition-all hover:bg-[var(--accent-2)] hover:text-[var(--ink)]"
								>
									<span className="relative flex h-4 w-4 items-center justify-center">
										<MoonStar
											className={`absolute h-4 w-4 transition-all duration-200 ${
												isDark
													? "opacity-0 -translate-y-1 rotate-90"
													: "opacity-100"
											}`}
										/>
										<SunMedium
											className={`absolute h-4 w-4 text-amber-400 transition-all duration-200 ${
												isDark
													? "opacity-100"
													: "opacity-0 translate-y-1 -rotate-90"
											}`}
										/>
									</span>
								</button>
								<button
									type="button"
									onClick={toggleMobileMenu}
									aria-label="Toggle menu"
									className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
								>
									{showMobileMenu ? <X size={18} /> : <Menu size={18} />}
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>

			<AnimatePresence>
				{showMobileMenu && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						className="fixed inset-0 z-40 sm:hidden"
					>
						<div
							className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
							onClick={() => setShowMobileMenu(false)}
						/>
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							className="absolute right-0 top-0 h-full w-full max-w-sm bg-white px-5 py-6 shadow-2xl"
						>
							<div className="flex items-center justify-between">
								<Link
									to="/"
									className="flex items-center"
									onClick={() => setShowMobileMenu(false)}
								>
									<div className="h-11 w-11 overflow-hidden bg-white">
										<img
											src={logoImg}
											alt="Cognira"
											className="h-full w-full object-cover"
										/>
									</div>
								</Link>
								<button
									type="button"
									onClick={() => setShowMobileMenu(false)}
									aria-label="Close menu"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
								>
									<X size={18} />
								</button>
							</div>

							<div className="mt-6 space-y-2">
								{navLinks.map(({ to, label, end }) => (
									<NavLink
										key={to}
										to={to}
										end={end}
										onClick={() => setShowMobileMenu(false)}
										className={({ isActive }) =>
											`flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
												isActive
													? "bg-slate-100 text-slate-900"
													: "text-slate-600 hover:bg-slate-100"
											}`
										}
									>
										<span>{label}</span>
										<ArrowRight className="h-4 w-4 text-slate-300" />
									</NavLink>
								))}
							</div>

							<div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
											Quick Actions
										</p>
										<p className="text-sm font-semibold text-slate-900">
											Manage your experience
										</p>
									</div>
								</div>
								<div className="mt-3 grid grid-cols-2 gap-3">
									<Link
										to="/cart"
										onClick={() => setShowMobileMenu(false)}
										className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-sm"
									>
										<ShoppingCart size={14} />
										Cart (0)
									</Link>
									<button
										type="button"
										onClick={() => setShowMobileAlerts((prev) => !prev)}
										className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-sm"
									>
										<Bell size={14} />
										Alerts ({unreadCount})
									</button>
								</div>
								{showMobileAlerts && (
									<div className="mt-3 space-y-2 rounded-xl bg-white/80 p-3 text-xs text-slate-600">
										{NOTIFICATIONS.map((n) => (
											<div key={n.id} className="flex items-start gap-2">
												<span
													className={`mt-1.5 h-1.5 w-1.5 rounded-full ${
														n.unread ? "bg-indigo-500" : "bg-slate-200"
													}`}
												/>
												<div>
													<p
														className={`text-[11px] ${
															n.unread
																? "font-semibold text-slate-900"
																: "text-slate-600"
														}`}
													>
														{n.title}
													</p>
													<p className="text-[10px] text-slate-400">{n.time}</p>
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							<div className="mt-6">
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
									Theme
								</p>
								<button
									type="button"
									onClick={toggleTheme}
									className="mt-2 flex w-full items-center justify-between rounded-xl border border-slate-100 px-3.5 py-3 text-sm font-semibold text-slate-700"
								>
									<span>{isDark ? "Dark mode" : "Light mode"}</span>
									<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/90 text-white">
										{isDark ? <MoonStar size={16} /> : <SunMedium size={16} />}
									</span>
								</button>
							</div>

							<div className="mt-6">
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
									Account
								</p>
								{isAuthenticated ? (
									<div className="mt-2 space-y-2">
										<button
											type="button"
											className="flex w-full items-center gap-3 rounded-xl border border-slate-100 px-3.5 py-3 text-sm font-semibold text-slate-700"
										>
											<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 text-[11px] font-bold text-white">
												{user?.avatarUrl ? (
													<img
														src={user.avatarUrl}
														alt={user.fullName}
														className="h-full w-full object-cover"
													/>
												) : (
													getInitials(user?.fullName)
												)}
											</span>
											<span className="text-left">
												<span className="block text-sm font-semibold text-slate-900">
													{user?.fullName}
												</span>
												<span className="block text-[11px] text-slate-400">
													{user?.email}
												</span>
											</span>
										</button>
										<Link
											to="/profile"
											onClick={() => setShowMobileMenu(false)}
											className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
										>
											<User size={14} className="text-slate-400" />
											My Profile
										</Link>
										<Link
											to={`/${dashboardRoleSegment}/dashboard`}
											onClick={() => setShowMobileMenu(false)}
											className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
										>
											<BookOpen size={14} className="text-slate-400" />
											My Courses
										</Link>
										{isRoleSwappable && (
											<button
												type="button"
												onClick={handleSwapRole}
												className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
											>
												<Repeat2 size={14} />
												Swap to {isStudentRole ? "Instructor" : "Student"}
											</button>
										)}
										<button
											type="button"
											onClick={() => {
												logout();
												setShowMobileMenu(false);
											}}
											className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
										>
											<LogOut size={14} />
											Sign out
										</button>
									</div>
								) : (
									<div className="mt-2 flex items-center gap-2">
										<Link
											to="/login"
											onClick={() => setShowMobileMenu(false)}
											className="flex-1 rounded-xl border border-slate-200 px-3.5 py-3 text-center text-sm font-semibold text-slate-700"
										>
											Log in
										</Link>
										<Link
											to="/register"
											onClick={() => setShowMobileMenu(false)}
											className="flex-1 rounded-xl bg-slate-900 px-3.5 py-3 text-center text-sm font-semibold text-white"
										>
											Get started
										</Link>
									</div>
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<main>
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="relative border-t border-[var(--footer-border)] bg-[var(--footer-bg)] text-[var(--footer-ink)]">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-[var(--accent)] opacity-10 blur-[90px]" />
					<div className="absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-[var(--accent-3)] opacity-20 blur-[110px]" />
				</div>
				<div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
					<div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr),repeat(4,minmax(0,1fr))]">
						<div className="space-y-5">
							<div className="flex items-center">
								<div className="h-11 w-11 overflow-hidden rounded-2xl border border-[var(--footer-border)] bg-[var(--footer-card)] shadow-[0_10px_30px_rgba(212,90,31,0.12)]">
									<img src={logoImg} alt="Logo" className="h-full w-full object-cover" />
								</div>
							</div>
							<p className="max-w-sm text-sm leading-relaxed text-[var(--footer-muted)]">
								Nền tảng học trực tuyến cho thế hệ builder tiếp theo — tập trung vào trải nghiệm
								hiện đại và nội dung chất lượng cao.
							</p>
							<div className="flex items-center gap-3">
								<a
									href="#"
									aria-label="Twitter"
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--footer-border)] bg-[var(--footer-card)] text-[var(--footer-ink)] opacity-80 transition hover:border-[var(--accent)] hover:opacity-100"
								>
									<Twitter className="h-4 w-4" />
								</a>
								<a
									href="#"
									aria-label="LinkedIn"
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--footer-border)] bg-[var(--footer-card)] text-[var(--footer-ink)] opacity-80 transition hover:border-[var(--accent)] hover:opacity-100"
								>
									<Linkedin className="h-4 w-4" />
								</a>
								<a
									href="#"
									aria-label="YouTube"
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--footer-border)] bg-[var(--footer-card)] text-[var(--footer-ink)] opacity-80 transition hover:border-[var(--accent)] hover:opacity-100"
								>
									<Youtube className="h-4 w-4" />
								</a>
							</div>
							<div className="rounded-2xl border border-[var(--footer-border)] bg-[var(--footer-card)] p-4">
								<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--footer-muted)]">
									Get updates
								</p>
								<p className="mt-2 text-sm text-[var(--footer-ink)]">
									Nhận tin mới về khóa học và sự kiện cộng đồng.
								</p>
								<div className="mt-3 flex flex-col gap-2 sm:flex-row">
									<input
										type="email"
										placeholder="you@email.com"
										className="w-full rounded-xl border border-[var(--footer-border)] bg-transparent px-3 py-2.5 text-sm text-[var(--footer-ink)] placeholder:text-[var(--footer-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
									/>
									<button
										type="button"
										className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#1a120b] shadow-[0_10px_20px_rgba(212,90,31,0.25)] transition hover:opacity-90"
									>
										Subscribe
									</button>
								</div>
							</div>
						</div>

						<div className="space-y-4 text-sm">
							<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--footer-muted)]">
								Sản phẩm
							</p>
							<div className="space-y-2 text-[var(--footer-muted)]">
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Tổng quan
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Pricing
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Lộ trình
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Cho doanh nghiệp
								</a>
							</div>
						</div>

						<div className="space-y-4 text-sm">
							<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--footer-muted)]">
								Học tập
							</p>
							<div className="space-y-2 text-[var(--footer-muted)]">
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Tất cả khóa học
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Blog
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Tài nguyên miễn phí
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Cộng đồng
								</a>
							</div>
						</div>

						<div className="space-y-4 text-sm">
							<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--footer-muted)]">
								Công ty
							</p>
							<div className="space-y-2 text-[var(--footer-muted)]">
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Về chúng tôi
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Tuyển dụng
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Liên hệ
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Press Kit
								</a>
							</div>
						</div>

						<div className="space-y-4 text-sm">
							<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--footer-muted)]">
								Hỗ trợ
							</p>
							<div className="space-y-2 text-[var(--footer-muted)]">
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Help Center
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Trạng thái hệ thống
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Điều khoản
								</a>
								<a href="#" className="block transition-colors hover:text-[var(--footer-ink)]">
									Chính sách bảo mật
								</a>
							</div>
						</div>
					</div>

					<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--footer-border)] pt-5 text-xs text-[var(--footer-muted)] sm:flex-row">
						<p>© {new Date().getFullYear()} LMS. All rights reserved.</p>
						<div className="flex items-center gap-3">
							<button className="rounded-full border border-[var(--footer-border)] bg-[var(--footer-card)] px-3 py-1 text-[11px] text-[var(--footer-muted)] transition hover:text-[var(--footer-ink)]">
								VN · Việt Nam
							</button>
							<button className="text-[11px] text-[var(--footer-muted)] transition hover:text-[var(--footer-ink)]">
								Cookies
							</button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default PublicLayout;
