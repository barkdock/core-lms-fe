import { motion } from 'framer-motion'
import { ArrowRight, Filter, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { publicCourses } from '@/data/publicCourses'

const categories = ['All', 'Web', 'Design', 'Data', 'Product']

function Courses() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm shadow-slate-200">
              <Filter className="h-3.5 w-3.5" />
              <span>Flexible, skill-based roadmap</span>
            </p>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">All Courses</h1>
            <p className="max-w-xl text-sm text-slate-500">
              Discover modern courses designed with a focus on practical experience and real-world applications.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm shadow-slate-200 transition-colors hover:border-slate-300">
            Recommend A Roadmap
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1 rounded-full bg-white/80 p-1 text-xs text-slate-600 shadow-sm shadow-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-3 py-1 transition-colors ${
                  cat === 'All'
                    ? 'bg-slate-900 text-slate-50'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="hidden text-slate-400 md:inline">Sort by</span>
            <button className="rounded-full bg-white px-3 py-1 shadow-sm shadow-slate-200 hover:bg-slate-50">
              Popular
            </button>
            <button className="rounded-full px-3 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
              Newest
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {publicCourses.map((course, index) => (
            <motion.article
              key={course.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white/90 p-4 text-sm text-slate-800 shadow-sm shadow-slate-200/70 backdrop-blur-md transition-transform transition-shadow hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <header className="mb-3 flex items-center justify-between gap-2 text-[11px] text-slate-500">
                <span className="rounded-full bg-slate-50 px-2 py-0.5 font-medium text-slate-600">
                  {course.category.includes('Web') ? 'Web' : course.category}
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  <span className="font-semibold text-slate-800">{course.rating}</span>
                </span>
              </header>

              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-slate-900">{course.title}</h2>
                <p className="text-[11px] text-slate-500">
                  Level: <span className="font-medium text-slate-700">{course.level}</span> · {course.duration} ·{' '}
                  {course.lessons} lessons
                </p>
              </div>

              <footer className="mt-4 flex items-center justify-between">
                <div className="flex flex-col text-[11px] text-slate-500">
                  <span>Suggested path</span>
                  <span className="font-semibold text-slate-900">Combine with 2 supplementary courses</span>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-50 opacity-0 shadow-sm shadow-slate-900/20 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  View Details
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses

