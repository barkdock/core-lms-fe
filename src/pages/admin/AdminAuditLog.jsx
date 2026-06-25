import { Fragment, useMemo, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, ChevronDown, Edit3, Eye, Fingerprint, LogIn, RefreshCw, Shield, Terminal, Trash2, UserCog, UserPlus, XCircle } from "lucide-react";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminCard from "@/components/admin/AdminCard";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/ui/StatCard";

const AUDIT_STATS = [
	{ label: "Total Events", value: "1,284", icon: <Activity size={18} />, color: "indigo", change: "+14", trend: "up" },
	{ label: "Login Attempts", value: "467", icon: <LogIn size={18} />, color: "emerald", change: "+22", trend: "up" },
	{ label: "Data Mutations", value: "342", icon: <Edit3 size={18} />, color: "amber", change: "-5", trend: "down" },
	{ label: "Security Alerts", value: "12", icon: <AlertTriangle size={18} />, color: "rose", change: "+2", trend: "up" },
];
const ACTION_CONFIG = {
	login: { icon: LogIn, label: "Login", variant: "info" },
	create: { icon: UserPlus, label: "Create", variant: "success" },
	update: { icon: Edit3, label: "Update", variant: "warning" },
	delete: { icon: Trash2, label: "Delete", variant: "danger" },
	view: { icon: Eye, label: "View", variant: "primary" },
};
const SEVERITY_VARIANT = { low: "success", medium: "warning", high: "danger" };
const AUDIT_EVENTS = [
	{ id: 1, eventId: "AUD-20260303-0001", user: "Admin", role: "Administrator", action: "login", resource: "Admin Portal", resourceType: "auth.session", ip: "192.168.1.100", location: "HCMC, VN", userAgent: "Chrome 134 / Windows 11", method: "POST", statusCode: 200, time: "09:32:15", date: "Mar 03, 2026", status: "success", severity: "low", sessionId: "SESS-8F1A-3D02", note: "MFA verified successfully." },
	{ id: 2, eventId: "AUD-20260303-0002", user: "Sarah Chen", role: "Content Manager", action: "update", resource: "Course: React Advanced", resourceType: "course.content", ip: "10.0.0.45", location: "Singapore, SG", userAgent: "Edge 133 / macOS", method: "PATCH", statusCode: 200, time: "09:28:40", date: "Mar 03, 2026", status: "success", severity: "medium", sessionId: "SESS-7A2D-1BC9", note: "Updated module 4 quiz rubric and prerequisites." },
	{ id: 3, eventId: "AUD-20260303-0003", user: "Ahmed Hassan", role: "Instructor", action: "create", resource: "Course: ML Basics", resourceType: "course.create", ip: "172.16.0.22", location: "Cairo, EG", userAgent: "Chrome 134 / Ubuntu", method: "POST", statusCode: 201, time: "09:15:03", date: "Mar 03, 2026", status: "success", severity: "low", sessionId: "SESS-91B4-7AF2", note: "Initial draft created with 12 lessons." },
	{ id: 4, eventId: "AUD-20260303-0004", user: "Anonymous", role: "Unknown", action: "login", resource: "API Gateway", resourceType: "auth.gateway", ip: "45.33.12.89", location: "Unknown", userAgent: "curl/8.6", method: "POST", statusCode: 401, time: "09:10:22", date: "Mar 03, 2026", status: "failed", severity: "high", sessionId: "SESS-N/A", note: "Multiple failed attempts detected from non-whitelisted IP." },
	{ id: 5, eventId: "AUD-20260303-0005", user: "Admin", role: "Administrator", action: "delete", resource: "Account: user_spam_01", resourceType: "account.delete", ip: "192.168.1.100", location: "HCMC, VN", userAgent: "Chrome 134 / Windows 11", method: "DELETE", statusCode: 200, time: "08:55:10", date: "Mar 03, 2026", status: "success", severity: "medium", sessionId: "SESS-8F1A-3D02", note: "Account removed due to spam activity confirmed by moderation." },
	{ id: 6, eventId: "AUD-20260303-0006", user: "Lisa Park", role: "Support Lead", action: "update", resource: "Profile Configurations", resourceType: "profile.settings", ip: "10.0.0.67", location: "Seoul, KR", userAgent: "Safari 17 / macOS", method: "PATCH", statusCode: 200, time: "08:42:30", date: "Mar 03, 2026", status: "success", severity: "low", sessionId: "SESS-52E1-AC40", note: "Adjusted notification policy and locale defaults." },
	{ id: 7, eventId: "AUD-20260303-0007", user: "Mike Wilson", role: "Finance Analyst", action: "view", resource: "Revenue Reports", resourceType: "analytics.read", ip: "10.0.0.12", location: "London, UK", userAgent: "Chrome 134 / Windows 11", method: "GET", statusCode: 200, time: "08:30:15", date: "Mar 03, 2026", status: "success", severity: "low", sessionId: "SESS-4D67-BB91", note: "Read-only access from finance workspace." },
];

const PillButton = ({ active, children, onClick }) => <button onClick={onClick} className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${active ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300" : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300"}`}>{children}</button>;

const AdminAuditLog = () => {
	const [filter, setFilter] = useState("all");
	const [severity, setSeverity] = useState("all");
	const [query, setQuery] = useState("");
	const [expandedId, setExpandedId] = useState(null);
	const filteredEvents = useMemo(() => AUDIT_EVENTS.filter((event) => {
		const normalizedQuery = query.trim().toLowerCase();
		return (filter === "all" || event.action === filter) && (severity === "all" || event.severity === severity) && (!normalizedQuery || event.user.toLowerCase().includes(normalizedQuery) || event.eventId.toLowerCase().includes(normalizedQuery) || event.resource.toLowerCase().includes(normalizedQuery) || event.ip.toLowerCase().includes(normalizedQuery));
	}), [filter, severity, query]);

	return (
		<div className="space-y-6 animate-fade-in pb-10">
			<AdminPageHeader title="Audit Log" description="Review administrative activity, security events, and data mutation records." actions={<button className="btn-secondary"><RefreshCw size={16} />Refresh</button>} />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{AUDIT_STATS.map((stat) => <StatCard key={stat.label} {...stat} variant="plain" />)}</div>
			<AdminFilterBar searchValue={query} onSearchChange={setQuery} searchPlaceholder="Search actor, resource, event ID, or IP...">
				<div className="grid gap-4 xl:grid-cols-2"><div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Action</p><div className="flex flex-wrap gap-2">{["all", "login", "create", "update", "delete", "view"].map((mode) => <PillButton key={mode} active={filter === mode} onClick={() => setFilter(mode)}>{mode === "all" ? "All Actions" : ACTION_CONFIG[mode].label}</PillButton>)}</div></div><div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Severity</p><div className="flex flex-wrap gap-2">{["all", "low", "medium", "high"].map((level) => <PillButton key={level} active={severity === level} onClick={() => setSeverity(level)}>{level === "all" ? "All Severity" : level}</PillButton>)}</div></div></div>
			</AdminFilterBar>
			<AdminCard title="Event Ledger" description="Expandable audit records with session, client, and trace details." bodyClassName="p-0">
				<div className="overflow-x-auto"><table className="w-full min-w-[1180px] text-sm"><thead><tr className="border-b border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/30"><th className="admin-table-heading text-left">Event</th><th className="admin-table-heading text-left">Timestamp</th><th className="admin-table-heading text-left">Actor</th><th className="admin-table-heading text-left">Operation</th><th className="admin-table-heading text-left">Resource</th><th className="admin-table-heading text-left">Network</th><th className="admin-table-heading text-center">Severity</th><th className="admin-table-heading text-center">Verdict</th><th className="admin-table-heading" /></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">{filteredEvents.map((event) => { const config = ACTION_CONFIG[event.action] || ACTION_CONFIG.view; const isExpanded = expandedId === event.id; return <Fragment key={event.id}><tr className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"><td className="admin-table-cell"><p className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{event.eventId}</p><p className="text-xs text-slate-500">{event.resourceType}</p></td><td className="admin-table-cell"><p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-100">{event.time}</p><p className="text-xs text-slate-500">{event.date}</p></td><td className="admin-table-cell"><p className="font-semibold text-slate-900 dark:text-white">{event.user}</p><p className="text-xs text-slate-500">{event.role}</p></td><td className="admin-table-cell"><AdminBadge variant={config.variant} icon={config.icon}>{config.label}</AdminBadge></td><td className="admin-table-cell max-w-[240px]"><p className="truncate font-semibold text-slate-700 dark:text-slate-200">{event.resource}</p><p className="text-xs text-slate-500">{event.method} · {event.statusCode}</p></td><td className="admin-table-cell"><p className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">{event.ip}</p><p className="text-xs text-slate-500">{event.location}</p></td><td className="admin-table-cell text-center"><AdminBadge variant={SEVERITY_VARIANT[event.severity]}>{event.severity}</AdminBadge></td><td className="admin-table-cell text-center">{event.status === "success" ? <CheckCircle2 className="mx-auto text-emerald-500" size={18} /> : <XCircle className="mx-auto text-rose-500" size={18} />}</td><td className="admin-table-cell text-right"><button onClick={() => setExpandedId(isExpanded ? null : event.id)} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"><ChevronDown size={16} className={`transition ${isExpanded ? "rotate-180" : ""}`} /></button></td></tr>{isExpanded && <tr className="bg-slate-50/60 dark:bg-slate-900/30"><td colSpan={9} className="px-6 py-4"><div className="grid gap-3 md:grid-cols-3"><div className="rounded-xl border border-slate-200 bg-white/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-900/50"><p className="mb-1 font-bold uppercase tracking-wide text-slate-400">Session</p><p className="inline-flex items-center gap-2 font-mono font-semibold text-slate-700 dark:text-slate-200"><Fingerprint size={13} />{event.sessionId}</p></div><div className="rounded-xl border border-slate-200 bg-white/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-900/50"><p className="mb-1 font-bold uppercase tracking-wide text-slate-400">Client</p><p className="inline-flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200"><UserCog size={13} />{event.userAgent}</p></div><div className="rounded-xl border border-slate-200 bg-white/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-900/50"><p className="mb-1 font-bold uppercase tracking-wide text-slate-400">Trace Note</p><p className="inline-flex items-start gap-2 font-semibold text-slate-700 dark:text-slate-200"><Terminal size={13} className="mt-0.5" />{event.note}</p></div></div></td></tr>}</Fragment>; })}</tbody></table></div>
				<button className="flex w-full items-center justify-center gap-2 border-t border-slate-100 py-4 text-xs font-bold uppercase tracking-wide text-slate-500 transition hover:text-primary-600 dark:border-slate-800">Fetch Older Logs <ChevronDown size={14} /></button>
			</AdminCard>
		</div>
	);
};

export default AdminAuditLog;
