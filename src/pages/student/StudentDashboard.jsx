import { motion } from 'framer-motion'
import { BookOpen, Award, Clock, CheckCircle, Star } from 'lucide-react'
import { useStats } from '@/hooks/useStats'
import StatCard from '@/components/ui/StatCard'
import SkeletonCard from '@/components/ui/SkeletonCard'

const ICON_MAP = {
  'In Progress': <BookOpen size={18} />,
  'Completed': <CheckCircle size={18} />,
  'Learning Hours': <Clock size={18} />,
  'Certificates': <Award size={18} />,
}

const CircularProgress = ({ value, color, size = 80 }) => {
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const filled = circ - (circ * value) / 100

  return (
    <svg width={size} height={size} className="-rotate-90">
    
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={8} className="dark:stroke-slate-700" />
    
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: filled }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  )
}

const StudentDashboard = () => {
  const { stats, isLoading } = useStats()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Learning Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track your progress and keep up the momentum 🚀
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : (stats?.cards || []).map((card) => (
              <StatCard key={card.label} {...card} icon={ICON_MAP[card.label]} />
            ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Course progress — 2/3 width */}
        <div className="xl:col-span-2">
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Courses</h2>
              <button className="btn-secondary text-xs px-3 py-1.5">View All</button>
            </div>

            <div className="space-y-5">
              {isLoading
                ? Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      </div>
                    </div>
                  ))
                : (stats?.courses || []).map((course) => (
                    <div key={course.name} className="flex items-center gap-4">
                      {/* Circular progress */}
                      <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center">
                        <CircularProgress value={course.progress} color={course.color} size={64} />
                        <span className="absolute text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {course.progress}%
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {course.name}
                          </p>
                          <span className="text-xs font-bold flex-shrink-0" style={{ color: course.color }}>
                            {course.progress}%
                          </span>
                        </div>
                        {/* Linear bar as backup */}
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: course.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Achievements</h2>
          <div className="space-y-3">
            {[
              { title: 'Fast Learner', desc: 'Completed 3 lessons in a day', icon: '⚡', earned: true },
              { title: 'Dedicated', desc: '7-day learning streak', icon: '🔥', earned: true },
              { title: 'Top Student', desc: 'Score 90%+ on 5 quizzes', icon: '🏆', earned: false },
              { title: 'Completionist', desc: 'Finish 10 courses', icon: '🎓', earned: false },
            ].map((a) => (
              <div
                key={a.title}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors
                  ${a.earned
                    ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/40'
                    : 'bg-slate-50 dark:bg-slate-800/50 opacity-50'
                  }`}
              >
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{a.title}</p>
                  <p className="text-[10px] text-slate-500">{a.desc}</p>
                </div>
                {a.earned && (
                  <CheckCircle size={14} className="ml-auto text-primary-500 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Weekly goal */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Weekly Goal</p>
              <p className="text-xs font-bold text-primary-600">6h / 10h</p>
            </div>
            <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommended courses */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Recommended for You</h2>
          <button className="btn-secondary text-xs px-3 py-1.5">Browse All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'GraphQL Mastery', instructor: 'John Smith', rating: 4.9, students: '1.2K', color: 'from-pink-500 to-rose-500' },
            { title: 'Docker & Kubernetes', instructor: 'Maria Garcia', rating: 4.8, students: '3.4K', color: 'from-cyan-500 to-blue-600' },
            { title: 'System Design', instructor: 'Alex Johnson', rating: 4.7, students: '5.1K', color: 'from-emerald-500 to-teal-600' },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className={`h-24 bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                <BookOpen size={32} className="text-white/80" />
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{c.instructor}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{c.rating}</span>
                  <span className="text-xs text-slate-400">· {c.students} students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default StudentDashboard
