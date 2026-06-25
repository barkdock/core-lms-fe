import axiosInstance from './axiosInstance'

export const statsApi = {
  getAdminStats: () => axiosInstance.get('/admin/stats'),
  getTeacherStats: () => axiosInstance.get('/teacher/stats'),
  getStudentStats: () => axiosInstance.get('/student/stats'),
}
