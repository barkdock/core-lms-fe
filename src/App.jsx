import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/store/authSlice";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import PublicLayout from "@/layouts/PublicLayout";
import PrivateRoute from "@/routes/PrivateRoute";
import RoleBasedGuard from "@/routes/RoleBasedGuard";
import SmoothScroll from "@/components/SmoothScroll";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import GlobalErrorHandler from "@/components/GlobalErrorHandler";

const Home = lazy(() => import("@/pages/Home"));
const Courses = lazy(() => import("@/pages/Courses"));
const CourseDetails = lazy(() => import("@/pages/CourseDetails"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Teams = lazy(() => import("@/pages/Teams"));
const Resources = lazy(() => import("@/pages/Resources"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Profile = lazy(() => import("@/pages/public/Profile"));
const Cart = lazy(() => import("@/pages/public/Cart"));
const Oops = lazy(() => import("@/pages/Oops"));

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminCourses = lazy(() => import("@/pages/admin/AdminCourses"));
const AdminRevenue = lazy(() => import("@/pages/admin/AdminRevenue"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminPayments = lazy(() => import("@/pages/admin/AdminPayments"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminAuditLog = lazy(() => import("@/pages/admin/AdminAuditLog"));
const AdminApprovals = lazy(() => import("@/pages/admin/AdminApprovals"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminBanners = lazy(() => import("@/pages/admin/AdminBanners"));

const TeacherDashboard = lazy(() => import("@/pages/teacher/TeacherDashboard"));
const TeacherCourses = lazy(() => import("@/pages/teacher/TeacherCourses"));
const TeacherStudents = lazy(() => import("@/pages/teacher/TeacherStudents"));
const TeacherMessages = lazy(() => import("@/pages/teacher/TeacherMessages"));
const TeacherRevenue = lazy(() => import("@/pages/teacher/TeacherRevenue"));
const TeacherReviews = lazy(() => import("@/pages/teacher/TeacherReviews"));
const TeacherSettings = lazy(() => import("@/pages/teacher/TeacherSettings"));
const TeacherCreateCourse = lazy(() => import("@/pages/teacher/TeacherCreateCourse"));

const StudentDashboard = lazy(() => import("@/pages/student/StudentDashboard"));
const StudentCourses = lazy(() => import("@/pages/student/StudentCourses"));
const StudentExplore = lazy(() => import("@/pages/student/StudentExplore"));
const StudentCertificates = lazy(() => import("@/pages/student/StudentCertificates"));
const StudentMessages = lazy(() => import("@/pages/student/StudentMessages"));
const StudentSettings = lazy(() => import("@/pages/student/StudentSettings"));

import { ROLES } from "@/utils/constants";

function App() {
	const dispatch = useDispatch();
	const darkMode = useSelector((state) => state.ui.darkMode);

	useEffect(() => {
		dispatch(fetchProfile());
	}, [dispatch]);

	useEffect(() => {
		const root = document.documentElement;
		if (darkMode) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<Router>
			<AppErrorBoundary>
				<Toaster position="top-right" reverseOrder={false} />
				<GlobalErrorHandler />
				<SmoothScroll>
					<Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
						<Routes>
							<Route element={<PublicLayout />}>
								<Route path="/" element={<Home />} />
								<Route path="/courses" element={<Courses />} />
								<Route path="/courses/:courseId" element={<CourseDetails />} />
								<Route path="/pricing" element={<Pricing />} />
								<Route path="/teams" element={<Teams />} />
								<Route path="/resources" element={<Resources />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/cart" element={<Cart />} />
							</Route>
							<Route path="/oops" element={<Oops />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route
								element={
									<PrivateRoute>
										<DashboardLayout />
									</PrivateRoute>
								}
							>
								<Route
									path="/admin/dashboard"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminDashboard />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/courses"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminCourses />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/revenue"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminRevenue />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/orders"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminOrders />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/payments"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminPayments />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/users"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminUsers />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/audit"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminAuditLog />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/approvals"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminApprovals />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/settings"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminSettings />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/admin/banners"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.ADMIN]}>
											<AdminBanners />
										</RoleBasedGuard>
									}
								/>

								{/* Teacher */}
								<Route
									path="/teacher/dashboard"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.TEACHER]}>
											<TeacherDashboard />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/teacher/courses"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.TEACHER]}>
											<TeacherCourses />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/teacher/students"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.TEACHER]}>
											<TeacherStudents />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/teacher/messages"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.TEACHER]}>
											<TeacherMessages />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/teacher/revenue"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.TEACHER]}>
											<TeacherRevenue />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/teacher/reviews"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.TEACHER]}>
											<TeacherReviews />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/teacher/settings"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.TEACHER]}>
											<TeacherSettings />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/teacher/create-course"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.TEACHER]}>
											<TeacherCreateCourse />
										</RoleBasedGuard>
									}
								/>

								{/* Student */}
								<Route
									path="/student/dashboard"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.STUDENT]}>
											<StudentDashboard />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/student/courses"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.STUDENT]}>
											<StudentCourses />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/student/explore"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.STUDENT]}>
											<StudentExplore />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/student/certificates"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.STUDENT]}>
											<StudentCertificates />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/student/messages"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.STUDENT]}>
											<StudentMessages />
										</RoleBasedGuard>
									}
								/>
								<Route
									path="/student/settings"
									element={
										<RoleBasedGuard allowedRoles={[ROLES.STUDENT]}>
											<StudentSettings />
										</RoleBasedGuard>
									}
								/>

								<Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
								<Route
									path="/teacher/*"
									element={<Navigate to="/teacher/dashboard" replace />}
								/>
								<Route
									path="/student/*"
									element={<Navigate to="/student/dashboard" replace />}
								/>
							</Route>

							{/* ── Fallback ───────────────────────────────────────────── */}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</Suspense>
				</SmoothScroll>
			</AppErrorBoundary>
		</Router>
	);
}

export default App;
