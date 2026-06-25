import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { MotionConfig } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

/**
 * DashboardLayout — wraps all authenticated pages.
 * - Manages dark mode class on <html>.
 * - Sidebar is responsive (hidden mobile, visible desktop).
 * - Main content area scrolls independently from the sidebar.
 */
const DashboardLayout = () => {
	const { darkMode, sidebarOpen } = useSelector((state) => state.ui);

	// Sync dark mode class with Redux state on mount
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<MotionConfig reducedMotion="always">
			<div className="admin-lite flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
				{/* Sidebar */}
				<Sidebar />

				{/* Main area: Navbar + scrollable content */}
				<div className="flex-1 flex flex-col overflow-hidden">
					<Navbar />

					{/* Page content */}
					<main
						id="app-scroll-root"
						className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 lg:px-6 lg:py-6"
					>
						<div
							id="app-scroll-content"
							className="content-auto mx-auto w-full max-w-6xl xl:max-w-7xl space-y-6"
						>
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</MotionConfig>
	);
};

export default DashboardLayout;
