import { Search } from "lucide-react";

const AdminFilterBar = ({ searchValue, onSearchChange, searchPlaceholder = "Search...", filters, actions, children }) => (
	<div className="card p-4">
		<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
			{onSearchChange && (
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
					<input
						type="text"
						value={searchValue}
						onChange={(event) => onSearchChange(event.target.value)}
						placeholder={searchPlaceholder}
						className="field-input pl-10"
					/>
				</div>
			)}
			{filters && <div className="flex flex-wrap items-center gap-2">{filters}</div>}
			{actions && <div className="flex flex-wrap items-center gap-2 lg:ml-auto">{actions}</div>}
		</div>
		{children && <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">{children}</div>}
	</div>
);

export default AdminFilterBar;
