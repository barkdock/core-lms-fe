import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/uiSlice";
import { MENU_BY_ROLE, ROLES } from "@/utils/constants";
import { X } from "lucide-react";

const logoImg = "/logo/logo.png";

const ROLE_BADGES = {
	[ROLES.ADMIN]: {
		label: "Administrator",
		color: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
	},
	[ROLES.TEACHER]: {
		label: "Instructor",
		color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
	},
	[ROLES.STUDENT]: {
		label: "Student",
		color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
	},
};
const FlatMenu = ({ items, location }) => (
	<>
		<p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
			Navigation
		</p>
		{items.map((item) => {
			const Icon = Icons[item.icon] || Icons.Circle;
			const isActive = location.pathname === item.path;
			return (
				<NavLink key={item.path} to={item.path}>
					<div className={`sidebar-link ${isActive ? "active" : ""}`}>
						<Icon size={17} className="flex-shrink-0" />
						<span>{item.label}</span>
						{isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />}
					</div>
				</NavLink>
			);
		})}
	</>
);

/* Render grouped sections (admin) */
const GroupedMenu = ({ groups, location }) => (
	<>
		{groups.map((group, idx) => (
			<div key={group.section} className={idx > 0 ? "mt-4" : ""}>
				<p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
					{group.section}
				</p>
				{group.items.map((item) => {
					const Icon = Icons[item.icon] || Icons.Circle;
					const isActive = location.pathname === item.path;
					return (
						<NavLink key={item.path} to={item.path}>
							<div className={`sidebar-link ${isActive ? "active" : ""}`}>
								<Icon size={17} className="flex-shrink-0" />
								<span>{item.label}</span>
								{isActive && (
									<div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
								)}
							</div>
						</NavLink>
					);
				})}
				{idx < groups.length - 1 && (
					<div className="mt-3 mx-3 border-b border-slate-100 dark:border-slate-800/60" />
				)}
			</div>
		))}
	</>
);

const Sidebar = () => {
	const dispatch = useDispatch();
	const { sidebarOpen } = useSelector((state) => state.ui);
	const { user } = useSelector((state) => state.auth);
	const location = useLocation();

	const menuItems = MENU_BY_ROLE[user?.role] || [];
	const badge = ROLE_BADGES[user?.role];
	const isGrouped = Array.isArray(menuItems) && menuItems[0]?.section;

	return (
		<>
			{/* Overlay for mobile */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-20 bg-black/40 lg:hidden"
					onClick={() => dispatch(toggleSidebar())}
				/>
			)}

			{/* Sidebar panel */}
			<aside
				className={`
          fixed top-0 left-0 z-30 h-full w-64 flex flex-col
          bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
					shadow-md shadow-slate-900/5
					transition-transform duration-150
          lg:sticky lg:shadow-none lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
			>
				{/* Logo */}
				<div className="flex items-center justify-between h-20 px-5 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
					<div className="flex items-center">
						<div className="w-14 h-14 flex-shrink-0 overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
							<img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
						</div>
					</div>
					<button
						onClick={() => dispatch(toggleSidebar())}
						className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<X size={18} />
					</button>
				</div>

				{/* User identity */}
				<div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
							{user?.avatarUrl ? (
								<img
									src={user.avatarUrl}
									alt={user?.fullName}
									className="w-full h-full object-cover"
								/>
							) : (
								user?.fullName?.slice(0, 2).toUpperCase() || "U"
							)}
						</div>
						<div className="min-w-0">
							<p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
								{user?.fullName || "User"}
							</p>
							<span
								className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-semibold rounded-full ${badge?.color}`}
							>
								{badge?.label}
							</span>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
					{isGrouped ? (
						<GroupedMenu groups={menuItems} location={location} />
					) : (
						<FlatMenu items={menuItems} location={location} />
					)}
				</nav>

				{/* Footer */}
				<div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
					<div className="flex items-center justify-center">
						<div className="h-8 w-8 overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
							<img src={logoImg} alt="Logo" className="h-full w-full object-cover" />
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
