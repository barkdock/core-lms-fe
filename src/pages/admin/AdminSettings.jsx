import { useMemo, useState } from "react";
import { Bell, CheckCircle2, Database, Globe2, Mail, Palette, RefreshCcw, Save, Shield, ShoppingCart } from "lucide-react";
import AdminCard from "@/components/admin/AdminCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const INITIAL_SETTINGS = {
	platformName: "LMS Academy",
	language: "English",
	timezone: "Asia/Ho_Chi_Minh",
	maintenanceMode: false,
	requireAdmin2FA: true,
	sessionTimeout: 45,
	passwordPolicy: "Strong",
	newDeviceAlert: true,
	senderEmail: "noreply@lms-academy.com",
	approvalNotifications: true,
	paymentAlerts: true,
	currency: "USD",
	taxRate: 8,
	refundWindow: 14,
	reviewThreshold: 500,
	accent: "Indigo",
	publicBanner: true,
};

const Toggle = ({ checked, onChange, label, description }) => (
	<button type="button" onClick={() => onChange(!checked)} className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-primary-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-primary-700">
		<span><span className="block text-sm font-semibold text-slate-900 dark:text-white">{label}</span><span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{description}</span></span>
		<span className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${checked ? "bg-primary-600" : "bg-slate-300 dark:bg-slate-700"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} /></span>
	</button>
);

const Field = ({ label, children }) => <label className="block"><span className="field-label">{label}</span>{children}</label>;
const inputClass = "field-input";

const AdminSettings = () => {
	const [settings, setSettings] = useState(INITIAL_SETTINGS);
	const [savedSettings, setSavedSettings] = useState(INITIAL_SETTINGS);
	const [activeSection, setActiveSection] = useState("platform");
	const [lastSavedAt, setLastSavedAt] = useState("Today 09:30");
	const [notice, setNotice] = useState("");
	const isDirty = useMemo(() => JSON.stringify(settings) !== JSON.stringify(savedSettings), [savedSettings, settings]);
	const updateSetting = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
	const saveChanges = () => { setSavedSettings(settings); setLastSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })); setNotice("System settings saved. Audit log entry prepared for review."); };
	const resetChanges = () => { setSettings(savedSettings); setNotice("Unsaved changes were reset."); };
	const sections = [
		{ id: "platform", label: "Platform", icon: Globe2, desc: "Identity, locale, availability" },
		{ id: "security", label: "Security", icon: Shield, desc: "Authentication and admin safety" },
		{ id: "notifications", label: "Notifications", icon: Mail, desc: "Email and operational alerts" },
		{ id: "commerce", label: "Commerce", icon: ShoppingCart, desc: "Currency, refunds, thresholds" },
		{ id: "branding", label: "Branding", icon: Palette, desc: "Theme and public presentation" },
	];

	return <div className="space-y-6 animate-fade-in">
		<AdminPageHeader title="System Settings" description="Configure platform behavior, security posture, notifications, commerce, and branding." actions={<><button type="button" onClick={resetChanges} disabled={!isDirty} className="btn-secondary text-sm disabled:cursor-not-allowed disabled:opacity-50"><RefreshCcw size={15} />Reset changes</button><button type="button" onClick={saveChanges} disabled={!isDirty} className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-50"><Save size={15} />Save changes</button></>} />
		{notice && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-900/20 dark:text-emerald-300">{notice}</div>}
		<div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
			<div className="space-y-4">
				<AdminCard bodyClassName="p-3">{sections.map((section) => <button key={section.id} type="button" onClick={() => setActiveSection(section.id)} className={`mb-2 flex w-full items-start gap-3 rounded-2xl p-3 text-left transition last:mb-0 ${activeSection === section.id ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900" : "hover:bg-slate-100 dark:hover:bg-slate-900"}`}><section.icon className="mt-0.5 h-5 w-5 flex-shrink-0" /><span><span className="block text-sm font-bold">{section.label}</span><span className={`mt-0.5 block text-xs ${activeSection === section.id ? "text-slate-300 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"}`}>{section.desc}</span></span></button>)}</AdminCard>
				<AdminCard title="Environment status" description={`Last saved ${lastSavedAt}`} actions={<Database className="h-5 w-5 text-emerald-500" />}><div className="space-y-3">{[["API health", "99.98%", "text-emerald-600 dark:text-emerald-400"], ["Storage sync", "Connected", "text-emerald-600 dark:text-emerald-400"], ["Email queue", "12 pending", "text-amber-600 dark:text-amber-400"]].map(([label, value, tone]) => <div key={label} className="flex items-center justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">{label}</span><span className={`font-semibold ${tone}`}>{value}</span></div>)}</div></AdminCard>
			</div>
			<div className="space-y-4">
				<AdminCard>
					{activeSection === "platform" && <div className="space-y-5"><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">Platform settings</h2><p className="text-sm text-slate-500 dark:text-slate-400">Control global LMS identity and availability.</p></div><div className="grid gap-4 md:grid-cols-2"><Field label="Platform name"><input className={inputClass} value={settings.platformName} onChange={(e) => updateSetting("platformName", e.target.value)} /></Field><Field label="Default language"><select className={inputClass} value={settings.language} onChange={(e) => updateSetting("language", e.target.value)}><option>English</option><option>Vietnamese</option><option>Japanese</option></select></Field><Field label="Timezone"><select className={inputClass} value={settings.timezone} onChange={(e) => updateSetting("timezone", e.target.value)}><option>Asia/Ho_Chi_Minh</option><option>UTC</option><option>Asia/Singapore</option></select></Field></div><Toggle checked={settings.maintenanceMode} onChange={(value) => updateSetting("maintenanceMode", value)} label="Maintenance mode" description="Temporarily block public course browsing while admins can still sign in." /></div>}
					{activeSection === "security" && <div className="space-y-5"><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">Security posture</h2><p className="text-sm text-slate-500 dark:text-slate-400">Keep admin sessions and sensitive operations protected.</p></div><div className="grid gap-4 md:grid-cols-2"><Toggle checked={settings.requireAdmin2FA} onChange={(value) => updateSetting("requireAdmin2FA", value)} label="Require 2FA for admins" description="Admins must pass a second authentication factor." /><Toggle checked={settings.newDeviceAlert} onChange={(value) => updateSetting("newDeviceAlert", value)} label="New device alerts" description="Email security alerts for unfamiliar admin devices." /><Field label="Session timeout (minutes)"><input type="number" min="5" max="240" className={inputClass} value={settings.sessionTimeout} onChange={(e) => updateSetting("sessionTimeout", Number(e.target.value))} /></Field><Field label="Password policy"><select className={inputClass} value={settings.passwordPolicy} onChange={(e) => updateSetting("passwordPolicy", e.target.value)}><option>Standard</option><option>Strong</option><option>Strict</option></select></Field></div></div>}
					{activeSection === "notifications" && <div className="space-y-5"><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">Email & notifications</h2><p className="text-sm text-slate-500 dark:text-slate-400">Configure operational messages without exposing secrets.</p></div><Field label="Sender email"><input className={inputClass} value={settings.senderEmail} onChange={(e) => updateSetting("senderEmail", e.target.value)} /></Field><div className="grid gap-4 md:grid-cols-2"><Toggle checked={settings.approvalNotifications} onChange={(value) => updateSetting("approvalNotifications", value)} label="Approval notifications" description="Notify reviewers when queue SLA is at risk." /><Toggle checked={settings.paymentAlerts} onChange={(value) => updateSetting("paymentAlerts", value)} label="Payment alerts" description="Send finance alerts for refunds and failed captures." /></div><div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-900/60 dark:text-slate-300">SMTP password and provider tokens are masked and managed server-side.</div></div>}
					{activeSection === "commerce" && <div className="space-y-5"><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">Commerce controls</h2><p className="text-sm text-slate-500 dark:text-slate-400">Tune pricing, refund, and manual review rules.</p></div><div className="grid gap-4 md:grid-cols-2"><Field label="Default currency"><select className={inputClass} value={settings.currency} onChange={(e) => updateSetting("currency", e.target.value)}><option>USD</option><option>VND</option><option>EUR</option></select></Field><Field label="Tax / VAT (%)"><input type="number" className={inputClass} value={settings.taxRate} onChange={(e) => updateSetting("taxRate", Number(e.target.value))} /></Field><Field label="Refund window (days)"><input type="number" className={inputClass} value={settings.refundWindow} onChange={(e) => updateSetting("refundWindow", Number(e.target.value))} /></Field><Field label="Manual review threshold"><input type="number" className={inputClass} value={settings.reviewThreshold} onChange={(e) => updateSetting("reviewThreshold", Number(e.target.value))} /></Field></div></div>}
					{activeSection === "branding" && <div className="space-y-5"><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">Branding</h2><p className="text-sm text-slate-500 dark:text-slate-400">Keep public presentation aligned with platform identity.</p></div><div className="grid gap-4 md:grid-cols-2"><Field label="Primary accent"><select className={inputClass} value={settings.accent} onChange={(e) => updateSetting("accent", e.target.value)}><option>Indigo</option><option>Emerald</option><option>Amber</option><option>Rose</option></select></Field><div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Logo status</p><p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">Current public logo is active</p></div></div><Toggle checked={settings.publicBanner} onChange={(value) => updateSetting("publicBanner", value)} label="Public banner enabled" description="Allow active marketing banners to render on public pages." /></div>}
				</AdminCard>
				<div className="grid gap-4 md:grid-cols-3">{[{ icon: CheckCircle2, label: "Audit ready", value: "Every save is traceable" }, { icon: Shield, label: "Admin lock", value: settings.requireAdmin2FA ? "2FA enforced" : "2FA optional" }, { icon: Bell, label: "Alerts", value: settings.paymentAlerts ? "Finance enabled" : "Finance muted" }].map((item) => <AdminCard key={item.label}><item.icon className="h-5 w-5 text-primary-500" /><p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{item.label}</p><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.value}</p></AdminCard>)}</div>
			</div>
		</div>
	</div>;
};

export default AdminSettings;
