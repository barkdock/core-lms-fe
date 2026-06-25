import { motion } from 'framer-motion'
import { Users, BarChart3, ArrowRight } from 'lucide-react'

const steps = [
  {
    title: 'Define Skills',
    description: 'Identify the necessary skill sets for your team and specific roles together.',
  },
  {
    title: 'Design Roadmap',
    description: 'Build tiered learning programs that align with your team\'s roadmap.',
  },
  {
    title: 'Deploy & Monitor',
    description: 'Dashboard to track progress, completion rates, and training effectiveness.',
  },
]

function Teams() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] md:items-center">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm shadow-slate-200">
              <Users className="h-3.5 w-3.5" />
              <span>Solutions for teams & small businesses</span>
            </p>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Centralized training, synchronized skills for the whole team.
            </h1>
            <p className="text-sm text-slate-500">
              Our LMS helps your team learn to the same standard, with clear tracking to measure real training ROI.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-50">
                <BarChart3 className="h-3.5 w-3.5" />
                Team progress reports
              </span>
              <span>·</span>
              <span>Connect with technical OKRs / KPIs</span>
            </div>
          </div>
          <motion.div
            className="relative rounded-3xl border border-white/60 bg-white/80 p-4 text-sm shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-slate-500">Frontend Team</p>
                <p className="text-sm font-semibold text-slate-900">Skills Overview</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600">12 members</span>
            </div>
            <div className="space-y-3">
              {['React', 'TypeScript', 'Clean Code'].map((skill, i) => (
                <div key={skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{skill}</span>
                    <span>{i === 0 ? '82%' : i === 1 ? '74%' : '68%'}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        i === 0
                          ? 'w-4/5 bg-gradient-to-r from-indigo-400 to-emerald-400'
                          : i === 1
                            ? 'w-3/4 bg-gradient-to-r from-sky-400 to-indigo-500'
                            : 'w-2/3 bg-gradient-to-r from-violet-400 to-rose-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-sm shadow-sm shadow-slate-200/70 backdrop-blur-xl md:p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">How our LMS partners with businesses</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="rounded-2xl border border-slate-100 bg-white/80 p-4 text-xs text-slate-600 shadow-sm shadow-slate-200/70"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-slate-50">
                    {index + 1}
                  </span>
                  <p className="text-[13px] font-semibold text-slate-900">{step.title}</p>
                </div>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <p>
              We can help your team map learning paths to <span className="font-medium">OKRs, KPIs</span> and specific product goals.
            </p>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[11px] font-semibold text-slate-50 shadow-sm shadow-slate-900/30 hover:bg-slate-800">
              Book a 1:1 consultation
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teams

