import axios from "axios";

let refreshPromise = null;

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8082",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 15000,
});

const refreshClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8082",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 15000,
});

const requestRefreshToken = () => {
	if (!refreshPromise) {
		refreshPromise = refreshClient.post("/v1/auth/refresh-token").finally(() => {
			refreshPromise = null;
		});
	}

	return refreshPromise;
};

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		const originalRequest = error.config || {};
		const requestUrl = originalRequest.url || "";

		// Skip refresh logic for specific routes
		const isAuthRoute =
			requestUrl.includes("/v1/auth/login") ||
			requestUrl.includes("/v1/auth/register") ||
			requestUrl.includes("/v1/auth/refresh-token");

		if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
			originalRequest._retry = true;
			try {
				await requestRefreshToken();
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// Refresh failed OR refresh itself returned error — clear and go to login
				originalRequest._retry = true; // Mark as retried even if failed
				return Promise.reject(refreshError);
			}
		}

		// Normalise error message for consumers
		let message = "Something went wrong";
		if (error.response?.data) {
			const data = error.response.data;
			if (data.error?.message) {
				message = data.error.message; // Handles { error: { message: "Email already exists" } }
			} else if (typeof data.error === "string") {
				message = data.error;
			} else if (data.message) {
				message = data.message;
			}
		} else if (error.message) {
			message = error.message;
		}

		const status = error.response?.status;
		const shouldRouteOops = !status || status >= 500;
		if (shouldRouteOops && typeof window !== "undefined") {
			window.dispatchEvent(
				new CustomEvent("app:oops", {
					detail: { status, message },
				}),
			);
		}

		return Promise.reject(new Error(message));
	},
);

export default axiosInstance;
