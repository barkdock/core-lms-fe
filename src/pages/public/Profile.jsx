import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updateAvatar } from "@/store/authSlice";
import { authApi } from "@/api/authApi";
import {
	Mail,
	Phone,
	Calendar,
	Briefcase,
	LayoutDashboard,
	User,
	Camera,
	Sparkles,
	Edit2,
	X,
	MapPin,
	Loader2,
	CheckCircle2,
	ImagePlus,
	Wand2,
	RefreshCw,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { getInitials } from "@/utils/formatters";
import { toast } from "react-hot-toast";

/* ── Inline keyframes injected once ────────────────────────────────────────── */
const scanStyleId = "avatar-scan-styles";
if (typeof document !== "undefined" && !document.getElementById(scanStyleId)) {
	const style = document.createElement("style");
	style.id = scanStyleId;
	style.textContent = `
		@keyframes scanWipe {
			0%   { left: -6%; }
			50%  { left: 106%; }
			100% { left: -6%; }
		}
		@keyframes holoPulse {
			0%, 100% { opacity: 0.08; filter: hue-rotate(0deg); }
			50%      { opacity: 0.22; filter: hue-rotate(40deg); }
		}
		@keyframes floatUp {
			0%   { transform: translateY(0) scale(1); opacity: 0.7; }
			100% { transform: translateY(-60px) scale(0.3); opacity: 0; }
		}
		@keyframes ripple {
			0%   { transform: scale(0.8); opacity: 0.5; }
			100% { transform: scale(2.5); opacity: 0; }
		}
		@keyframes shimmer {
			0%   { background-position: -200% 0; }
			100% { background-position: 200% 0; }
		}
		@keyframes glowLine {
			0%, 100% { box-shadow: 0 0 8px 2px rgba(129,140,248,0.4); }
			50%      { box-shadow: 0 0 20px 6px rgba(129,140,248,0.8), 0 0 40px 10px rgba(99,102,241,0.3); }
		}
		.scan-wipe-line {
			animation: scanWipe 2.2s ease-in-out infinite, glowLine 1.1s ease-in-out infinite;
		}
		.holo-overlay {
			background: linear-gradient(
				135deg,
				rgba(129,140,248,0.1) 0%,
				rgba(99,102,241,0.05) 25%,
				rgba(168,85,247,0.1) 50%,
				rgba(56,189,248,0.08) 75%,
				rgba(129,140,248,0.1) 100%
			);
			animation: holoPulse 2.6s ease-in-out infinite;
		}
		.shimmer-bar {
			background: linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%);
			background-size: 200% 100%;
			animation: shimmer 1.8s ease-in-out infinite;
		}
	`;
	document.head.appendChild(style);
}

/* ── Particle component for dissolution effect ─────────────────────────────── */
function DissolvingParticles() {
	const particles = Array.from({ length: 24 }, (_, i) => ({
		id: i,
		left: `${5 + Math.random() * 90}%`,
		top: `${10 + Math.random() * 80}%`,
		delay: Math.random() * 2,
		duration: 1.5 + Math.random() * 1.5,
		size: 2 + Math.random() * 4,
		color: [
			"rgba(129,140,248,0.8)",
			"rgba(168,85,247,0.7)",
			"rgba(56,189,248,0.7)",
			"rgba(244,114,182,0.6)",
			"rgba(99,102,241,0.8)",
		][Math.floor(Math.random() * 5)],
	}));

	return (
		<div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
			{particles.map((p) => (
				<motion.div
					key={p.id}
					className="absolute rounded-full"
					style={{
						left: p.left,
						top: p.top,
						width: p.size,
						height: p.size,
						backgroundColor: p.color,
					}}
					animate={{
						y: [0, -(40 + Math.random() * 40)],
						x: [0, (Math.random() - 0.5) * 30],
						opacity: [0, 0.9, 0],
						scale: [0.5, 1.2, 0.2],
					}}
					transition={{
						duration: p.duration,
						delay: p.delay,
						repeat: Infinity,
						ease: "easeOut",
					}}
				/>
			))}
		</div>
	);
}

/* ── Ripple rings emanating from center ────────────────────────────────────── */
function RippleRings() {
	return (
		<div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
			{[0, 0.6, 1.2].map((delay, i) => (
				<motion.div
					key={i}
					className="absolute rounded-full border border-indigo-400/30"
					style={{ width: 80, height: 80 }}
					animate={{
						scale: [0.8, 3],
						opacity: [0.5, 0],
					}}
					transition={{
						duration: 2.4,
						delay,
						repeat: Infinity,
						ease: "easeOut",
					}}
				/>
			))}
		</div>
	);
}

function Profile() {
	const { user } = useAuth();
	const { isLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileInputRef = useRef(null);
	const changeFileInputRef = useRef(null);

	const { isInitializing } = useSelector((state) => state.auth);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		phone: "",
		bio: "",
		address: "",
	});

	const [isSuccess, setIsSuccess] = useState(false);
	const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
	const [avatarFile, setAvatarFile] = useState(null);
	const [avatarPreviewUrl, setAvatarPreviewUrl] = useState("");
	const [removedPreviewUrl, setRemovedPreviewUrl] = useState("");
	const [removedBlob, setRemovedBlob] = useState(null);
	const [selectedAvatarVariant, setSelectedAvatarVariant] = useState("original");
	const [isRemovingBg, setIsRemovingBg] = useState(false);
	const maxAvatarBytes = 50 * 1024 * 1024;
	const maxAvatarDimension = 4096;

	// Sync formData when user loads
	useEffect(() => {
		if (user) {
			setFormData({
				fullName: user.fullName || "",
				phone: user.phone || "",
				bio: user.bio || "",
				address: user.address || "",
			});
		}
	}, [user]);

	useEffect(() => {
		return () => {
			if (avatarPreviewUrl) {
				URL.revokeObjectURL(avatarPreviewUrl);
			}
		};
	}, [avatarPreviewUrl]);

	useEffect(() => {
		return () => {
			if (removedPreviewUrl) {
				URL.revokeObjectURL(removedPreviewUrl);
			}
		};
	}, [removedPreviewUrl]);

	if (isInitializing) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<Loader2 className="animate-spin text-indigo-500" size={40} />
			</div>
		);
	}

	if (!user) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
				<User className="text-slate-300" size={60} />
				<p className="text-slate-500 font-medium">Please login to view your profile</p>
				<Link to="/login" className="btn-primary px-8 py-3 rounded-2xl">
					Sign In
				</Link>
			</div>
		);
	}

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const convertToPng = async (file) => {
		if (file.type === "image/png") {
			return file;
		}

		const objectUrl = URL.createObjectURL(file);
		try {
			const img = await new Promise((resolve, reject) => {
				const image = new Image();
				image.onload = () => resolve(image);
				image.onerror = () => reject(new Error("Cannot read image"));
				image.src = objectUrl;
			});

			const naturalWidth = img.naturalWidth || img.width;
			const naturalHeight = img.naturalHeight || img.height;
			const scale =
				Math.max(naturalWidth, naturalHeight) > maxAvatarDimension
					? maxAvatarDimension / Math.max(naturalWidth, naturalHeight)
					: 1;
			const targetWidth = Math.max(1, Math.round(naturalWidth * scale));
			const targetHeight = Math.max(1, Math.round(naturalHeight * scale));

			const canvas = document.createElement("canvas");
			canvas.width = targetWidth;
			canvas.height = targetHeight;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				throw new Error("Canvas not supported");
			}
			ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

			const blob = await new Promise((resolve, reject) => {
				canvas.toBlob((result) => {
					if (!result) {
						reject(new Error("Convert failed"));
						return;
					}
					resolve(result);
				}, "image/png");
			});

			const baseName = file.name ? file.name.replace(/\.[^/.]+$/, "") : "avatar";
			return new File([blob], `${baseName}.png`, { type: "image/png" });
		} finally {
			URL.revokeObjectURL(objectUrl);
		}
	};

	const resetAvatarModal = () => {
		setIsAvatarModalOpen(false);
		setAvatarFile(null);
		setAvatarPreviewUrl("");
		setRemovedPreviewUrl("");
		setRemovedBlob(null);
		setSelectedAvatarVariant("original");
		setIsRemovingBg(false);
	};

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > maxAvatarBytes) {
			toast.error("Image is too large (max 50MB).");
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
			return;
		}

		setAvatarFile(file);
		setAvatarPreviewUrl(URL.createObjectURL(file));
		setRemovedPreviewUrl("");
		setRemovedBlob(null);
		setSelectedAvatarVariant("original");
		setIsAvatarModalOpen(true);

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	/* ── Change image while modal is open ──────────────────────────────────── */
	const handleChangeImage = () => {
		changeFileInputRef.current?.click();
	};

	const handleChangeFileSelected = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > maxAvatarBytes) {
			toast.error("Image is too large (max 50MB).");
			if (changeFileInputRef.current) changeFileInputRef.current.value = "";
			return;
		}

		// Reset previous results
		if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
		if (removedPreviewUrl) URL.revokeObjectURL(removedPreviewUrl);

		setAvatarFile(file);
		setAvatarPreviewUrl(URL.createObjectURL(file));
		setRemovedPreviewUrl("");
		setRemovedBlob(null);
		setSelectedAvatarVariant("original");
		setIsRemovingBg(false);

		if (changeFileInputRef.current) changeFileInputRef.current.value = "";
	};

	const handleRemoveBackground = async () => {
		if (!avatarFile || isRemovingBg) return;

		try {
			setIsRemovingBg(true);
			const normalizedFile = await convertToPng(avatarFile);
			const data = new FormData();
			data.append("file", normalizedFile);
			const blob = await authApi.removeAvatarBackground(data);
			const normalizedBlob = blob instanceof Blob ? blob : new Blob([blob], { type: "image/png" });
			setRemovedBlob(normalizedBlob);
			setRemovedPreviewUrl(URL.createObjectURL(normalizedBlob));
			setSelectedAvatarVariant("removed");
		} catch (error) {
			toast.error(error?.message || "Couldn't read the image. Try PNG or JPG.");
		} finally {
			setIsRemovingBg(false);
		}
	};

	const handleAvatarUpdate = async () => {
		if (!avatarFile || isLoading) return;

		const data = new FormData();
		if (selectedAvatarVariant === "removed" && removedBlob) {
			const baseName = avatarFile.name ? avatarFile.name.replace(/\.[^/.]+$/, "") : "avatar";
			const fileName = `${baseName}-no-bg.png`;
			const fileToUpload = new File([removedBlob], fileName, { type: "image/png" });
			data.append("file", fileToUpload);
		} else {
			data.append("file", avatarFile);
		}

		try {
			await dispatch(updateAvatar(data)).unwrap();
			toast.success("Avatar updated successfully!");
			resetAvatarModal();
		} catch (error) {
			toast.error(error || "Failed to update avatar");
		}
	};

	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		try {
			await dispatch(updateProfile(formData)).unwrap();
			setIsSuccess(true);
			setTimeout(() => {
				setIsSuccess(false);
				setIsEditModalOpen(false);
			}, 1500);
		} catch (error) {
			toast.error(error || "Failed to update profile");
		}
	};

	const safeJoinDate = (dateStr) => {
		try {
			const date = dateStr ? new Date(dateStr) : new Date();
			return isNaN(date.getTime())
				? "N/A"
				: date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
		} catch (e) {
			return "N/A";
		}
	};

	return (
		<div className="min-h-[80vh] py-12 px-4 relative">
			<div className="max-w-4xl mx-auto">
				{/* Header/Cover Section */}
				<div className="relative mb-24">
					<div className="h-48 w-full rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg" />

					<div className="absolute -bottom-16 left-8 flex items-end gap-6">
						<div className="relative group">
							<motion.div
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								className="w-32 h-32 rounded-3xl border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center text-3xl font-bold text-slate-700"
							>
								{user?.avatarUrl ? (
									<img
										src={user.avatarUrl}
										alt={user.fullName || "User"}
										className="w-full h-full object-cover"
									/>
								) : (
									getInitials(user?.fullName)
								)}
							</motion.div>

							<button
								onClick={handleAvatarClick}
								disabled={isLoading}
								className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
							>
								{isLoading ? <Loader2 className="animate-spin" /> : <Camera size={24} />}
							</button>
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileChange}
								className="hidden"
								accept="image/*"
							/>
						</div>

						<div className="mb-2 flex-1">
							<div className="flex items-center gap-4">
								<motion.h1
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									className="text-3xl font-extrabold text-slate-900 dark:text-white"
								>
									{user?.fullName || "User"}
								</motion.h1>
								<button
									onClick={() => setIsEditModalOpen(true)}
									className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 transition-colors"
								>
									<Edit2 size={16} />
								</button>
							</div>
							<p className="text-slate-500 dark:text-slate-400 font-medium">
								{user?.role ||
									(Array.isArray(user?.roles) ? user.roles[0] : "Member") ||
									"Member"}
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Left Column: Info Cards */}
					<div className="md:col-span-2 space-y-6">
						<section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
							<h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
								<User className="text-indigo-500" size={20} />
								About Me
							</h2>
							<p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
								{user?.bio || "No bio available yet. Tell us more about yourself!"}
							</p>
						</section>

						<section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
							<h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
								Contact Information
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<div className="flex items-center gap-4 group">
									<div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
										<Mail size={18} />
									</div>
									<div className="min-w-0">
										<p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
											Email Address
										</p>
										<p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
											{user?.email}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-4 group">
									<div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
										<Phone size={18} />
									</div>
									<div>
										<p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
											Phone
										</p>
										<p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
											{user?.phone || "Not provided"}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-4 group">
									<div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
										<MapPin size={18} />
									</div>
									<div>
										<p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
											Address
										</p>
										<p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
											{user?.address || "Not provided"}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-4 group">
									<div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
										<Calendar size={18} />
									</div>
									<div>
										<p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
											Joined Date
										</p>
										<p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
											{safeJoinDate(user?.createdAt)}
										</p>
									</div>
								</div>
							</div>
						</section>
					</div>

					{/* Right Column: Actions */}
					<div className="space-y-6">
						<div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200/50 dark:shadow-none">
							<h3 className="text-lg font-bold mb-3">Management</h3>
							<p className="text-slate-400 text-sm mb-6">
								Access your personalized dashboard to view learning statistics and manage your
								courses.
							</p>
							<Link
								to={`/${(
									user.role || (Array.isArray(user.roles) ? user.roles[0] : "student")
								).toLowerCase()}/dashboard`}
								className="w-full py-3 px-6 rounded-xl bg-white text-slate-900 font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all active:scale-95 shadow-lg shadow-white/10"
							>
								<LayoutDashboard size={18} />
								Go to Dashboard
							</Link>
						</div>

						<div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm text-center">
							<p className="text-slate-400 text-xs mb-1 uppercase tracking-widest font-bold">
								Member Since
							</p>
							<p className="text-slate-900 dark:text-white font-bold">
								{user?.createdAt ? new Date(user.createdAt).getFullYear() || "2024" : "2024"}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* ═══════════════════════════════════════════════════════════════════
			    AVATAR MODAL — Redesigned with scanning effects
			    ═══════════════════════════════════════════════════════════════════ */}
			<AnimatePresence>
				{isAvatarModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => !(isLoading || isRemovingBg) && resetAvatarModal()}
							className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
						/>

						{/* Hidden input for changing image while modal is open */}
						<input
							type="file"
							ref={changeFileInputRef}
							onChange={handleChangeFileSelected}
							className="hidden"
							accept="image/*"
						/>

						<motion.div
							initial={{ scale: 0.92, opacity: 0, y: 30 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.92, opacity: 0, y: 30 }}
							transition={{ type: "spring", stiffness: 350, damping: 30 }}
							className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800"
						>
							{/* Top accent bar */}
							<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400" />

							{/* ── Modal Header ── */}
							<div className="p-5 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
										<Wand2 size={16} className="text-white" />
									</div>
									<div>
										<h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
											Update Avatar
										</h3>
										<p className="text-xs text-slate-400 mt-0.5">Remove & update your avatar</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									{/* Change Image button */}
									<button
										onClick={handleChangeImage}
										disabled={isRemovingBg || isLoading}
										className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-indigo-300 transition-all disabled:opacity-40 disabled:pointer-events-none"
										title="Choose a different image"
									>
										<ImagePlus size={14} />
										<span className="hidden sm:inline">Change image</span>
									</button>
									<button
										onClick={resetAvatarModal}
										disabled={isLoading || isRemovingBg}
										className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
									>
										<X size={18} />
									</button>
								</div>
							</div>

							{/* ── Modal Body ── */}
							<div className="p-5 space-y-5">
								{/* Tip banner */}
								<div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-50 via-violet-50/60 to-indigo-50 dark:from-indigo-950/40 dark:via-violet-950/30 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 px-4 py-3">
									<Sparkles size={16} className="text-indigo-500 flex-shrink-0" />
									<p className="text-[13px] text-indigo-700 dark:text-indigo-300 leading-snug">
										Click <strong>Remove background</strong> to get a clean cutout, or keep the original.
									</p>
									<span className="ml-auto rounded-md bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider flex-shrink-0">
										PNG
									</span>
								</div>

								{/* ═══ Image Display Area — always 2-column, scan effects on Source card ═══ */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{/* ── Source card (with inline scan overlay when processing) ── */}
									<button
										type="button"
										onClick={() => !isRemovingBg && setSelectedAvatarVariant("original")}
										className={`relative rounded-2xl border-2 overflow-hidden text-left transition-all duration-300 shadow-sm group ${
											isRemovingBg
												? "border-indigo-400/60 ring-2 ring-indigo-100 cursor-default"
												: selectedAvatarVariant === "original"
												? "border-indigo-500 ring-2 ring-indigo-100 shadow-indigo-500/10 hover:shadow-lg"
												: "border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:shadow-lg"
										}`}
									>
										<div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
											{avatarPreviewUrl ? (
												<img
													src={avatarPreviewUrl}
													alt="Original"
													className={`w-full h-full object-cover transition-all duration-500 ${
														isRemovingBg ? "" : "group-hover:scale-105"
													}`}
												/>
											) : (
												<div className="flex items-center justify-center h-full text-slate-400 text-sm">No preview</div>
											)}

											{/* ─── Inline scan effects (only when processing) ─── */}
											<AnimatePresence>
												{isRemovingBg && (
													<motion.div
														className="absolute inset-0 z-10"
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														transition={{ duration: 0.3 }}
													>
														{/* ── Checkerboard eraser mask: sweeps left→right, reveals transparency ── */}
														<motion.div
															className="absolute inset-0 pointer-events-none z-10"
															style={{
																background: "repeating-conic-gradient(rgba(241,245,249,0.55) 0% 25%, rgba(255,255,255,0.55) 0% 50%) 50% / 12px 12px",
																maskImage: "linear-gradient(90deg, black var(--pct, 0%), transparent var(--pct, 0%))",
																WebkitMaskImage: "linear-gradient(90deg, black var(--pct, 0%), transparent var(--pct, 0%))",
															}}
															animate={{ "--pct": ["0%", "60%", "30%", "80%", "50%", "100%"] }}
															transition={{ duration: 8, ease: "easeInOut", times: [0, 0.25, 0.4, 0.65, 0.8, 1] }}
														/>

														{/* ── Glowing eraser edge line that follows the wipe front ── */}
														<motion.div
															className="absolute top-0 bottom-0 w-[3px] pointer-events-none z-20"
															style={{ background: "linear-gradient(180deg, transparent 0%, rgba(99,102,241,1) 30%, rgba(168,85,247,1) 70%, transparent 100%)", filter: "blur(1px) drop-shadow(0 0 6px rgba(99,102,241,0.9))" }}
															animate={{ left: ["0%", "60%", "30%", "80%", "50%", "100%"] }}
															transition={{ duration: 8, ease: "easeInOut", times: [0, 0.25, 0.4, 0.65, 0.8, 1] }}
														/>

														{/* ── Glitch colour flashes ── */}
														<motion.div
															className="absolute inset-0 pointer-events-none z-15 mix-blend-screen"
															animate={{
																background: [
																	"rgba(99,102,241,0)",
																	"rgba(99,102,241,0.12)",
																	"rgba(168,85,247,0)",
																	"rgba(56,189,248,0.10)",
																	"rgba(99,102,241,0)",
																],
															}}
															transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
														/>

														{/* ── Corner brackets ── */}
														{["top-2 left-2 border-l-2 border-t-2", "top-2 right-2 border-r-2 border-t-2", "bottom-2 left-2 border-l-2 border-b-2", "bottom-2 right-2 border-r-2 border-b-2"].map((cls, i) => (
															<motion.div
																key={i}
																className={`absolute w-5 h-5 border-indigo-500/80 z-20 ${cls}`}
																initial={{ opacity: 0, scale: 0.4 }}
																animate={{ opacity: [0, 1, 0.6, 1], scale: 1 }}
																transition={{ delay: 0.08 * i, duration: 0.4 }}
															/>
														))}

														{/* ── Floating pixel dots ── */}
														<DissolvingParticles />

														{/* ── Processing badge (top-centre) ── */}
														<motion.div
															className="absolute z-30 top-2.5 left-1/2 -translate-x-1/2"
															initial={{ y: -8, opacity: 0 }}
															animate={{ y: 0, opacity: 1 }}
															transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 22 }}
														>
															<div className="flex items-center gap-1.5 rounded-full bg-slate-900/90 backdrop-blur-md px-3 py-1.5 border border-indigo-500/40 shadow-lg shadow-indigo-500/20">
																<motion.span
																	className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400"
																	animate={{ scale: [1, 1.8, 1], opacity: [1, 0.2, 1] }}
																	transition={{ duration: 0.9, repeat: Infinity }}
																/>
																<span className="text-[11px] font-bold text-white tracking-wide">Erasing background</span>
															</div>
														</motion.div>
													</motion.div>
												)}
											</AnimatePresence>

											<span className="absolute left-2.5 top-2.5 z-40 rounded-lg bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-slate-600 shadow-sm border border-slate-200/50">
												Source
											</span>
											{!isRemovingBg && (
												<div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
											)}
										</div>
										<div className="px-3.5 py-2.5 flex items-center justify-between bg-white dark:bg-slate-900">
											<span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Original</span>
											{selectedAvatarVariant === "original" && !isRemovingBg && (
												<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
													<CheckCircle2 className="text-indigo-500" size={17} />
												</motion.div>
											)}
											{isRemovingBg && (
												<Loader2 className="animate-spin text-indigo-400" size={15} />
											)}
										</div>
									</button>

									{/* ── Cutout card ── */}
									<button
										type="button"
										disabled={!removedPreviewUrl || isRemovingBg}
										onClick={() => removedPreviewUrl && !isRemovingBg && setSelectedAvatarVariant("removed")}
										className={`relative rounded-2xl border-2 overflow-hidden text-left transition-all duration-300 shadow-sm hover:shadow-lg group ${
											selectedAvatarVariant === "removed"
												? "border-indigo-500 ring-2 ring-indigo-100 shadow-indigo-500/10"
												: "border-slate-200 dark:border-slate-700 hover:border-indigo-300"
										} ${!removedPreviewUrl || isRemovingBg ? "opacity-50 cursor-not-allowed" : ""}`}
									>
										<div
											className="aspect-square relative overflow-hidden"
											style={removedPreviewUrl ? {} : { background: "repeating-conic-gradient(#f1f5f9 0% 25%, #fff 0% 50%) 50% / 18px 18px" }}
										>
											{removedPreviewUrl ? (
												<motion.div
													className="w-full h-full relative"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ duration: 0.5 }}
												>
													<div
														className="absolute inset-0"
														style={{ background: "repeating-conic-gradient(#f1f5f9 0% 25%, #fff 0% 50%) 50% / 14px 14px" }}
													/>
													<motion.img
														key={removedPreviewUrl}
														src={removedPreviewUrl}
														alt="Cutout"
														className="relative z-10 w-full h-full object-cover"
														initial={{ opacity: 0, scale: 1.08, filter: "blur(12px) saturate(0.3)" }}
														animate={{ opacity: 1, scale: 1, filter: "blur(0px) saturate(1)" }}
														transition={{ duration: 1, ease: [0.22, 0.68, 0, 1] }}
													/>
													<motion.div
														className="absolute inset-0 z-20 bg-white"
														initial={{ opacity: 0.6 }}
														animate={{ opacity: 0 }}
														transition={{ duration: 0.6 }}
													/>
												</motion.div>
											) : (
												<div className="flex flex-col items-center justify-center h-full gap-2 text-slate-400">
													<div className="relative">
														<Sparkles size={22} className="text-slate-300" />
														<motion.div
															className="absolute -inset-3 rounded-full border-2 border-dashed border-slate-200/70"
															animate={{ rotate: 360 }}
															transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
														/>
													</div>
													<span className="text-xs font-medium">Ready for removal</span>
												</div>
											)}
											<span className="absolute left-2.5 top-2.5 z-30 rounded-lg bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-slate-600 shadow-sm border border-slate-200/50">
												Cutout
											</span>
										</div>
										<div className="px-3.5 py-2.5 flex items-center justify-between bg-white dark:bg-slate-900">
											<span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Background removed</span>
											{selectedAvatarVariant === "removed" && !isRemovingBg && (
												<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
													<CheckCircle2 className="text-indigo-500" size={17} />
												</motion.div>
											)}
										</div>
									</button>
								</div>

								{/* Slim progress bar — below cards, visible while processing */}
								<AnimatePresence>
									{isRemovingBg && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.25 }}
											className="overflow-hidden"
										>
											<div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5">
												<div className="flex items-center gap-1.5">
													<Loader2 className="animate-spin" size={12} />
													Removing background…
												</div>
												<motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
													Please wait
												</motion.span>
											</div>
											<div className="relative h-1 w-full rounded-full bg-slate-100 overflow-hidden">
												<motion.div
													className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400"
													initial={{ width: "0%" }}
													animate={{ width: "90%" }}
													transition={{ duration: 12, ease: [0.1, 0.4, 0.2, 1] }}
												/>
												<div className="shimmer-bar absolute inset-0 rounded-full" />
											</div>
										</motion.div>
									)}
								</AnimatePresence>

								{/* ═══ Action Buttons ═══ */}
								<div className="flex flex-col sm:flex-row gap-3">
									<button
										type="button"
										onClick={handleRemoveBackground}
										disabled={!avatarFile || isRemovingBg}
										className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] disabled:opacity-45 disabled:pointer-events-none ${
											isRemovingBg
												? "bg-slate-900 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-500/10"
												: "border-2 border-indigo-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:shadow-md hover:border-indigo-300"
										}`}
									>
										{isRemovingBg ? (
											<span className="inline-flex items-center justify-center gap-2">
												<Loader2 className="animate-spin" size={16} />
												Processing...
											</span>
										) : removedPreviewUrl ? (
											<span className="inline-flex items-center justify-center gap-2">
												<RefreshCw size={15} />
												Re-process
											</span>
										) : (
											<span className="inline-flex items-center justify-center gap-2">
												<Wand2 size={15} />
												Remove background
											</span>
										)}
									</button>
									<button
										type="button"
										onClick={handleAvatarUpdate}
										disabled={
											!avatarFile ||
											isLoading ||
											isRemovingBg ||
											(selectedAvatarVariant === "removed" && !removedBlob)
										}
										className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold shadow-md shadow-indigo-500/25 hover:brightness-110 transition-[filter,opacity] duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
									>
										{isLoading ? (
											<span className="inline-flex items-center justify-center gap-2">
												<Loader2 className="animate-spin" size={16} />
												Updating...
											</span>
										) : (
											"Update avatar"
										)}
									</button>
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			{/* Edit Modal */}
			<AnimatePresence>
				{isEditModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => !isLoading && setIsEditModalOpen(false)}
							className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
						/>

						<motion.div
							initial={{ scale: 0.95, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.95, opacity: 0, y: 20 }}
							className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
						>
							<div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
								<h3 className="text-xl font-bold text-slate-900 dark:text-white">
									Edit Profile
								</h3>
								<button
									onClick={() => setIsEditModalOpen(false)}
									className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
								>
									<X size={20} />
								</button>
							</div>

							<form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
								<div className="space-y-1">
									<label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
										Full Name
									</label>
									<input
										type="text"
										required
										value={formData.fullName}
										onChange={(e) =>
											setFormData({ ...formData, fullName: e.target.value })
										}
										className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
										Phone Number
									</label>
									<input
										type="text"
										value={formData.phone}
										onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
										className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
										Location Address
									</label>
									<input
										type="text"
										value={formData.address}
										onChange={(e) =>
											setFormData({ ...formData, address: e.target.value })
										}
										className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
										Bio / About
									</label>
									<textarea
										rows={3}
										value={formData.bio}
										onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
										className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
									/>
								</div>

								<div className="pt-4">
									<button
										type="submit"
										disabled={isLoading || isSuccess}
										className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25 disabled:opacity-70 disabled:grayscale"
									>
										{isSuccess ? (
											<>
												<CheckCircle2 size={20} />
												Saved Successfully
											</>
										) : isLoading ? (
											<>
												<Loader2 className="animate-spin" size={20} />
												Saving Changes...
											</>
										) : (
											"Save Changes"
										)}
									</button>
								</div>
							</form>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Profile;
