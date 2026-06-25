import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logoutUser, setFakeUser } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE_HOME, ROLES } from "@/utils/constants";

export const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isAuthenticated, isLoading, isInitializing, error } = useSelector((state) => state.auth);

	const login = useCallback(
		async (credentials) => {
			const result = await dispatch(loginUser(credentials));
			if (loginUser.fulfilled.match(result)) {
				// Get the normalized role from the result payload
				const userData = result.payload.data || result.payload.result || {};
				const userRole = userData.role || result.payload.role || "STUDENT";

				// Map INSTRUCTOR to TEACHER for navigation
				let role = Array.isArray(userRole) ? userRole[0] : userRole;
				if (typeof role === "string") {
					role = role.replace("ROLE_", "").toUpperCase();
				}
				if (role === "INSTRUCTOR") {
					role = "TEACHER";
				}

				// Navigate based on role
				if (role === ROLES.STUDENT) {
					navigate("/");
				} else {
					navigate(ROLE_HOME[role] || "/");
				}

				// Force refresh to ensure avatar and all states are fresh
				setTimeout(() => {
					window.location.reload();
				}, 100);
			}
			return result;
		},
		[dispatch, navigate],
	);

	const register = useCallback(
		async (userData) => {
			const result = await dispatch(registerUser(userData));
			if (registerUser.fulfilled.match(result)) {
				navigate("/login?registered=true");
			}
			return result;
		},
		[dispatch, navigate],
	);

	const logout = useCallback(async () => {
		await dispatch(logoutUser());
		navigate("/login");
	}, [dispatch, navigate]);

	return {
		user,
		isAuthenticated,
		isLoading,
		isInitializing,
		error,
		login,
		register,
		logout,
	};
};
