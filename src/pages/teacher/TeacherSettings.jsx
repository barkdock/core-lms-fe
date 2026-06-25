import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Shield, Wallet, User } from "lucide-react";

const TeacherSettings = () => {
	const [emailAlerts, setEmailAlerts] = useState(true);
	const [smsAlerts, setSmsAlerts] = useState(false);
	const [weeklyDigest, setWeeklyDigest] = useState(true);

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-6"
		>
			<div>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
				<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
					Manage your profile, payouts, and notifications
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="card p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="h-10 w-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
							<User size={18} />
						</div>
						<div>
							<h2 className="text-base font-bold text-slate-900 dark:text-white">Profile</h2>
							<p className="text-xs text-slate-400">Public instructor details</p>
						</div>
					</div>
					<div className="space-y-3">
						<div>
							<label className="text-xs font-semibold text-slate-500">Full name</label>
							<input
								type="text"
								placeholder="Instructor User"
								className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
							/>
						</div>
						<div>
							<label className="text-xs font-semibold text-slate-500">Professional title</label>
							<input
								type="text"
								placeholder="Senior Frontend Engineer"
								className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
							/>
						</div>
						<div>
							<label className="text-xs font-semibold text-slate-500">Bio</label>
							<textarea
								rows={4}
								placeholder="Tell students about your experience"
								className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
							/>
						</div>
						<button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600">
							<Save size={16} /> Save profile
						</button>
					</div>
				</div>

				<div className="card p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
							<Wallet size={18} />
						</div>
						<div>
							<h2 className="text-base font-bold text-slate-900 dark:text-white">
								Payout details
							</h2>
							<p className="text-xs text-slate-400">Bank account & tax</p>
						</div>
					</div>
					<div className="space-y-3">
						<div>
							<label className="text-xs font-semibold text-slate-500">Bank name</label>
							<input
								type="text"
								placeholder="VPBank"
								className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
							/>
						</div>
						<div>
							<label className="text-xs font-semibold text-slate-500">Account number</label>
							<input
								type="text"
								placeholder="**** 3021"
								className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
							/>
						</div>
						<button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
							Update payout method
						</button>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="card p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
							<Bell size={18} />
						</div>
						<div>
							<h2 className="text-base font-bold text-slate-900 dark:text-white">Notifications</h2>
							<p className="text-xs text-slate-400">Stay updated on student activity</p>
						</div>
					</div>
					<div className="space-y-4">
						<label className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-3">
							<span className="text-sm text-slate-700 dark:text-slate-200">Email alerts</span>
							<input
								type="checkbox"
								checked={emailAlerts}
								onChange={() => setEmailAlerts((prev) => !prev)}
								className="h-4 w-4 rounded border-slate-300 text-primary-600"
							/>
						</label>
						<label className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-3">
							<span className="text-sm text-slate-700 dark:text-slate-200">SMS alerts</span>
							<input
								type="checkbox"
								checked={smsAlerts}
								onChange={() => setSmsAlerts((prev) => !prev)}
								className="h-4 w-4 rounded border-slate-300 text-primary-600"
							/>
						</label>
						<label className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-3">
							<span className="text-sm text-slate-700 dark:text-slate-200">Weekly digest</span>
							<input
								type="checkbox"
								checked={weeklyDigest}
								onChange={() => setWeeklyDigest((prev) => !prev)}
								className="h-4 w-4 rounded border-slate-300 text-primary-600"
							/>
						</label>
					</div>
				</div>

				<div className="card p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
							<Shield size={18} />
						</div>
						<div>
							<h2 className="text-base font-bold text-slate-900 dark:text-white">Security</h2>
							<p className="text-xs text-slate-400">Account protection</p>
						</div>
					</div>
					<div className="space-y-3">
						<button className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
							Change password
						</button>
						<button className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
							Enable 2FA
						</button>
						<button className="w-full rounded-xl bg-rose-50 text-rose-600 px-4 py-2.5 text-sm font-semibold">
							Deactivate account
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default TeacherSettings;
