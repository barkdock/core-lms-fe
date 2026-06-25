import { motion } from 'framer-motion'
import { Award, Download, Share2, Search, Filter, Trophy } from 'lucide-react'

const StudentCertificates = () => {
  const certificates = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      date: 'Dec 15, 2023',
      grade: 'A+',
      instructor: 'Dr. Sarah Smith',
      image: 'https://images.unsplash.com/photo-1589330694653-90d29940306e?w=800&q=80',
      isVerified: true
    },
    {
      id: 2,
      title: 'Mastering React & Redux',
      date: 'Nov 02, 2023',
      grade: 'Distinction',
      instructor: 'Alex Rivera',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43552e?w=800&q=80',
      isVerified: true
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">E-Certificates</h1>
          <p className="text-slate-500 mt-1">Official validation of your skills and achievements</p>
        </div>
        <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500 border border-amber-100 dark:border-amber-900/40">
           <Trophy size={32} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all"
          >
            {/* Certificate Visual */}
            <div className="relative h-64 bg-slate-50 dark:bg-slate-800 p-8 flex items-center justify-center">
               <div className="relative w-full h-full border-[10px] border-white dark:border-slate-900 shadow-2xl rounded-sm group-hover:scale-105 transition-transform duration-500">
                  <img src={cert.image} alt="certificate" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/10" />
                  {/* Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white rotate-12">
                     <Award size={20} />
                  </div>
               </div>
               
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-4 rounded-2xl bg-white text-slate-900 font-bold flex items-center gap-2 hover:scale-110 transition-transform">
                     <Download size={20} />
                  </button>
                  <button className="p-4 rounded-2xl bg-white text-slate-900 font-bold flex items-center gap-2 hover:scale-110 transition-transform">
                     <Share2 size={20} />
                  </button>
               </div>
            </div>

            <div className="p-8">
               <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">{cert.id.toString().padStart(2, '0')} CERTIFICATE</span>
                  <span className="text-xs text-slate-400 font-medium">{cert.date}</span>
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-1">{cert.title}</h3>
               
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instructor</p>
                     <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{cert.instructor}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grade Awarded</p>
                     <p className="text-sm font-black text-emerald-500">{cert.grade}</p>
                  </div>
               </div>
               
               <button className="mt-8 w-full py-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  View Full Details
               </button>
            </div>
          </motion.div>
        ))}

        {/* Empty Slot / Goal */}
        <div className="rounded-[2.5rem] border-4 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-12 text-center opacity-60 hover:opacity-100 transition-opacity">
           <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 mb-6">
              <Award size={40} />
           </div>
           <h3 className="text-lg font-bold text-slate-400 mb-2">Complete Your Next Course</h3>
           <p className="text-sm text-slate-400 max-w-[200px]">Unlock more certificates by completing active enrollments</p>
        </div>
      </div>
    </div>
  )
}

export default StudentCertificates
