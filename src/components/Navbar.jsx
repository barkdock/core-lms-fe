import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Search, Bell, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { toggleSidebar, toggleDarkMode } from "@/store/uiSlice";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/utils/formatters";

const NOTIFICATIONS = [
	{ id: 1, title: "New course approved", time: "2m ago", unread: true },
	{ id: 2, title: "John enrolled in React Advanced", time: "15m ago", unread: true },
	{ id: 3, title: "Monthly report ready", time: "1h ago", unread: false },
];

const Navbar = () => {
	const dispatch = useDispatch();
	const { user, logout } = useAuth();
	const { darkMode } = useSelector((state) => state.ui);

	const [showProfile, setShowProfile] = useState(false);
	const [showNotif, setShowNotif] = useState(false);
	const [search, setSearch] = useState("");

	const profileRef = useRef(null);
	const notifRef = useRef(null);

	const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handler = (e) => {
			if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
			if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<header
			className="sticky top-0 z-10 h-16 flex items-center px-4 lg:px-6 gap-3
      bg-white dark:bg-slate-900
      border-b border-slate-200 dark:border-slate-800
    "
		>
			{/* Hamburger */}
			<button
				onClick={() => dispatch(toggleSidebar())}
				className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-100
					hover:bg-slate-100 dark:hover:bg-slate-800"
				aria-label="Toggle sidebar"
			>
				<Menu size={20} />
			</button>

			{/* Search */}
			<div className="relative flex-1 max-w-md hidden sm:block">
				<Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
				<input
					type="text"
					placeholder="Search courses, students…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full pl-9 pr-4 py-2 text-sm rounded-full
            bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100
            placeholder-slate-400 border border-transparent
						focus:outline-none focus:border-primary-400 focus:bg-white dark:focus:bg-slate-700"
				/>
			</div>

			<div className="ml-auto flex items-center gap-1.5">
				{/* Dark mode toggle */}
				<button
					onClick={() => dispatch(toggleDarkMode())}
					className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-100
						hover:bg-slate-100 dark:hover:bg-slate-800"
					aria-label="Toggle dark mode"
				>
					{darkMode ? <Sun size={18} /> : <Moon size={18} />}
				</button>

				{/* Notifications */}
				<div className="relative" ref={notifRef}>
					<button
						onClick={() => {
							setShowNotif((v) => !v);
							setShowProfile(false);
						}}
						className="relative p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-100
							hover:bg-slate-100 dark:hover:bg-slate-800"
						aria-label="Notifications"
					>
						<Bell size={18} />
						{unreadCount > 0 && (
							<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
						)}
					</button>

					{showNotif && (
						<div className="absolute right-0 mt-2 w-80 card overflow-hidden">
							<div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
								<h3 className="text-sm font-semibold text-slate-900 dark:text-white">
									Notifications
								</h3>
								<span className="text-xs font-semibold text-primary-600 cursor-pointer hover:underline">
									Mark all read
								</span>
							</div>
							<div className="divide-y divide-slate-100 dark:divide-slate-800">
								{NOTIFICATIONS.map((n) => (
									<div
										key={n.id}
										className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50
                    ${n.unread ? "bg-primary-50/40 dark:bg-primary-900/10" : ""}`}
									>
										<div className="flex items-start gap-3">
											<div
												className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
													n.unread ? "bg-primary-500" : "bg-transparent"
												}`}
											/>
											<div>
												<p className="text-sm text-slate-800 dark:text-slate-200">
													{n.title}
												</p>
												<p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Profile dropdown */}
				<div className="relative" ref={profileRef}>
					<button
						onClick={() => {
							setShowProfile((v) => !v);
							setShowNotif(false);
						}}
						className="flex items-center justify-center p-0.5 rounded-full
							hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
					>
						<div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
							{user?.avatarUrl ? (
								<img
									src={user.avatarUrl}
									alt={user.fullName}
									className="w-full h-full object-cover"
								/>
							) : (
								getInitials(user?.fullName)
							)}
						</div>
					</button>

					{showProfile && (
						<div className="absolute right-0 mt-2 w-52 card overflow-hidden">
							<div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
								<p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
									{user?.fullName}
								</p>
								<p className="text-xs text-slate-500 truncate">{user?.email}</p>
							</div>
							<div className="py-1">
								{(() => {
									const role = (user?.role || "STUDENT").toLowerCase();
									const items = [
										{ icon: User, label: "My Profile", path: "/profile" },
										{ icon: Settings, label: "Settings", path: `/${role}/settings` },
									];
									return items.map(({ icon: Icon, label, path }) => (
										<Link
											key={label}
											to={path}
											onClick={() => setShowProfile(false)}
											className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left"
										>
											<Icon size={15} className="text-slate-400" />
											{label}
										</Link>
									));
								})()}
								<div className="my-1 border-t border-slate-100 dark:border-slate-800" />
								<button
									onClick={logout}
									className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400
										hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
								>
									<LogOut size={15} />
									Sign Out
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
