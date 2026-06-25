const alignClass = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
};

const AdminDataTable = ({ columns, rows, getRowKey, emptyTitle = "No records found", emptyDescription, minWidth = "760px", rowClassName = "" }) => (
	<div className="overflow-x-auto">
		<table className="w-full text-sm" style={{ minWidth }}>
			<thead>
				<tr className="border-b border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/30">
					{columns.map((column) => (
						<th key={column.key} className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 ${alignClass[column.align || "left"]} ${column.headerClassName || ""}`}>
							{column.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
				{rows.length ? rows.map((row, index) => (
					<tr key={getRowKey ? getRowKey(row, index) : row.id || index} className={`transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${rowClassName}`}>
						{columns.map((column) => (
							<td key={column.key} className={`px-5 py-4 align-middle text-slate-700 dark:text-slate-300 ${alignClass[column.align || "left"]} ${column.cellClassName || ""}`}>
								{column.render ? column.render(row, index) : row[column.key]}
							</td>
						))}
					</tr>
				)) : (
					<tr>
						<td colSpan={columns.length} className="px-5 py-12 text-center">
							<p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{emptyTitle}</p>
							{emptyDescription && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{emptyDescription}</p>}
						</td>
					</tr>
				)}
			</tbody>
		</table>
	</div>
);

export default AdminDataTable;
