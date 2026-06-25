import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock3, Download, FileCheck2, MessageSquareText, Search, ShieldCheck, XCircle } from "lucide-react";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminCard from "@/components/admin/AdminCard";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/ui/StatCard";

const INITIAL_REQUESTS = [
	{ id: "APR-1048", type: "courses", title: "Advanced React Patterns 2026", owner: "Sarah Chen", category: "Frontend", priority: "high", status: "pending", submitted: "2h ago", lessons: 38, price: "$89", quality: 94, plagiarism: 2, flags: ["Pricing change", "New certificate"], checklist: ["Curriculum complete", "HD preview uploaded", "Quiz coverage verified"], timeline: ["Submitted by instructor", "Automated checks passed", "Awaiting admin review"], note: "" },
	{ id: "APR-1047", type: "instructors", title: "Instructor verification: Ahmed Hassan", owner: "Ahmed Hassan", category: "Data Science", priority: "medium", status: "reviewing", submitted: "5h ago", lessons: 12, price: "Profile", quality: 88, plagiarism: 0, flags: ["Credential review"], checklist: ["Identity document uploaded", "Portfolio reviewed", "Tax profile pending"], timeline: ["Application created", "Credential scan completed", "Manual review started"], note: "Verify payout profile before approval." },
	{ id: "APR-1046", type: "content", title: "UX Research Methods content update", owner: "Lisa Park", category: "Design", priority: "low", status: "changes_requested", submitted: "1d ago", lessons: 9, price: "$75", quality: 76, plagiarism: 8, flags: ["Missing captions", "Outdated worksheet"], checklist: ["Lesson order updated", "Captions missing", "Worksheet needs replacement"], timeline: ["Update submitted", "Accessibility check failed", "Changes requested"], note: "Ask instructor to add captions for modules 3 and 4." },
	{ id: "APR-1045", type: "appeals", title: "Course rejection appeal: Growth Analytics", owner: "Minh Tran", category: "Marketing", priority: "high", status: "pending", submitted: "2d ago", lessons: 24, price: "$59", quality: 81, plagiarism: 4, flags: ["Appeal", "Policy exception"], checklist: ["Appeal statement attached", "Policy concern identified", "Reviewer assignment needed"], timeline: ["Initial rejection issued", "Instructor appealed", "Admin queue assigned"], note: "Review policy exception with second reviewer." },
];
const TABS = [{ id: "all", label: "All" }, { id: "courses", label: "Courses" }, { id: "instructors", label: "Instructors" }, { id: "content", label: "Content updates" }, { id: "appeals", label: "Appeals" }];
const STATUS_LABELS = { pending: "Pending", reviewing: "In review", approved: "Approved", changes_requested: "Changes requested", rejected: "Rejected" };
const STATUS_VARIANTS = { pending: "warning", reviewing: "info", approved: "success", changes_requested: "primary", rejected: "danger" };
const PRIORITY_VARIANTS = { high: "danger", medium: "warning", low: "neutral" };

const FilterButton = ({ active, children, onClick }) => <button type="button" onClick={onClick} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${active ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"}`}>{children}</button>;

const AdminApprovals = () => {
	const [requests, setRequests] = useState(INITIAL_REQUESTS);
	const [activeTab, setActiveTab] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(INITIAL_REQUESTS[0].id);
	const [reviewNote, setReviewNote] = useState(INITIAL_REQUESTS[0].note);
	const [notice, setNotice] = useState("");
	const selected = requests.find((item) => item.id === selectedId) || requests[0];
	const filteredRequests = useMemo(() => {
		const needle = query.trim().toLowerCase();
		return requests.filter((item) => (activeTab === "all" || item.type === activeTab) && (statusFilter === "all" || item.status === statusFilter) && (priorityFilter === "all" || item.priority === priorityFilter) && (!needle || [item.title, item.owner, item.category, item.id].some((value) => value.toLowerCase().includes(needle))));
	}, [activeTab, priorityFilter, query, requests, statusFilter]);
	const stats = useMemo(() => [
		{ label: "Pending Review", value: requests.filter((item) => item.status === "pending").length, icon: <Clock3 size={18} />, color: "amber" },
		{ label: "In Review", value: requests.filter((item) => item.status === "reviewing").length, icon: <ShieldCheck size={18} />, color: "sky" },
		{ label: "Approved", value: requests.filter((item) => item.status === "approved").length, icon: <CheckCircle2 size={18} />, color: "emerald" },
		{ label: "Needs Action", value: requests.filter((item) => ["changes_requested", "rejected"].includes(item.status)).length, icon: <AlertTriangle size={18} />, color: "rose" },
	], [requests]);
	const updateStatus = (status) => { setRequests((items) => items.map((item) => item.id === selected.id ? { ...item, status, note: reviewNote, timeline: [...item.timeline, STATUS_LABELS[status]] } : item)); setNotice(`${selected.id} marked as ${STATUS_LABELS[status].toLowerCase()}.`); };
	const selectRequest = (item) => { setSelectedId(item.id); setReviewNote(item.note); };

	return (
		<div className="space-y-6 animate-fade-in">
			<AdminPageHeader title="Approval Center" description="Review courses, instructor requests, content updates, and policy appeals before publication." actions={<><button type="button" onClick={() => setNotice("Approval queue exported for operations review.")} className="btn-secondary"><Download size={15} />Export queue</button><button type="button" onClick={() => setNotice("Review policy opened in preview mode.")} className="btn-primary"><FileCheck2 size={15} />Review policy</button></>} />
			{notice && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-900/20 dark:text-emerald-300">{notice}</div>}
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((item) => <StatCard key={item.label} {...item} variant="plain" />)}</div>
			<AdminFilterBar searchValue={query} onSearchChange={setQuery} searchPlaceholder="Search queue...">
				<div className="space-y-4"><div className="flex flex-wrap gap-2">{TABS.map((tab) => <FilterButton key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>{tab.label}</FilterButton>)}</div><div className="flex flex-wrap gap-2"><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="field-input w-auto"><option value="all">All statuses</option>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="field-input w-auto"><option value="all">All priorities</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div></div>
			</AdminFilterBar>
			<div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)]">
				<AdminCard title="Review queue" description={`${filteredRequests.length} request${filteredRequests.length === 1 ? "" : "s"} match current filters`} bodyClassName="p-0">
					{filteredRequests.length === 0 ? <div className="flex flex-col items-center justify-center px-6 py-16 text-center"><Search className="mb-3 h-10 w-10 text-slate-300" /><h3 className="text-sm font-semibold text-slate-900 dark:text-white">No approvals found</h3><p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">Try clearing search or changing filters.</p><button type="button" onClick={() => { setQuery(""); setStatusFilter("all"); setPriorityFilter("all"); setActiveTab("all"); }} className="btn-secondary mt-4 text-sm">Reset filters</button></div> : <div className="divide-y divide-slate-100 dark:divide-slate-800">{filteredRequests.map((item) => <button key={item.id} type="button" onClick={() => selectRequest(item)} className={`w-full p-5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-900/60 ${selected?.id === item.id ? "bg-primary-50/70 dark:bg-primary-950/20" : ""}`}><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-slate-400">{item.id}</span><AdminBadge variant={STATUS_VARIANTS[item.status]}>{STATUS_LABELS[item.status]}</AdminBadge><AdminBadge variant={PRIORITY_VARIANTS[item.priority]}>{item.priority} priority</AdminBadge></div><p className="mt-2 truncate text-sm font-bold text-slate-900 dark:text-white">{item.title}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.owner} · {item.category} · submitted {item.submitted}</p></div><div className="grid grid-cols-3 gap-2 text-center text-xs lg:w-72"><div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-900"><p className="font-bold text-slate-900 dark:text-white">{item.lessons}</p><p className="text-slate-500">lessons</p></div><div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-900"><p className="font-bold text-emerald-600 dark:text-emerald-400">{item.quality}%</p><p className="text-slate-500">quality</p></div><div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-900"><p className="font-bold text-rose-600 dark:text-rose-400">{item.plagiarism}%</p><p className="text-slate-500">risk</p></div></div></div></button>)}</div>}
				</AdminCard>
				{selected && <AdminCard title={selected.title} description={`${selected.owner} · ${selected.category}`} className="xl:sticky xl:top-24 xl:self-start"><div className="space-y-5"><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/70"><p className="text-xs text-slate-500">Price</p><p className="mt-1 font-bold text-slate-900 dark:text-white">{selected.price}</p></div><div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/70"><p className="text-xs text-slate-500">Submitted</p><p className="mt-1 font-bold text-slate-900 dark:text-white">{selected.submitted}</p></div></div><div><h3 className="text-sm font-bold text-slate-900 dark:text-white">Review checklist</h3><div className="mt-3 space-y-2">{selected.checklist.map((item) => <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle2 className="h-4 w-4 text-emerald-500" /><span>{item}</span></div>)}</div></div><div><h3 className="text-sm font-bold text-slate-900 dark:text-white">Policy flags</h3><div className="mt-3 flex flex-wrap gap-2">{selected.flags.map((flag) => <AdminBadge key={flag} variant="neutral">{flag}</AdminBadge>)}</div></div><div><label className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"><MessageSquareText className="h-4 w-4" />Reviewer note</label><textarea value={reviewNote} onChange={(event) => setReviewNote(event.target.value)} rows={4} className="field-input mt-2" placeholder="Add decision notes for the audit trail..." /></div><div className="space-y-2"><button type="button" onClick={() => updateStatus("approved")} className="btn-primary w-full justify-center text-sm">Approve request</button><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => updateStatus("changes_requested")} className="btn-secondary justify-center text-sm">Request changes</button><button type="button" onClick={() => updateStatus("rejected")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"><XCircle className="h-4 w-4" />Reject</button></div></div></div></AdminCard>}
			</div>
		</div>
	);
};

export default AdminApprovals;
