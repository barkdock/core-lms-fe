import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertCircle, Calendar, CheckCircle2, Clock, CreditCard, Download, Globe, Landmark, Package, ShoppingCart, Smartphone, TrendingUp, XCircle } from "lucide-react";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminCard from "@/components/admin/AdminCard";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/ui/StatCard";

const ORDER_STATS = [
	{ label: "Total Orders", value: "3,842", change: "+18.5%", trend: "up", color: "indigo", icon: <ShoppingCart size={18} /> },
	{ label: "Completed", value: "3,210", change: "+12.4%", trend: "up", color: "emerald", icon: <Package size={18} /> },
	{ label: "Cancelled", value: "284", change: "+5.2%", trend: "down", color: "rose", icon: <XCircle size={18} /> },
	{ label: "Avg. Order Value", value: "$450.00", change: "+3.1%", trend: "up", color: "amber", icon: <TrendingUp size={18} /> },
];

const ALL_ORDERS = [
	{ trackingId: "9928", id: "ORD-9928", invoiceId: "INV-20260303-9928", gatewayRef: "STRP-9A8C-1142", channel: "Web", user: "Alex Nguyen", email: "alex.n@example.com", course: "React Advanced", amount: "$1,450", discount: "$34", platformFee: "$24", netAmount: "$1,392", coupon: "SPRING4", status: "completed", date: "2026-03-03 10:15", method: "Visa" },
	{ trackingId: "9927", id: "ORD-9927", invoiceId: "INV-20260303-9927", gatewayRef: "MOMO-4TB7-6401", channel: "Mobile", user: "Sarah Chen", email: "sarah.c@example.com", course: "Node.js APIs", amount: "$950", discount: "$0", platformFee: "$38", netAmount: "$912", coupon: "NONE", status: "completed", date: "2026-03-03 09:42", method: "Momo" },
	{ trackingId: "9926", id: "ORD-9926", invoiceId: "INV-20260303-9926", gatewayRef: "BIDV-7KM2-0085", channel: "Web", user: "Michael Doe", email: "m.doe@example.com", course: "UI/UX Design", amount: "$1,200", discount: "$35", platformFee: "$25", netAmount: "$1,140", coupon: "DESIGN5", status: "pending", date: "2026-03-03 09:10", method: "Bank Transfer" },
	{ trackingId: "9925", id: "ORD-9925", invoiceId: "INV-20260302-9925", gatewayRef: "STRP-1RB9-3791", channel: "Web", user: "Elena Smith", email: "elena.s@example.com", course: "Python ML", amount: "$870", discount: "$0", platformFee: "$0", netAmount: "$0", coupon: "NONE", status: "refunded", date: "2026-03-02 21:30", method: "Visa" },
	{ trackingId: "9924", id: "ORD-9924", invoiceId: "INV-20260302-9924", gatewayRef: "STRP-2QN4-8871", channel: "Web", user: "James Wilson", email: "j.wilson@example.com", course: "TypeScript Master", amount: "$560", discount: "$10", platformFee: "$12", netAmount: "$538", coupon: "TS4", status: "completed", date: "2026-03-02 18:15", method: "Visa" },
	{ trackingId: "9923", id: "ORD-9923", invoiceId: "INV-20260302-9923", gatewayRef: "PYPL-5LP1-5400", channel: "International", user: "Robert Fox", email: "r.fox@example.com", course: "Web Security", amount: "$2,100", discount: "$0", platformFee: "$74", netAmount: "$2,026", coupon: "NONE", status: "completed", date: "2026-03-02 14:20", method: "Paypal" },
];

const TOP_BUYERS = [
	{ rank: 1, name: "Alex Nguyen", email: "alex.n@example.com", orders: 28, spent: "$12,450" },
	{ rank: 2, name: "Sarah Chen", email: "sarah.c@example.com", orders: 24, spent: "$11,200" },
	{ rank: 3, name: "Michael Doe", email: "m.doe@example.com", orders: 22, spent: "$9,800" },
	{ rank: 4, name: "Elena Smith", email: "elena.s@example.com", orders: 19, spent: "$8,700" },
	{ rank: 5, name: "James Wilson", email: "j.wilson@example.com", orders: 17, spent: "$7,600" },
];

const REFUND_ACTIVITY = [
	{ name: "React Advanced", count: 48, color: "#6366f1" },
	{ name: "Node.js Basic", count: 35, color: "#10b981" },
	{ name: "UI/UX Design", count: 28, color: "#f59e0b" },
	{ name: "Data Science", count: 22, color: "#ec4899" },
	{ name: "Java Intro", count: 15, color: "#8b5cf6" },
];

const ORDER_STATUS_PIE = [
	{ name: "Completed", value: 3210, color: "#10b981" },
	{ name: "Pending", value: 348, color: "#f59e0b" },
	{ name: "Cancelled", value: 284, color: "#ef4444" },
];

const METHOD_ICONS = {
	Visa: <CreditCard size={14} className="text-blue-500" />,
	Momo: <Smartphone size={14} className="text-pink-500" />,
	"Bank Transfer": <Landmark size={14} className="text-emerald-500" />,
	Paypal: <Globe size={14} className="text-blue-600" />,
};

const STATUS_VARIANT = { completed: "success", pending: "warning", refunded: "danger" };
const STATUS_LABEL = { completed: "Completed", pending: "Pending", refunded: "Refunded" };

const CustomPieTooltip = ({ active, payload }) => {
	if (!active || !payload?.length) return null;
	return <div className="card px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200">{payload[0].name}: {payload[0].value.toLocaleString()} orders</div>;
};

const AdminOrders = () => {
	const [activeTab, setActiveTab] = useState("list");
	const orderColumns = [
		{ key: "trackingId", header: "Tracking ID", render: (order) => <span className="font-mono text-xs font-bold text-primary-600">#{order.trackingId}</span> },
		{ key: "id", header: "Order Code" },
		{ key: "invoiceId", header: "Invoice", cellClassName: "whitespace-nowrap text-xs text-slate-500" },
		{ key: "gatewayRef", header: "Gateway Ref", cellClassName: "whitespace-nowrap font-mono text-xs" },
		{ key: "user", header: "Buyer", render: (order) => <div><p className="font-semibold text-slate-900 dark:text-white">{order.user}</p><p className="text-xs text-slate-500">{order.email}</p></div> },
		{ key: "course", header: "Course" },
		{ key: "method", header: "Method", render: (order) => <span className="inline-flex items-center gap-2">{METHOD_ICONS[order.method]}{order.method}</span> },
		{ key: "amount", header: "Gross", align: "right", cellClassName: "font-bold" },
		{ key: "netAmount", header: "Net", align: "right", cellClassName: "font-bold text-emerald-600 dark:text-emerald-400" },
		{ key: "status", header: "Status", align: "center", render: (order) => <AdminBadge variant={STATUS_VARIANT[order.status]}>{STATUS_LABEL[order.status]}</AdminBadge> },
		{ key: "date", header: "Timestamp", align: "right", cellClassName: "whitespace-nowrap text-xs" },
	];

	return (
		<div className="space-y-6 animate-fade-in pb-10">
			<AdminPageHeader
				title="Order Management"
				description="Track, verify, and analyze transaction history across checkout channels."
				actions={<button className="btn-primary"><Download size={16} />Export</button>}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{ORDER_STATS.map((stat) => <StatCard key={stat.label} {...stat} variant="plain" />)}</div>
			<div className="flex w-fit items-center gap-1 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800/60">
				{["list", "analytics"].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-xl px-5 py-2 text-xs font-bold uppercase tracking-wide transition ${activeTab === tab ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"}`}>{tab === "list" ? "Recent Transactions" : "Analytics"}</button>)}
			</div>
			<AnimatePresence mode="wait">
				{activeTab === "list" ? (
					<motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
						<AdminCard title="Recent Transactions" description="Latest order and settlement records." bodyClassName="p-0">
							<AdminDataTable columns={orderColumns} rows={ALL_ORDERS} getRowKey={(row) => row.id} minWidth="1500px" />
						</AdminCard>
					</motion.div>
				) : (
					<motion.div key="analytics" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="grid grid-cols-1 gap-6 xl:grid-cols-3">
						<div className="space-y-6 xl:col-span-2">
							<AdminCard title="Top Buyers" description="Highest lifetime order volume." bodyClassName="p-0"><AdminDataTable columns={[{ key: "rank", header: "Rank" }, { key: "name", header: "Buyer", render: (b) => <div><p className="font-semibold text-slate-900 dark:text-white">{b.name}</p><p className="text-xs text-slate-500">{b.email}</p></div> }, { key: "orders", header: "Orders", align: "center" }, { key: "spent", header: "Lifetime Value", align: "right", cellClassName: "font-bold" }]} rows={TOP_BUYERS} minWidth="640px" /></AdminCard>
							<AdminCard title="Refund Activity" description="Refund counts by course."><ResponsiveContainer width="100%" height={260}><BarChart data={REFUND_ACTIVITY} layout="vertical" margin={{ left: -10, right: 20 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" /><XAxis type="number" hide /><YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={110} /><Tooltip /><Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={22}>{REFUND_ACTIVITY.map((entry) => <Cell key={entry.name} fill={entry.color} fillOpacity={0.85} />)}</Bar></BarChart></ResponsiveContainer></AdminCard>
						</div>
						<AdminCard title="Order Status" description="Aggregate order distribution."><ResponsiveContainer width="100%" height={240}><PieChart><Pie data={ORDER_STATUS_PIE} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={6} dataKey="value" stroke="transparent">{ORDER_STATUS_PIE.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip content={<CustomPieTooltip />} /></PieChart></ResponsiveContainer><div className="mt-6 space-y-4">{ORDER_STATUS_PIE.map((item) => <div key={item.name} className="flex items-center justify-between text-sm"><span className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span><span className="font-bold text-slate-900 dark:text-white">{item.value.toLocaleString()}</span></div>)}</div></AdminCard>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AdminOrders;
