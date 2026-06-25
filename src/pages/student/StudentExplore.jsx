import { motion } from 'framer-motion'
import { BookOpen, Search, Filter, Clock, Star, Play, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
  >
    <div className="relative h-48 overflow-hidden">
      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
          <PlayCircle size={32} />
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shadow-sm">
          {course.category}
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="student" />
            </div>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-medium">+ {course.students} students</span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
        {course.title}
      </h3>
      
      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {course.duration}
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          {course.rating} ({course.reviews})
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
             <img src={course.instructorAvatar} alt={course.instructor} />
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{course.instructor}</span>
        </div>
        <span className="text-lg font-black text-slate-900 dark:text-white">
          ${course.price}
        </span>
      </div>
      
      <Link to={`/courses/${course.id}`} className="mt-6 w-full btn-primary py-3 rounded-2xl flex items-center justify-center gap-2 group-hover:shadow-indigo-500/25">
        Enroll Now
      </Link>
    </div>
  </motion.div>
)

const StudentExplore = () => {
  const categories = ['Development', 'Design', 'Business', 'Marketing', 'Photography', 'Music']
  
  const courses = [
    {
      id: 1,
      title: 'React Advanced Patterns & Performance',
      instructor: 'Dr. Sarah Smith',
      instructorAvatar: 'https://i.pravatar.cc/100?img=1',
      category: 'Development',
      duration: '12h 30m',
      rating: 4.9,
      reviews: 1240,
      students: '12k',
      price: 89,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
    },
    {
       id: 2,
       title: 'UI/UX Design Masterclass 2024',
       instructor: 'Alex Rivera',
       instructorAvatar: 'https://i.pravatar.cc/100?img=2',
       category: 'Design',
       duration: '24h 45m',
       rating: 4.8,
       reviews: 850,
       students: '8k',
       price: 75,
       thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&q=80'
    },
    {
       id: 3,
       title: 'Natural Language Processing with Python',
       instructor: 'Prof. James Wilson',
       instructorAvatar: 'https://i.pravatar.cc/100?img=3',
       category: 'AI & Data',
       duration: '18h 15m',
       rating: 4.7,
       reviews: 620,
       students: '5k',
       price: 99,
       thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80'
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Explore Courses</h1>
          <p className="text-slate-500 mt-1">Discover your next skill from 1,000+ online courses</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search courses, instructors..."
              className="w-full md:w-80 pl-12 pr-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-indigo-500 transition-colors shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        <button className="px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm shadow-lg shadow-slate-950/20 whitespace-nowrap">
          All Topics
        </button>
        {categories.map(cat => (
          <button key={cat} className="px-6 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm whitespace-nowrap hover:border-indigo-500 hover:text-indigo-500 transition-colors shadow-sm">
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
        {/* Repeat some for visual density if needed */}
        {[1, 2, 3].map(i => (
          <CourseCard key={`extra-${i}`} course={{...courses[i-1], id: i+10}} />
        ))}
      </div>
    </div>
  )
}

export default StudentExplore
