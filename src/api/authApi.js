import axiosInstance from "./axiosInstance";

export const authApi = {
	register: (data) => axiosInstance.post("/v1/auth/register", data),
	login: (credentials) => axiosInstance.post("/v1/auth/login", credentials),
	logout: () => axiosInstance.post("/v1/auth/logout"),
	refreshToken: () => axiosInstance.post("/v1/auth/refresh-token"),
	getProfile: () => axiosInstance.get("/v1/user"),
	updateProfile: (data) => axiosInstance.put("/v1/user", data),
	updateAvatar: (formData) =>
		axiosInstance.put("/v1/user/avatar", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		}),
	removeAvatarBackground: (formData) =>
		axiosInstance.post("/v1/user/avatar/remove-bg", formData, {
			headers: { "Content-Type": "multipart/form-data" },
			responseType: "blob",
		}),
};
