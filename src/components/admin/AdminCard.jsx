const AdminCard = ({ title, description, actions, children, className = "", bodyClassName = "p-5" }) => (
	<section className={`card overflow-hidden ${className}`}>
		{(title || description || actions) && (
			<div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
				<div>
					{title && <h2 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h2>}
					{description && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>}
				</div>
				{actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
			</div>
		)}
		<div className={bodyClassName}>{children}</div>
	</section>
);

export default AdminCard;
