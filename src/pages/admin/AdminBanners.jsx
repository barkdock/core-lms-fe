import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Image, Plus, Pencil, Trash2, Eye, EyeOff, X, GripVertical,
	ExternalLink, ArrowRight, ToggleLeft, ToggleRight, CheckCircle2,
	AlertCircle, Layers, Link2, Tag, Type, AlignLeft, Palette,
	Megaphone, CalendarDays, MousePointerClick,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminCard from "@/components/admin/AdminCard";
import AdminDialog from "@/components/admin/AdminDialog";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/ui/StatCard";

const ACCENT_OPTIONS = [
	{ value: "teal", label: "Teal", ring: "ring-teal-500", dot: "bg-teal-500" },
	{ value: "amber", label: "Amber", ring: "ring-amber-500", dot: "bg-amber-500" },
	{ value: "rose", label: "Rose", ring: "ring-rose-500", dot: "bg-rose-500" },
	{ value: "violet", label: "Violet", ring: "ring-violet-500", dot: "bg-violet-500" },
	{ value: "sky", label: "Sky", ring: "ring-sky-500", dot: "bg-sky-500" },
];

const ACCENT_COLORS = {
	teal: { tag: "border-teal-500/40 bg-teal-500/10 text-teal-300", dot: "bg-teal-400", cta: "from-teal-400 to-emerald-400", ring: "ring-teal-400/30" },
	amber: { tag: "border-amber-500/40 bg-amber-500/10 text-amber-300", dot: "bg-amber-400", cta: "from-amber-400 to-orange-500", ring: "ring-amber-400/30" },
	rose: { tag: "border-rose-500/40 bg-rose-500/10 text-rose-300", dot: "bg-rose-400", cta: "from-rose-400 to-pink-500", ring: "ring-rose-400/30" },
	violet: { tag: "border-violet-500/40 bg-violet-500/10 text-violet-300", dot: "bg-violet-400", cta: "from-violet-400 to-fuchsia-500", ring: "ring-violet-400/30" },
	sky: { tag: "border-sky-500/40 bg-sky-500/10 text-sky-300", dot: "bg-sky-400", cta: "from-sky-400 to-cyan-500", ring: "ring-sky-400/30" },
};

const BANNER_TYPES = [
	{ value: "promotion", label: "Promotion", desc: "Flash sale, discounts" },
	{ value: "course", label: "Course", desc: "New course launch" },
	{ value: "event", label: "Event", desc: "Hackathon, webinar" },
	{ value: "announce", label: "Notice", desc: "System updates" },
	{ value: "community", label: "Community", desc: "Mentor, networking" },
];

const PRIORITY_OPTIONS = [
	{ value: "low", label: "Low", color: "bg-slate-400" },
	{ value: "medium", label: "Medium", color: "bg-amber-400" },
	{ value: "high", label: "High", color: "bg-red-500" },
];

const DELIVERY_OPTIONS = [
	{ value: "none", label: "None", desc: "Do not send notifications" },
	{ value: "app", label: "In-App", desc: "Show on website only" },
	{ value: "email", label: "Email", desc: "Send email to students" },
	{ value: "both", label: "Both", desc: "Show on web + send email" },
];

const EMPTY_FORM = {
	tag: "", title: "", description: "", image: "", cta: "", ctaLink: "",
	accent: "teal", active: true, bannerType: "course", discountBadge: "",
	secondaryCta: "", secondaryCtaLink: "", startDate: "", endDate: "",
	priority: "medium", delivery: "none",
};

const initialBanners = [
	{ id: 1, tag: "New Course", title: "Master Full-Stack Development in 6 Months", description: "Comprehensive roadmap from zero to hero, 1-1 mentoring, and real-world projects from top tech companies.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80", cta: "Start Now", ctaLink: "/courses", accent: "teal", active: true, bannerType: "course", priority: "high", delivery: "app", order: 1 },
	{ id: 2, tag: "Trending", title: "AI & Machine Learning for Beginners", description: "Master AI fundamentals, build your first model, and apply it to real products.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80", cta: "Explore Now", ctaLink: "/courses", accent: "amber", active: true, bannerType: "promotion", discountBadge: "35", priority: "medium", delivery: "both", order: 2 },
	{ id: 3, tag: "Premium", title: "UI/UX Design — Professional Design Thinking", description: "Learn design like a real product designer, from research to prototype and handoff.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80", cta: "View Details", ctaLink: "/courses", accent: "rose", active: false, bannerType: "course", priority: "low", delivery: "none", order: 3 },
];

const getAccent = (accent) => ACCENT_COLORS[accent] || ACCENT_COLORS.teal;

const BannerPreview = ({ banner, large = false }) => {
	const colors = getAccent(banner.accent);
	return (
		<div className={`relative overflow-hidden rounded-3xl bg-slate-950 ${large ? "min-h-[360px]" : "h-48"} ring-1 ring-white/10`}>
			{banner.image ? (
				<img src={banner.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" onError={(e) => { e.currentTarget.style.display = "none"; }} />
			) : (
				<div className="absolute inset-0 flex items-center justify-center bg-slate-900"><Image size={32} className="text-slate-700" /></div>
			)}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(90deg,#020617_0%,rgba(15,23,42,0.96)_43%,rgba(15,23,42,0.42)_100%)]" />
			<div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
			<div className={`relative flex h-full flex-col justify-center ${large ? "max-w-2xl px-9 py-14" : "p-5"} gap-3`}>
				<div className="flex flex-wrap items-center gap-2">
					<span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] ${colors.tag}`}><span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />{banner.tag || "Banner tag"}</span>
					{banner.discountBadge && <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-extrabold text-white shadow-lg shadow-red-500/30">-{banner.discountBadge}% OFF</span>}
				</div>
				<h2 className={`${large ? "text-4xl" : "text-xl"} max-w-xl font-extrabold leading-tight text-white line-clamp-2`}>{banner.title || "Banner headline"}</h2>
				<p className={`${large ? "text-base" : "text-xs"} max-w-md leading-relaxed text-slate-300 line-clamp-2`}>{banner.description || "Short description shown to students on the homepage."}</p>
				<div className="mt-1 flex flex-wrap items-center gap-2">
					<span className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${colors.cta} px-4 py-2 text-xs font-extrabold text-slate-950 shadow-lg`}>{banner.cta || "Primary CTA"}<ArrowRight className="h-3.5 w-3.5" /></span>
					{banner.secondaryCta && <span className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur">{banner.secondaryCta}</span>}
				</div>
			</div>
		</div>
	);
};

const FullPreviewModal = ({ banner, onClose }) => (
	<motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
		<div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" onClick={onClose} />
		<motion.div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl" initial={{ scale: 0.96, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 18 }}>
			<button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"><X size={17} /></button>
			<BannerPreview banner={banner} large />
			<div className="flex items-center justify-between border-t border-white/10 bg-slate-900 px-5 py-3 text-xs text-slate-400"><span>Homepage preview</span><span>{banner.ctaLink}</span></div>
		</motion.div>
	</motion.div>
);

const TextField = ({ label, icon: Icon, error, className = "", ...props }) => (
	<div className={className}>
		<label className="field-label flex items-center gap-1.5">{Icon && <Icon size={12} />}{label}</label>
		<input {...props} className={`field-input ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/30" : ""}`} />
		{error && <p className="field-error">{error}</p>}
	</div>
);

const BannerFormModal = ({ initial, onSave, onClose }) => {
	const [form, setForm] = useState(initial || EMPTY_FORM);
	const [errors, setErrors] = useState({});
	const isEdit = !!initial?.id;
	const set = (key, value) => { setForm((prev) => ({ ...prev, [key]: value })); setErrors((prev) => ({ ...prev, [key]: undefined })); };
	const handleSubmit = () => {
		const nextErrors = {};
		if (!form.tag.trim()) nextErrors.tag = "Please enter a tag";
		if (!form.title.trim()) nextErrors.title = "Please enter a title";
		if (!form.description.trim()) nextErrors.description = "Please enter a description";
		if (!form.cta.trim()) nextErrors.cta = "Please enter CTA text";
		if (!form.ctaLink.trim()) nextErrors.ctaLink = "Please enter CTA link";
		if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
		onSave(form);
	};

	return (
		<motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<div className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" onClick={onClose} />
			<motion.div className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}>
				<div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
					<div>
						<h3 className="text-lg font-bold text-slate-900 dark:text-white">{isEdit ? "Edit banner" : "Create banner"}</h3>
						<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Configure content, schedule, and homepage appearance.</p>
					</div>
					<button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"><X size={18} /></button>
				</div>

				<div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_360px]">
					<div className="overflow-y-auto p-6">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="flex gap-3">
								<TextField label="Tag" icon={Tag} type="text" placeholder="e.g. Trending, New" value={form.tag} onChange={(e) => set("tag", e.target.value)} error={errors.tag} className="flex-1" />
								<div>
									<label className="field-label">Visibility</label>
									<button type="button" onClick={() => set("active", !form.active)} className={`mt-0.5 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${form.active ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300" : "border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"}`}>
										{form.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
										{form.active ? "Active" : "Hidden"}
									</button>
								</div>
							</div>
							<TextField label="Title" icon={Type} type="text" placeholder="Enter banner title..." value={form.title} onChange={(e) => set("title", e.target.value)} error={errors.title} />
							<div>
								<label className="field-label flex items-center gap-1.5"><AlignLeft size={12} />Description</label>
								<textarea rows={3} placeholder="Enter short description..." value={form.description} onChange={(e) => set("description", e.target.value)} className={`field-input resize-none ${errors.description ? "border-red-400 focus:border-red-500 focus:ring-red-500/30" : ""}`} />
								{errors.description && <p className="field-error">{errors.description}</p>}
							</div>
							<TextField label="Background Image URL" icon={Image} type="text" placeholder="https://example.com/image.jpg" value={form.image} onChange={(e) => set("image", e.target.value)} />
							<div className="flex gap-3">
								<TextField label="CTA" icon={ExternalLink} type="text" placeholder="Start Now" value={form.cta} onChange={(e) => set("cta", e.target.value)} error={errors.cta} className="w-2/5" />
								<TextField label="Target Link" icon={Link2} type="text" placeholder="/courses" value={form.ctaLink} onChange={(e) => set("ctaLink", e.target.value)} error={errors.ctaLink} className="flex-1" />
							</div>
							<div className="flex gap-3">
								<TextField label="Secondary CTA" icon={ExternalLink} type="text" placeholder="Learn More" value={form.secondaryCta} onChange={(e) => set("secondaryCta", e.target.value)} className="w-2/5" />
								<TextField label="Secondary Link" icon={Link2} type="text" placeholder="/pricing" value={form.secondaryCtaLink} onChange={(e) => set("secondaryCtaLink", e.target.value)} className="flex-1" />
							</div>
							<div className="md:col-span-2">
								<label className="field-label flex items-center gap-1.5"><Layers size={12} />Banner Type</label>
								<div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-5">
									{BANNER_TYPES.map((type) => (
										<button key={type.value} type="button" onClick={() => set("bannerType", type.value)} className={`rounded-2xl border p-3 text-left transition ${form.bannerType === type.value ? "border-primary-400 bg-primary-50 ring-2 ring-primary-500/20 dark:border-primary-500/40 dark:bg-primary-500/10" : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"}`}>
											<p className="text-xs font-bold text-slate-800 dark:text-slate-100">{type.label}</p>
											<p className="text-[10px] text-slate-400">{type.desc}</p>
										</button>
									))}
								</div>
							</div>
							{form.bannerType === "promotion" && (
								<div className="md:col-span-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
									<div className="flex flex-wrap items-center gap-3">
										<label className="field-label mb-0 flex items-center gap-1.5 text-amber-700 dark:text-amber-300"><Tag size={12} />Discount Badge</label>
										<input type="number" min="1" max="99" placeholder="%" value={form.discountBadge} onChange={(e) => set("discountBadge", e.target.value)} className="field-input w-24" />
										{form.discountBadge && <span className="rounded-xl bg-red-500 px-3 py-1.5 text-xs font-extrabold text-white">-{form.discountBadge}%</span>}
									</div>
								</div>
							)}
							<TextField label="Start Date" icon={CalendarDays} type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
							<TextField label="End Date" icon={CalendarDays} type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
							<div>
								<label className="field-label flex items-center gap-1.5"><AlertCircle size={12} />Priority</label>
								<div className="mt-2 flex flex-wrap gap-2">
									{PRIORITY_OPTIONS.map((priority) => (
										<button key={priority.value} type="button" onClick={() => set("priority", priority.value)} className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${form.priority === priority.value ? "border-primary-400 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20 dark:border-primary-500/40 dark:bg-primary-500/10 dark:text-primary-300" : "border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400"}`}>
											<span className={`h-2.5 w-2.5 rounded-full ${priority.color}`} />{priority.label}
										</button>
									))}
								</div>
							</div>
							<div>
								<label className="field-label flex items-center gap-1.5"><Megaphone size={12} />Send Notification</label>
								<div className="mt-2 flex flex-wrap gap-2">
									{DELIVERY_OPTIONS.map((delivery) => (
										<button key={delivery.value} type="button" onClick={() => set("delivery", delivery.value)} className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${form.delivery === delivery.value ? "border-primary-400 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20 dark:border-primary-500/40 dark:bg-primary-500/10 dark:text-primary-300" : "border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400"}`}>
											{delivery.label}
										</button>
									))}
								</div>
								<p className="mt-1 text-[10px] text-slate-400">{DELIVERY_OPTIONS.find((d) => d.value === form.delivery)?.desc}</p>
							</div>
							<div className="md:col-span-2">
								<label className="field-label flex items-center gap-1.5"><Palette size={12} />Accent Color</label>
								<div className="mt-2 flex flex-wrap gap-2">
									{ACCENT_OPTIONS.map((option) => (
										<button key={option.value} type="button" onClick={() => set("accent", option.value)} className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${form.accent === option.value ? `${option.ring} border-transparent bg-slate-50 text-slate-800 ring-2 dark:bg-slate-900 dark:text-slate-100` : "border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400"}`}>
											<span className={`h-3 w-3 rounded-full ${option.dot}`} />{option.label}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
					<aside className="border-t border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/40 lg:border-l lg:border-t-0">
						<div className="sticky top-5 space-y-4">
							<div><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Live Preview</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Changes update instantly.</p></div>
							<BannerPreview banner={form} />
							<div className="grid grid-cols-2 gap-2 text-xs">
								<div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950/70"><p className="text-slate-400">Status</p><p className="mt-1 font-bold text-slate-900 dark:text-white">{form.active ? "Live" : "Hidden"}</p></div>
								<div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950/70"><p className="text-slate-400">Priority</p><p className="mt-1 font-bold capitalize text-slate-900 dark:text-white">{form.priority}</p></div>
							</div>
						</div>
					</aside>
				</div>
				<div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/30">
					<button onClick={onClose} className="btn-secondary text-sm">Cancel</button>
					<button onClick={handleSubmit} className="btn-primary text-sm"><CheckCircle2 size={15} />{isEdit ? "Save Changes" : "Create Banner"}</button>
				</div>
			</motion.div>
		</motion.div>
	);
};

const DeleteConfirmDialog = ({ banner, onConfirm, onCancel }) => (
	<AdminDialog title="Delete Banner" description={`Banner "${banner.title}" will be permanently deleted.`} onClose={onCancel} footer={<><button onClick={onCancel} className="btn-secondary text-sm">Cancel</button><button onClick={onConfirm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"><Trash2 className="h-4 w-4" />Delete</button></>}>
		<div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 dark:border-rose-900/40 dark:bg-rose-900/10">
			<AlertCircle className="h-5 w-5 text-rose-500" />
			<p className="text-sm text-slate-700 dark:text-slate-300">This action cannot be undone.</p>
		</div>
	</AdminDialog>
);

const BannerCard = ({ banner, index, onEdit, onDelete, onToggle, onPreview }) => {
	const colors = getAccent(banner.accent);
	const accentOpt = ACCENT_OPTIONS.find((option) => option.value === banner.accent);
	return (
		<motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ delay: index * 0.04, duration: 0.3 }} className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70 ${!banner.active ? "opacity-70" : ""}`}>
			<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_auto]">
				<div className="relative h-56 overflow-hidden bg-slate-950 lg:h-auto">
					{banner.image ? (
						<img src={banner.image} alt={banner.title} className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = "none"; }} />
					) : (
						<div className="flex h-full w-full items-center justify-center"><Image size={30} className="text-slate-600" /></div>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
					<div className="absolute left-3 top-3 flex items-center gap-2">
						<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/55 text-xs font-black text-white backdrop-blur">{banner.order}</span>
						<AdminBadge variant={banner.active ? "success" : "neutral"}>{banner.active ? "Live" : "Hidden"}</AdminBadge>
					</div>
					<div className="absolute bottom-3 left-3 right-3">
						<span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest ${colors.tag}`}><span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />{banner.tag}</span>
					</div>
				</div>
				<div className="min-w-0 p-5 lg:p-6">
					<div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-400">
						<AdminBadge variant="neutral">{BANNER_TYPES.find((type) => type.value === banner.bannerType)?.label || "Course"}</AdminBadge>
						{accentOpt && <span className="inline-flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${accentOpt.dot}`} />{accentOpt.label}</span>}
						<AdminBadge variant={banner.priority === "high" ? "danger" : banner.priority === "medium" ? "warning" : "neutral"}>{banner.priority} priority</AdminBadge>
					</div>
					<h3 className="mt-3 text-xl font-extrabold leading-tight text-slate-900 dark:text-white">{banner.title}</h3>
					<p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 line-clamp-2 dark:text-slate-400">{banner.description}</p>
					<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
						<div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/60"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CTA</p><p className="mt-1 flex items-center gap-1 truncate text-sm font-bold text-slate-800 dark:text-slate-100"><MousePointerClick size={14} />{banner.cta}</p></div>
						<div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/60"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Link</p><p className="mt-1 flex items-center gap-1 truncate text-sm font-bold text-slate-800 dark:text-slate-100"><Link2 size={14} />{banner.ctaLink}</p></div>
						<div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/60"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Delivery</p><p className="mt-1 truncate text-sm font-bold capitalize text-slate-800 dark:text-slate-100">{banner.delivery || "none"}</p></div>
					</div>
				</div>
				<div className="flex items-center gap-2 border-t border-slate-100 p-4 dark:border-slate-800 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
					<button onClick={() => onPreview(banner)} className="rounded-2xl p-3 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200" title="Preview"><Eye size={17} /></button>
					<button onClick={() => onToggle(banner.id)} className={`rounded-2xl p-3 transition ${banner.active ? "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`} title={banner.active ? "Hide banner" : "Show banner"}>{banner.active ? <ToggleRight size={17} /> : <ToggleLeft size={17} />}</button>
					<button onClick={() => onEdit(banner)} className="rounded-2xl p-3 text-primary-500 transition hover:bg-primary-50 dark:hover:bg-primary-500/10" title="Edit"><Pencil size={17} /></button>
					<button onClick={() => onDelete(banner)} className="rounded-2xl p-3 text-red-400 transition hover:bg-red-50 dark:hover:bg-red-500/10" title="Delete"><Trash2 size={17} /></button>
				</div>
			</div>
		</motion.div>
	);
};

const AdminBanners = () => {
	const [banners, setBanners] = useState(initialBanners);
	const [modal, setModal] = useState(null);
	const [deleteTarget, setDeleteTarget] = useState(null);
	const [previewBanner, setPreviewBanner] = useState(null);
	const [query, setQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const nextId = useRef(Math.max(...initialBanners.map((b) => b.id)) + 1);
	const activeCount = banners.filter((banner) => banner.active).length;
	const inactiveCount = banners.length - activeCount;
	const filteredBanners = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return banners.filter((banner) => {
			const matchesQuery = !normalizedQuery || [banner.title, banner.tag, banner.description, banner.ctaLink].some((value) => value?.toLowerCase().includes(normalizedQuery));
			const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? banner.active : !banner.active);
			return matchesQuery && matchesStatus;
		});
	}, [banners, query, statusFilter]);
	const heroBanner = banners.find((banner) => banner.active) || banners[0];
	const handleSave = (form) => {
		if (modal === "create") {
			const newBanner = { ...form, id: nextId.current++, order: banners.length + 1 };
			setBanners((prev) => [...prev, newBanner]);
			toast.success("Banner created successfully.");
		} else {
			setBanners((prev) => prev.map((banner) => banner.id === modal.id ? { ...banner, ...form } : banner));
			toast.success("Banner updated successfully.");
		}
		setModal(null);
	};
	const handleToggle = (id) => setBanners((prev) => prev.map((banner) => banner.id === id ? { ...banner, active: !banner.active } : banner));
	const handleDelete = () => { setBanners((prev) => prev.filter((banner) => banner.id !== deleteTarget.id)); toast.success("Banner deleted."); setDeleteTarget(null); };

	const stats = [
		{ label: "Total Banners", value: banners.length, icon: <Layers size={18} />, color: "indigo" },
		{ label: "Active", value: activeCount, icon: <Eye size={18} />, color: "emerald" },
		{ label: "Hidden", value: inactiveCount, icon: <EyeOff size={18} />, color: "amber" },
	];

	return (
		<div className="space-y-6 animate-fade-in">
			<AdminPageHeader title="Banner Management" description="Create, preview, schedule, and publish homepage banners." actions={<><button onClick={() => setModal("create")} className="btn-primary"><Plus size={15} />Add Banner</button>{heroBanner && <button onClick={() => setPreviewBanner(heroBanner)} className="btn-secondary"><Eye size={15} />Preview Live</button>}</>} />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{stats.map((stat) => <StatCard key={stat.label} {...stat} variant="plain" />)}</div>
			<AdminFilterBar searchValue={query} onSearchChange={setQuery} searchPlaceholder="Search banners..." filters={<div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900/70">{[{ id: "all", label: "All" }, { id: "active", label: "Active" }, { id: "hidden", label: "Hidden" }].map((filter) => <button key={filter.id} onClick={() => setStatusFilter(filter.id)} className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${statusFilter === filter.id ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`}>{filter.label}</button>)}</div>} />
			<AdminCard title="Campaign banners" description={`${filteredBanners.length} shown · ordered by homepage priority`} bodyClassName="p-5">
				<div className="space-y-4">
					<AnimatePresence mode="popLayout">
						{filteredBanners.length === 0 ? (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
								<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"><Image size={28} className="text-slate-400" /></div>
								<div><p className="font-bold text-slate-800 dark:text-slate-100">No banners found</p><p className="mt-1 text-sm text-slate-400">Try another search or create a new banner.</p></div>
								<button onClick={() => setModal("create")} className="btn-primary text-sm"><Plus size={15} />Add Banner</button>
							</motion.div>
						) : filteredBanners.map((banner, index) => (
							<BannerCard key={banner.id} banner={banner} index={index} onEdit={setModal} onDelete={setDeleteTarget} onToggle={handleToggle} onPreview={setPreviewBanner} />
						))}
					</AnimatePresence>
				</div>
			</AdminCard>
			<AnimatePresence>
				{modal !== null && <BannerFormModal key="form" initial={modal === "create" ? null : modal} onSave={handleSave} onClose={() => setModal(null)} />}
				{deleteTarget && <DeleteConfirmDialog key="delete" banner={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
				{previewBanner && <FullPreviewModal key="preview" banner={previewBanner} onClose={() => setPreviewBanner(null)} />}
			</AnimatePresence>
		</div>
	);
};

export default AdminBanners;
