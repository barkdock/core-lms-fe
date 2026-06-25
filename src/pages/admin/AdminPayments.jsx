import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertCircle, ArrowDownRight, CheckCircle2, Clock, CreditCard, DollarSign, Download, Globe, Landmark, Smartphone, TrendingUp, Wallet } from "lucide-react";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminCard from "@/components/admin/AdminCard";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/ui/StatCard";

const PAYMENT_STATS = [
	{ label: "Total Gross", value: "$245,600", change: "+12%", trend: "up", color: "indigo", icon: <DollarSign size={18} /> },
	{ label: "Monthly Sales", value: "$18,240", change: "+8%", trend: "up", color: "emerald", icon: <TrendingUp size={18} /> },
	{ label: "Refunds", value: "$3,420", change: "+2%", trend: "down", color: "rose", icon: <ArrowDownRight size={18} /> },
	{ label: "Net Balance", value: "$211,400", change: "+11%", trend: "up", color: "violet", icon: <Wallet size={18} /> },
];

const MONTHLY_REVENUE = [
	{ month: "Mar '25", revenue: 8200 }, { month: "Apr '25", revenue: 9400 }, { month: "May '25", revenue: 7800 }, { month: "Jun '25", revenue: 11200 }, { month: "Jul '25", revenue: 13600 }, { month: "Aug '25", revenue: 12100 }, { month: "Sep '25", revenue: 14500 }, { month: "Oct '25", revenue: 11800 }, { month: "Nov '25", revenue: 15200 }, { month: "Dec '25", revenue: 16800 }, { month: "Jan '26", revenue: 17100 }, { month: "Feb '26", revenue: 18240 },
];

const PAYMENT_METHODS = [
	{ name: "Credit Cards", amount: 124, pct: 50, icon: CreditCard, color: "#6366f1" },
	{ name: "Digital Wallets", amount: 62, pct: 25, icon: Smartphone, color: "#0ea5e9" },
	{ name: "Bank Transfers", amount: 37, pct: 15, icon: Landmark, color: "#10b981" },
	{ name: "International / PayPal", amount: 24, pct: 10, icon: Globe, color: "#f59e0b" },
];

const RECENT_TXNS = [
	{ id: "TXN-8842", user: "Emily Johnson", course: "React Advanced", amount: "$145.00", status: "completed", date: "Mar 03, 2026" },
	{ id: "TXN-8841", user: "Michael Chen", course: "Node.js APIs", amount: "$95.00", status: "completed", date: "Mar 03, 2026" },
	{ id: "TXN-8840", user: "Sarah Williams", course: "UI/UX Design", amount: "$120.00", status: "pending", date: "Mar 02, 2026" },
	{ id: "TXN-8839", user: "David Kim", course: "Python ML", amount: "$87.00", status: "refunded", date: "Mar 02, 2026" },
	{ id: "TXN-8838", user: "Lisa Anderson", course: "TypeScript", amount: "$56.00", status: "completed", date: "Mar 01, 2026" },
];

const STATUS = {
	completed: { label: "Settled", variant: "success", icon: CheckCircle2 },
	pending: { label: "Processing", variant: "warning", icon: Clock },
	refunded: { label: "Refunded", variant: "danger", icon: AlertCircle },
};

const CustomRevenueTooltip = ({ active, payload, label }) => {
	if (!active || !payload?.length) return null;
	return <div className="card px-3 py-2"><p className="text-xs text-slate-500">{label}</p><p className="text-sm font-bold text-slate-900 dark:text-white">${payload[0].value.toLocaleString()}</p></div>;
};

const AdminPayments = () => {
	const columns = [
		{ key: "id", header: "Reference", render: (txn) => <span className="font-mono text-xs font-bold text-primary-600">{txn.id}</span> },
		{ key: "user", header: "Customer", cellClassName: "font-semibold text-slate-900 dark:text-white" },
		{ key: "course", header: "Course" },
		{ key: "amount", header: "Gross Value", align: "right", cellClassName: "font-bold" },
		{ key: "status", header: "Status", align: "center", render: (txn) => <AdminBadge variant={STATUS[txn.status].variant} icon={STATUS[txn.status].icon}>{STATUS[txn.status].label}</AdminBadge> },
		{ key: "date", header: "Date", align: "right", cellClassName: "whitespace-nowrap text-xs" },
	];

	return (
		<div className="space-y-6 animate-fade-in pb-10">
			<AdminPageHeader title="Payments" description="Monitor payment volume, settlement status, refunds, and method distribution." actions={<button className="btn-primary"><Download size={16} />Export</button>} />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{PAYMENT_STATS.map((stat) => <StatCard key={stat.label} {...stat} variant="plain" />)}</div>
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
				<AdminCard title="Monthly Revenue" description="Trailing twelve-month payment volume." className="xl:col-span-2"><ResponsiveContainer width="100%" height={300}><AreaChart data={MONTHLY_REVENUE} margin={{ left: -10, right: 0 }}><defs><linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.2} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={50} tickFormatter={(v) => `$${v / 1000}k`} /><Tooltip content={<CustomRevenueTooltip />} /><Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#payGrad)" dot={{ r: 3, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} /></AreaChart></ResponsiveContainer></AdminCard>
				<AdminCard title="Payment Methods" description="Share by acquisition channel."><div className="space-y-5">{PAYMENT_METHODS.map((method) => { const Icon = method.icon; return <div key={method.name} className="space-y-2"><div className="flex items-center justify-between"><span className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800"><Icon size={16} style={{ color: method.color }} /></span>{method.name}</span><span className="text-sm font-bold text-slate-900 dark:text-white">${method.amount}k</span></div><div className="flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full" style={{ width: `${method.pct}%`, backgroundColor: method.color }} /></div><span className="w-9 text-right text-xs font-bold text-slate-500">{method.pct}%</span></div></div>; })}</div></AdminCard>
			</div>
			<AdminCard title="Recent Transactions" description="Latest settlement ledger entries." bodyClassName="p-0"><AdminDataTable columns={columns} rows={RECENT_TXNS} getRowKey={(row) => row.id} minWidth="900px" /></AdminCard>
		</div>
	);
};

export default AdminPayments;
