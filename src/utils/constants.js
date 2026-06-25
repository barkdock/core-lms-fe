// ─── User Roles ──────────────────────────────────────────────────────────────
export const ROLES = {
	ADMIN: "ADMIN",
	TEACHER: "TEACHER",
	STUDENT: "STUDENT",
};

export const ROLE_HOME = {
	[ROLES.ADMIN]: "/admin/dashboard",
	[ROLES.TEACHER]: "/teacher/dashboard",
	[ROLES.STUDENT]: "/student/dashboard",
};
export const ADMIN_MENU = [
	{
		section: "Overview",
		items: [{ label: "Dashboard", path: "/admin/dashboard", icon: "LayoutDashboard" }],
	},
	{
		section: "Analytics",
		items: [
			{ label: "Courses", path: "/admin/courses", icon: "BookOpen" },
			{ label: "Revenue", path: "/admin/revenue", icon: "DollarSign" },
			{ label: "Orders", path: "/admin/orders", icon: "ShoppingCart" },
			{ label: "Payments", path: "/admin/payments", icon: "CreditCard" },
		],
	},
	{
		section: "Management",
		items: [
			{ label: "Accounts", path: "/admin/users", icon: "Users" },
			{ label: "Approvals", path: "/admin/approvals", icon: "CheckSquare" },
			{ label: "Banners", path: "/admin/banners", icon: "Image" },
		],
	},
	{
		section: "System",
		items: [
			{ label: "Audit Log", path: "/admin/audit", icon: "Shield" },
			{ label: "Settings", path: "/admin/settings", icon: "Settings" },
		],
	},
];

export const TEACHER_MENU = [
	{ label: "Dashboard", path: "/teacher/dashboard", icon: "LayoutDashboard" },
	{ label: "My Courses", path: "/teacher/courses", icon: "BookOpen" },
	{ label: "Students", path: "/teacher/students", icon: "Users" },
	{ label: "Messages", path: "/teacher/messages", icon: "MessageSquare" },
	{ label: "Revenue", path: "/teacher/revenue", icon: "TrendingUp" },
	{ label: "Reviews", path: "/teacher/reviews", icon: "Star" },
	{ label: "Settings", path: "/teacher/settings", icon: "Settings" },
];

export const STUDENT_MENU = [
	{ label: "Dashboard", path: "/student/dashboard", icon: "LayoutDashboard" },
	{ label: "My Courses", path: "/student/courses", icon: "BookOpen" },
	{ label: "Explore", path: "/student/explore", icon: "Compass" },
	{ label: "Certificates", path: "/student/certificates", icon: "Award" },
	{ label: "Messages", path: "/student/messages", icon: "MessageSquare" },
	{ label: "Settings", path: "/student/settings", icon: "Settings" },
];

export const MENU_BY_ROLE = {
	[ROLES.ADMIN]: ADMIN_MENU,
	[ROLES.TEACHER]: TEACHER_MENU,
	[ROLES.STUDENT]: STUDENT_MENU,
};
