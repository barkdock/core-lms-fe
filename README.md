# LMS Frontend

Giao diện người dùng cho hệ thống LMS đa vai trò, xây dựng bằng React + Vite, có phân quyền theo `ADMIN`, `TEACHER`, `STUDENT`, hỗ trợ dashboard riêng cho từng vai trò, đăng nhập/đăng ký, danh sách khóa học, giỏ hàng, hồ sơ cá nhân và các khu vực quản trị.

## Tổng quan

Repository này là frontend cho một hệ thống học trực tuyến với các khu vực chính:

- Trang public: home, courses, pricing, teams, resources, profile, cart
- Xác thực: login, register
- Dashboard người dùng: admin, teacher, student
- Bảo vệ route theo vai trò và trạng thái đăng nhập
- Tích hợp dark mode, toast notification, scroll mượt, error boundary và xử lý lỗi toàn cục

## Tính năng chính

- Lazy load cho các trang để giảm tải bundle ban đầu
- Phân quyền route bằng `PrivateRoute` và `RoleBasedGuard`
- Tự động lấy profile khi app khởi động
- Token refresh flow ở tầng axios khi gặp `401`
- Dark mode được sync với Redux state
- Giao diện dashboard có sidebar, navbar và vùng nội dung cuộn riêng
- Form auth dùng `react-hook-form` + `zod`
- Hỗ trợ đăng nhập bằng Google thông qua URL cấu hình từ biến môi trường
- Thông báo toast, xử lý lỗi toàn cục, và fallback page cho lỗi hệ thống

## Tech Stack

- React 18
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis
- React Hook Form
- Zod
- Recharts
- Lucide React

## Yêu cầu môi trường

- Node.js 18+ được khuyến nghị
- npm đi kèm Node.js
- Backend API chạy sẵn, mặc định frontend trỏ tới `http://localhost:8082`

## Cài đặt

1. Cài dependency:

```bash
npm install
```

2. Tạo file môi trường nếu cần tùy chỉnh API:

```bash
.env.local
```

3. Chạy app ở môi trường dev:

```bash
npm run dev
```

4. Build production:

```bash
npm run build
```

5. Preview bản build:

```bash
npm run preview
```

6. Kiểm tra lint:

```bash
npm run lint
```

## Biến môi trường

Frontend dùng các biến sau:

- `VITE_API_URL`: base URL của backend API
- `VITE_GOOGLE_AUTH_URL`: URL đăng nhập Google

Ví dụ:

```env
VITE_API_URL=http://localhost:8082
VITE_GOOGLE_AUTH_URL=http://localhost:8080/api/v1/auth/google
```

Nếu không khai báo, app sẽ dùng giá trị mặc định:

- API: `http://localhost:8082`
- Google auth: `http://localhost:8080/api/v1/auth/google`

## Luồng xác thực

- Login và Register dùng form validation bằng Zod
- Axios instance bật `withCredentials: true`
- Khi backend trả `401`, frontend sẽ thử refresh token qua `/v1/auth/refresh-token`
- Nếu refresh thất bại, request sẽ bị reject để tầng UI xử lý tiếp

## Phân quyền và route

### Public routes

- `/`
- `/courses`
- `/courses/:courseId`
- `/pricing`
- `/teams`
- `/resources`
- `/profile`
- `/cart`
- `/login`
- `/register`
- `/oops`

### Admin routes

- `/admin/dashboard`
- `/admin/courses`
- `/admin/revenue`
- `/admin/orders`
- `/admin/payments`
- `/admin/users`
- `/admin/audit`
- `/admin/approvals`
- `/admin/settings`
- `/admin/banners`

### Teacher routes

- `/teacher/dashboard`
- `/teacher/courses`
- `/teacher/students`
- `/teacher/messages`
- `/teacher/revenue`
- `/teacher/reviews`
- `/teacher/settings`
- `/teacher/create-course`

### Student routes

- `/student/dashboard`
- `/student/courses`
- `/student/explore`
- `/student/certificates`
- `/student/messages`
- `/student/settings`

## Cấu trúc thư mục

```text
src/
  api/          axios instance và các hàm gọi API
  assets/       stylesheet và tài nguyên tĩnh
  components/   UI dùng chung, layout components, admin components
  data/         dữ liệu tĩnh cho public pages
  hooks/        custom hooks cho auth, localStorage, stats
  layouts/      layout cho public, auth và dashboard
  pages/        các page theo từng nhóm vai trò
  routes/       guards cho route
  store/        Redux store và slices
  utils/        constants, formatters, validators
```

## Dữ liệu và state

- Redux store nằm ở `src/store/store.js`
- `auth` quản lý trạng thái đăng nhập, profile, lỗi và loading
- `ui` quản lý dark mode và sidebar state

## Ghi chú triển khai

- App dùng `withCredentials`, nên backend cần cấu hình CORS và cookie/session tương ứng
- Nếu backend đổi endpoint, cập nhật lại `VITE_API_URL` hoặc `VITE_GOOGLE_AUTH_URL`
- Thư mục `dist/` là output build, không nên commit

## Lệnh nhanh

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Nếu m muốn chỉnh tiếp

Có thể mở rộng README thêm các phần sau nếu cần:

- hướng dẫn cấu hình backend chi tiết
- ảnh chụp màn hình giao diện
- tài khoản demo cho từng role
- quy trình deploy lên Vercel/Netlify hoặc server riêng
