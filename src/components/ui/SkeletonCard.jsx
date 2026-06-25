/**
 * SkeletonCard — animated skeleton placeholder for stat cards.
 */
const SkeletonCard = () => (
	<div className="card p-6 space-y-4">
		<div className="flex items-center justify-between">
			<div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg" />
			<div className="h-9 w-9 bg-slate-200 dark:bg-slate-700 rounded-xl" />
		</div>
		<div className="h-8 w-36 bg-slate-200 dark:bg-slate-700 rounded-lg" />
		<div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
	</div>
);

/**
 * SkeletonChart — animated skeleton for chart area.
 */
export const SkeletonChart = () => (
	<div className="card p-6 space-y-4">
		<div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg" />
		<div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-end gap-3 px-4 pb-4">
			{[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
				<div
					key={i}
					className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-t-lg"
					style={{ height: `${h}%` }}
				/>
			))}
		</div>
	</div>
);

export default SkeletonCard;
