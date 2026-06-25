import { motion } from 'framer-motion'
import { ArrowRight, FileText, Video } from 'lucide-react'

const resources = [
  {
    id: 1,
    type: 'Article',
    icon: FileText,
    title: 'Roadmap to becoming a Frontend Engineer in 6 months',
    duration: '10 min read',
  },
  {
    id: 2,
    type: 'Video',
    icon: Video,
    title: 'Case study: Designing a SaaS dashboard for a learning platform',
    duration: '22 min watch',
  },
  {
    id: 3,
    type: 'Article',
    icon: FileText,
    title: 'Skill checklist before applying for Junior Developer roles',
    duration: '7 min read',
  },
]

function Resources() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm shadow-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Free resources for the coding community
          </p>
          <h1 className="mt-3 text-xl font-semibold text-slate-900 md:text-2xl">Resources & Blog</h1>
          <p className="mt-2 text-sm text-slate-500">
            Articles, videos, and templates to help you learn and navigate your career more clearly.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {resources.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white/90 p-4 text-sm text-slate-800 shadow-sm shadow-slate-200/60 backdrop-blur-md transition-transform transition-shadow hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-lg"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <header className="mb-3 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-50">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.type}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{item.duration}</span>
                </header>
                <h2 className="mb-3 text-sm font-semibold text-slate-900">{item.title}</h2>
                <button className="mt-auto inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-50 opacity-0 shadow-sm shadow-slate-900/20 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Read / Watch Now
                  <ArrowRight className="h-3 w-3" />
                </button>
              </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Resources

