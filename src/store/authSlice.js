import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/api/authApi";

// ─── Async Thunks ───────────────────────────────────────────────────────────

export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
	try {
		const data = await authApi.login(credentials);
		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
	try {
		const data = await authApi.register(userData);
		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
	try {
		await authApi.logout();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, { rejectWithValue }) => {
	try {
		const data = await authApi.getProfile();
		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (userData, { rejectWithValue }) => {
	try {
		const data = await authApi.updateProfile(userData);
		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const updateAvatar = createAsyncThunk("auth/updateAvatar", async (formData, { rejectWithValue }) => {
	try {
		const data = await authApi.updateAvatar(formData);
		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const normalizeRole = (payload, userData) => {
	// Try to get role from userData first, then from payload
	const rawRoles = userData?.role || userData?.roles || payload?.role || payload?.roles;
	let role = "STUDENT";

	if (rawRoles) {
		// Handle array or single value
		const firstRole = Array.isArray(rawRoles) ? rawRoles[0] : rawRoles;

		if (typeof firstRole === "string") {
			// Remove ROLE_ prefix if exists and normalize
			role = firstRole.replace("ROLE_", "").toUpperCase();
		} else if (typeof firstRole === "object" && firstRole?.name) {
			role = firstRole.name.replace("ROLE_", "").toUpperCase();
		}
	}

	// Map INSTRUCTOR to TEACHER
	if (role === "INSTRUCTOR") {
		role = "TEACHER";
	}

	if (role === "STUDENT") {
		const identity = (userData?.email || userData?.fullName || userData?.username || "").toLowerCase();
		if (identity.includes("admin")) role = "ADMIN";
		else if (identity.includes("instructor") || identity.includes("teacher")) role = "TEACHER";
	}

	return role;
};

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		isAuthenticated: false,
		isLoading: false,
		isInitializing: true,
		error: null,
	},
	reducers: {
		clearError: (state) => {
			state.error = null;
		},

		setFakeUser: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isLoading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				const userData =
					action.payload.data || action.payload.result || (action.payload.id ? action.payload : {});
				state.user = {
					...userData,
					role: normalizeRole(action.payload, userData),
				};
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});

		// Register
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.isLoading = false;
				// After register, user still needs to login
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});

		// Logout
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.user = null;
			state.isAuthenticated = false;
		});

		// Fetch Profile (on app load)
		builder
			.addCase(fetchProfile.pending, (state) => {
				state.isInitializing = true;
			})
			.addCase(fetchProfile.fulfilled, (state, action) => {
				state.isInitializing = false;
				state.isAuthenticated = true;
				const userData =
					action.payload.data || action.payload.result || (action.payload.id ? action.payload : {});
				state.user = {
					...userData,
					role: normalizeRole(action.payload, userData),
				};
			})
			.addCase(fetchProfile.rejected, (state) => {
				state.isInitializing = false;
				state.isAuthenticated = false;
				state.user = null;
			});

		// Update Profile & Avatar
		builder
			.addMatcher(
				(action) => [updateProfile.fulfilled.type, updateAvatar.fulfilled.type].includes(action.type),
				(state, action) => {
					state.isLoading = false;
					const userData =
						action.payload.data || action.payload.result || (action.payload.id ? action.payload : {});
					state.user = {
						...state.user,
						...userData,
						role: normalizeRole(action.payload, userData),
					};
				},
			)
			.addMatcher(
				(action) => [updateProfile.pending.type, updateAvatar.pending.type].includes(action.type),
				(state) => {
					state.isLoading = true;
					state.error = null;
				},
			)
			.addMatcher(
				(action) => [updateProfile.rejected.type, updateAvatar.rejected.type].includes(action.type),
				(state, action) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			);
	},
});

export const { clearError, setFakeUser } = authSlice.actions;
export default authSlice.reducer;
