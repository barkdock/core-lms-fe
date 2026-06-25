import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Award, Ban, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, Eye, GraduationCap, Mail, MapPin, Phone, RefreshCw, Shield, Trash2, UserCheck, UserPlus, Users, UserX } from "lucide-react";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminCard from "@/components/admin/AdminCard";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminDialog from "@/components/admin/AdminDialog";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/ui/StatCard";

const initialUsers = [
	{ id: 1, fullName: "Alexander Pierce", email: "alex.pierce@email.com", phone: "0912 345 678", address: "New York", role: "ADMIN", status: "active", joinDate: "2024-01-15", courses: 0, lastActive: "2 mins ago" },
	{ id: 2, fullName: "Sarah Jenkins", email: "sarah.j@email.com", phone: "0908 765 432", address: "London", role: "TEACHER", status: "active", joinDate: "2024-02-20", courses: 8, lastActive: "1 hour ago" },
	{ id: 3, fullName: "Michael Ross", email: "m.ross@email.com", phone: "0987 654 321", address: "Chicago", role: "STUDENT", status: "active", joinDate: "2024-03-10", courses: 3, lastActive: "30 mins ago" },
	{ id: 4, fullName: "Emily Blunt", email: "emily.b@email.com", phone: "0976 543 210", address: "Los Angeles", role: "TEACHER", status: "active", joinDate: "2024-03-22", courses: 12, lastActive: "5 mins ago" },
	{ id: 5, fullName: "David Gandy", email: "david.g@email.com", phone: "0965 432 109", address: "Toronto", role: "STUDENT", status: "inactive", joinDate: "2024-04-05", courses: 1, lastActive: "3 days ago" },
	{ id: 6, fullName: "Jessica Alba", email: "jess.alba@email.com", phone: "0954 321 098", address: "San Francisco", role: "STUDENT", status: "active", joinDate: "2024-04-18", courses: 5, lastActive: "15 mins ago" },
	{ id: 7, fullName: "Rami Malek", email: "rami@email.com", phone: "0943 210 987", address: "Austin", role: "TEACHER", status: "banned", joinDate: "2024-05-02", courses: 4, lastActive: "1 week ago" },
	{ id: 8, fullName: "Emma Watson", email: "emma.w@email.com", phone: "0932 109 876", address: "Oxford", role: "STUDENT", status: "active", joinDate: "2024-05-15", courses: 2, lastActive: "1 hour ago" },
	{ id: 9, fullName: "Tom Hardy", email: "tom.h@email.com", phone: "0921 098 765", address: "London", role: "STUDENT", status: "active", joinDate: "2024-06-01", courses: 7, lastActive: "45 mins ago" },
	{ id: 10, fullName: "Zendaya Coleman", email: "zen@email.com", phone: "0910 987 654", address: "Oakland", role: "ADMIN", status: "active", joinDate: "2024-06-10", courses: 0, lastActive: "10 mins ago" },
];

const ROLE_CFG = {
	ADMIN: { label: "Admin", variant: "primary", icon: Shield },
	TEACHER: { label: "Teacher", variant: "warning", icon: GraduationCap },
	STUDENT: { label: "Student", variant: "success", icon: Award },
};
const STATUS_CFG = {
	active: { label: "Active", variant: "success" },
	inactive: { label: "Inactive", variant: "neutral" },
	banned: { label: "Banned", variant: "danger" },
};
const PER_PAGE = 8;

const RoleBadge = ({ role }) => {
	const cfg = ROLE_CFG[role];
	return <AdminBadge variant={cfg.variant} icon={cfg.icon}>{cfg.label}</AdminBadge>;
};
const StatusBadge = ({ status }) => <AdminBadge variant={STATUS_CFG[status].variant}>{STATUS_CFG[status].label}</AdminBadge>;

const Toast = ({ message, onDone }) => (
	<motion.div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2" initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} onAnimationComplete={() => setTimeout(onDone, 2200)}>
		<div className="flex items-center gap-2.5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl dark:bg-white dark:text-slate-900"><Check size={16} className="text-emerald-400 dark:text-emerald-600" />{message}</div>
	</motion.div>
);

const AddUserDialog = ({ onAdd, onCancel }) => {
	const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "", role: "STUDENT" });
	const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
	const valid = form.fullName.trim() && form.email.trim();
	const fields = [
		{ key: "fullName", label: "Full Name", icon: Users, placeholder: "Enter full name", type: "text" },
		{ key: "email", label: "Email Address", icon: Mail, placeholder: "email@example.com", type: "email" },
		{ key: "phone", label: "Phone Number", icon: Phone, placeholder: "+1 234 567 890", type: "tel" },
		{ key: "address", label: "Location", icon: MapPin, placeholder: "City, Country", type: "text" },
	];

	return (
		<AdminDialog title="Create Account" description="Add a new user account to the platform." onClose={onCancel} maxWidth="max-w-lg" footer={<><button onClick={onCancel} className="btn-secondary">Cancel</button><button onClick={() => valid && onAdd(form)} disabled={!valid} className="btn-primary"><UserPlus size={15} />Create Account</button></>}>
			<div className="space-y-4">
				{fields.map(({ key, label, icon: Icon, placeholder, type }) => <div key={key}><label className="field-label">{label}</label><div className="relative"><Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type={type} placeholder={placeholder} value={form[key]} onChange={(event) => set(key, event.target.value)} className="field-input pl-10" /></div></div>)}
				<div><label className="field-label">Role</label><div className="grid grid-cols-3 gap-2">{Object.entries(ROLE_CFG).map(([key, cfg]) => <button key={key} onClick={() => set("role", key)} className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${form.role === key ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300" : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300"}`}><cfg.icon size={14} />{cfg.label}</button>)}</div></div>
			</div>
		</AdminDialog>
	);
};

const RoleChangeDialog = ({ user, onConfirm, onCancel }) => {
	const [newRole, setNewRole] = useState(user.role);
	return (
		<AdminDialog title="Change Role" description={`Assign a new role for ${user.fullName}.`} onClose={onCancel} footer={<><button onClick={onCancel} className="btn-secondary">Cancel</button><button onClick={() => onConfirm(newRole)} disabled={newRole === user.role} className="btn-primary">Confirm</button></>}>
			<div className="space-y-2">{Object.entries(ROLE_CFG).map(([key, cfg]) => <button key={key} onClick={() => setNewRole(key)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${newRole === key ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10" : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"}`}><AdminBadge variant={cfg.variant} icon={cfg.icon}>{cfg.label}</AdminBadge>{newRole === key && <Check size={16} className="ml-auto text-primary-600 dark:text-primary-400" />}</button>)}</div>
		</AdminDialog>
	);
};

const UserDetailDialog = ({ user, onClose, onBan, onUnban, onDelete, onChangeRole }) => {
	const details = [
		{ icon: Calendar, label: "Joined Date", val: new Date(user.joinDate).toLocaleDateString("en-US") },
		{ icon: GraduationCap, label: "Courses", val: user.courses },
		{ icon: Phone, label: "Phone", val: user.phone || "—" },
		{ icon: MapPin, label: "Location", val: user.address || "—" },
	];
	return (
		<AdminDialog title={user.fullName} description={user.email} onClose={onClose} maxWidth="max-w-lg">
			<div className="space-y-5">
				<div className="flex items-center gap-3"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-xl font-bold text-white">{user.fullName.slice(0, 2).toUpperCase()}</div><div className="flex flex-wrap gap-2"><RoleBadge role={user.role} /><StatusBadge status={user.status} /></div></div>
				<div className="grid grid-cols-2 gap-3">{details.map((item) => <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-800/40"><div className="mb-1 flex items-center gap-2 text-slate-500 dark:text-slate-400"><item.icon size={13} /><span className="text-[11px] font-medium uppercase tracking-wide">{item.label}</span></div><p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.val}</p></div>)}</div>
				<div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-800/40"><div className="mb-1 flex items-center gap-2 text-slate-500 dark:text-slate-400"><RefreshCw size={13} /><span className="text-[11px] font-medium uppercase tracking-wide">Last Active</span></div><p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user.lastActive}</p></div>
				<div className="grid grid-cols-2 gap-2"><button onClick={() => { onClose(); onChangeRole(user); }} className="btn-secondary"><Shield size={15} />Change Role</button>{user.status === "banned" ? <button onClick={() => { onClose(); onUnban(user); }} className="btn-secondary text-emerald-600"><Check size={15} />Unban</button> : <button onClick={() => { onClose(); onBan(user); }} className="btn-secondary text-amber-600"><Ban size={15} />Ban</button>}<button className="btn-secondary"><Mail size={15} />Email</button><button onClick={() => { onClose(); onDelete(user); }} className="btn-secondary text-rose-600"><Trash2 size={15} />Delete</button></div>
			</div>
		</AdminDialog>
	);
};

const AdminUsers = () => {
	const [users, setUsers] = useState(initialUsers);
	const [search, setSearch] = useState("");
	const [roleFilter, setRoleFilter] = useState("ALL");
	const [statusFilter, setStatusFilter] = useState("ALL");
	const [sortField, setSortField] = useState("fullName");
	const [sortDir, setSortDir] = useState("asc");
	const [page, setPage] = useState(1);
	const [selectedUser, setSelectedUser] = useState(null);
	const [showFilterPanel, setShowFilterPanel] = useState(false);
	const [confirmDialog, setConfirmDialog] = useState(null);
	const [roleDialog, setRoleDialog] = useState(null);
	const [addDialog, setAddDialog] = useState(false);
	const [toast, setToast] = useState(null);
	const showToast = useCallback((msg) => setToast(msg), []);

	const handleBan = (user) => setConfirmDialog({ title: "Ban Account", message: `Are you sure you want to ban "${user.fullName}"? This user will not be able to log in until unbanned.`, confirmLabel: "Ban Account", tone: "warning", onConfirm: () => { setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status: "banned" } : u)); setConfirmDialog(null); showToast(`Banned account ${user.fullName}`); } });
	const handleUnban = (user) => setConfirmDialog({ title: "Unban Account", message: `Unban account "${user.fullName}"? User will be able to log in again normally.`, confirmLabel: "Unban", tone: "warning", onConfirm: () => { setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status: "active" } : u)); setConfirmDialog(null); showToast(`Unbanned account ${user.fullName}`); } });
	const handleDelete = (user) => setConfirmDialog({ title: "Delete Account", message: `This action cannot be undone. Permanently delete "${user.fullName}"?`, confirmLabel: "Delete Permanently", tone: "danger", onConfirm: () => { setUsers((prev) => prev.filter((u) => u.id !== user.id)); setConfirmDialog(null); showToast(`Deleted account ${user.fullName}`); } });
	const confirmRoleChange = (newRole) => { setUsers((prev) => prev.map((u) => u.id === roleDialog.id ? { ...u, role: newRole } : u)); showToast(`Changed role ${roleDialog.fullName} to ${ROLE_CFG[newRole].label}`); setRoleDialog(null); };
	const handleAddUser = (form) => { const newUser = { ...form, id: Date.now(), status: "active", joinDate: new Date().toISOString().split("T")[0], courses: 0, lastActive: "Just now" }; setUsers((prev) => [newUser, ...prev]); setAddDialog(false); showToast(`Added account ${form.fullName}`); };

	const filtered = useMemo(() => {
		let list = [...users];
		if (search) { const q = search.toLowerCase(); list = list.filter((u) => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)); }
		if (roleFilter !== "ALL") list = list.filter((u) => u.role === roleFilter);
		if (statusFilter !== "ALL") list = list.filter((u) => u.status === statusFilter);
		list.sort((a, b) => { const cmp = typeof a[sortField] === "string" ? a[sortField].localeCompare(b[sortField]) : a[sortField] - b[sortField]; return sortDir === "asc" ? cmp : -cmp; });
		return list;
	}, [users, search, roleFilter, statusFilter, sortField, sortDir]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
	const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
	const stats = useMemo(() => ({ total: users.length, active: users.filter((u) => u.status === "active").length, newMonth: users.filter((u) => { const d = new Date(u.joinDate); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).length, banned: users.filter((u) => u.status === "banned").length }), [users]);
	const toggleSort = (field) => { if (sortField === field) setSortDir((d) => d === "asc" ? "desc" : "asc"); else { setSortField(field); setSortDir("asc"); } };
	const sortHeader = (label, field) => <button onClick={() => toggleSort(field)} className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200">{label}{sortField === field && <ArrowUpDown size={12} className="text-primary-500" />}</button>;
	const columns = [
		{ key: "fullName", header: sortHeader("Account", "fullName"), render: (user) => <div className="flex items-center gap-3"><div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-xs font-bold text-white ${user.status === "banned" ? "opacity-50 grayscale" : ""}`}>{user.fullName.slice(0, 2).toUpperCase()}</div><div className="min-w-0"><p className={`truncate text-sm font-semibold ${user.status === "banned" ? "text-slate-400 line-through" : "text-slate-800 dark:text-slate-100"}`}>{user.fullName}</p><p className="truncate text-xs text-slate-400 dark:text-slate-500">{user.email}</p></div></div> },
		{ key: "role", header: sortHeader("Role", "role"), render: (user) => <RoleBadge role={user.role} /> },
		{ key: "status", header: sortHeader("Status", "status"), render: (user) => <StatusBadge status={user.status} /> },
		{ key: "courses", header: sortHeader("Courses", "courses"), align: "center", cellClassName: "font-semibold" },
		{ key: "joinDate", header: sortHeader("Joined", "joinDate"), render: (user) => <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(user.joinDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span> },
		{ key: "actions", header: "", align: "right", render: (user) => <div className="inline-flex gap-1"><button onClick={() => setSelectedUser(user)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-500/10" title="View Details"><Eye size={15} /></button><button onClick={() => setRoleDialog(user)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-500/10" title="Change Role"><Shield size={15} /></button>{user.status === "banned" ? <button onClick={() => handleUnban(user)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10" title="Unban"><Check size={15} /></button> : <button onClick={() => handleBan(user)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10" title="Ban"><Ban size={15} /></button>}<button onClick={() => handleDelete(user)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10" title="Delete"><Trash2 size={15} /></button></div> },
	];

	return (
		<div className="space-y-6 animate-fade-in pb-10">
			<AdminPageHeader title="Account Management" description="Manage user accounts, role assignments, and access status." actions={<button onClick={() => setAddDialog(true)} className="btn-primary"><UserPlus size={16} />Create Account</button>} />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard icon={<Users size={18} />} label="Total Accounts" value={stats.total} change="12% this month" trend="up" color="indigo" variant="plain" /><StatCard icon={<UserCheck size={18} />} label="Active Users" value={stats.active} color="emerald" variant="plain" /><StatCard icon={<UserPlus size={18} />} label="New This Month" value={stats.newMonth} change="+3" trend="up" color="amber" variant="plain" /><StatCard icon={<UserX size={18} />} label="Banned" value={stats.banned} color="rose" variant="plain" /></div>
			<AdminFilterBar searchValue={search} onSearchChange={(value) => { setSearch(value); setPage(1); }} searchPlaceholder="Search by name or email..." actions={<button onClick={() => setShowFilterPanel((v) => !v)} className="btn-secondary">Filters<ChevronDown size={14} className={`transition-transform ${showFilterPanel ? "rotate-180" : ""}`} /></button>}>
				{showFilterPanel && <div className="grid gap-4 md:grid-cols-2"><div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Role</p><div className="flex flex-wrap gap-2">{["ALL", "ADMIN", "TEACHER", "STUDENT"].map((role) => <button key={role} onClick={() => { setRoleFilter(role); setPage(1); }} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${roleFilter === role ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"}`}>{role === "ALL" ? "All Roles" : ROLE_CFG[role].label}</button>)}</div></div><div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Status</p><div className="flex flex-wrap gap-2">{["ALL", "active", "inactive", "banned"].map((status) => <button key={status} onClick={() => { setStatusFilter(status); setPage(1); }} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${statusFilter === status ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"}`}>{status === "ALL" ? "All Status" : STATUS_CFG[status].label}</button>)}</div></div></div>}
			</AdminFilterBar>
			<AdminCard title="User Accounts" description="Filtered account list with role, status, and activity controls." bodyClassName="p-0"><AdminDataTable columns={columns} rows={paginated} getRowKey={(row) => row.id} emptyTitle="No accounts found" emptyDescription="Try adjusting your filters or search keywords." minWidth="920px" />{filtered.length > PER_PAGE && <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/20"><p className="text-xs text-slate-500 dark:text-slate-400">Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}</span> of <span className="font-semibold text-slate-700 dark:text-slate-200">{filtered.length}</span></p><div className="flex items-center gap-1"><button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-slate-800"><ChevronLeft size={16} /></button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <button key={p} onClick={() => setPage(p)} className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${page === p ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}>{p}</button>)}<button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-slate-800"><ChevronRight size={16} /></button></div></div>}</AdminCard>
			<AnimatePresence>{selectedUser && <UserDetailDialog user={selectedUser} onClose={() => setSelectedUser(null)} onBan={handleBan} onUnban={handleUnban} onDelete={handleDelete} onChangeRole={setRoleDialog} />}{confirmDialog && <AdminDialog title={confirmDialog.title} description={confirmDialog.message} onClose={() => setConfirmDialog(null)} footer={<><button onClick={() => setConfirmDialog(null)} className="btn-secondary">Cancel</button><button onClick={confirmDialog.onConfirm} className={confirmDialog.tone === "danger" ? "btn-primary bg-rose-600 hover:bg-rose-700" : "btn-primary bg-amber-600 hover:bg-amber-700"}>{confirmDialog.confirmLabel}</button></>}><div className="flex items-center gap-3"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${confirmDialog.tone === "danger" ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10" : "bg-amber-50 text-amber-600 dark:bg-amber-500/10"}`}>{confirmDialog.tone === "danger" ? <Trash2 size={22} /> : <Ban size={22} />}</div><p className="text-sm text-slate-600 dark:text-slate-300">Please confirm this account action.</p></div></AdminDialog>}{roleDialog && <RoleChangeDialog user={roleDialog} onConfirm={confirmRoleChange} onCancel={() => setRoleDialog(null)} />}{addDialog && <AddUserDialog onAdd={handleAddUser} onCancel={() => setAddDialog(false)} />}{toast && <Toast message={toast} onDone={() => setToast(null)} />}</AnimatePresence>
		</div>
	);
};

export default AdminUsers;
