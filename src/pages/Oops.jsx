import { Link } from "react-router-dom";

const Oops = () => {
	return (
		<div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
			<div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
				<p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">System error</p>
				<h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
					Oops, something went wrong.
				</h1>
				<p className="mt-4 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
					We hit an unexpected problem while loading the page or talking to the server. Try reloading, or
					come back in a moment.
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<button
						className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow)] transition hover:opacity-90"
						onClick={() => window.location.reload()}
					>
						Reload
					</button>
					<Link
						className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--card)]"
						to="/"
					>
						Back to home
					</Link>
				</div>
				<div className="mt-10 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] px-4 py-3 text-xs text-[var(--muted)]">
					If this keeps happening, please contact support.
				</div>
			</div>
		</div>
	);
};

export default Oops;
