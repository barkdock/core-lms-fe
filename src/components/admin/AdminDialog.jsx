import { motion } from "framer-motion";
import { X } from "lucide-react";

const AdminDialog = ({ title, description, children, footer, onClose, maxWidth = "max-w-md" }) => (
	<motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
		<div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
		<motion.div
			className={`relative w-full ${maxWidth} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900`}
			initial={{ scale: 0.96, y: 16 }}
			animate={{ scale: 1, y: 0 }}
			exit={{ scale: 0.96, y: 16 }}
		>
			<div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
				<div>
					<h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
					{description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
				</div>
				<button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200">
					<X size={18} />
				</button>
			</div>
			<div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
			{footer && <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/30">{footer}</div>}
		</motion.div>
	</motion.div>
);

export default AdminDialog;
