import { motion } from 'framer-motion'
import { BookOpen, Play, CheckCircle2, Clock, ChevronRight, MoreVertical } from 'lucide-react'

const StudentCourses = () => {
  const myCourses = [
    {
      id: 1,
      title: 'React Advanced Patterns',
      instructor: 'Dr. Sarah Smith',
      progress: 72,
      lastAccessed: '2 hours ago',
      lessonsCompleted: 14,
      totalLessons: 20,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'Node.js & REST APIs',
      instructor: 'Alex Rivera',
      progress: 45,
      lastAccessed: 'Yesterday',
      lessonsCompleted: 9,
      totalLessons: 20,
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      color: '#10b981'
    },
    {
      id: 3,
      title: 'UI/UX Fundamentals',
      instructor: 'James Wilson',
      progress: 88,
      lastAccessed: '3 days ago',
      lessonsCompleted: 17,
      totalLessons: 20,
      thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&q=80',
      color: '#f59e0b'
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">My Enrolled Courses</h1>
        <p className="text-slate-500 mt-1">Continue where you left off and achieve your learning goals</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myCourses.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-full md:w-56 h-36 rounded-[2rem] overflow-hidden flex-shrink-0">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Play size={24} fill="currentColor" />
                   </div>
                </div>
              </div>

              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">By {course.instructor}</p>
                  </div>
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                       <CheckCircle2 size={14} className="text-emerald-500" />
                    </div>
                    <span>{course.lessonsCompleted}/{course.totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <Clock size={14} className="text-indigo-500" />
                     </div>
                     <span>{course.lastAccessed}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                   <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                      <span className="text-slate-400">Completion</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{course.progress}%</span>
                   </div>
                   <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20"
                      />
                   </div>
                </div>
              </div>

              <div className="w-full md:w-auto p-2">
                <button className="w-full md:w-auto px-10 py-4 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 group-hover:shadow-xl group-hover:shadow-slate-900/10">
                  <Play size={16} fill="currentColor" />
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default StudentCourses
