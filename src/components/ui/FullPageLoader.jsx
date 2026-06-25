
const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="flex flex-col items-center gap-4">
      {/* Spinner */}
      <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading EduFlow…</p>
    </div>
  </div>
)

export default FullPageLoader
