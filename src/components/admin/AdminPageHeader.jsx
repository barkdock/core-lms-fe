const AdminPageHeader = ({ title, description, actions, eyebrow }) => (
	<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
		<div className="min-w-0">
			{eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">{eyebrow}</p>}
			<h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
			{description && <p className="mt-1 max-w-3xl text-sm text-slate-500 dark:text-slate-400">{description}</p>}
		</div>
		{actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
	</div>
);

export default AdminPageHeader;
