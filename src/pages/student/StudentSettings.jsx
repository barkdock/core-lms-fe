import { motion } from 'framer-motion'
import { User, Bell, Shield, Laptop, Moon, AppWindow, HelpCircle, Save, ChevronRight, Check } from 'lucide-react'
import { useState } from 'react'

const SettingItem = ({ icon: Icon, title, desc, action }) => (
  <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-indigo-500/50 transition-all">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
        <Icon size={22} />
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 font-medium">{desc}</p>
      </div>
    </div>
    {action || <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500" />}
  </div>
)

const StudentSettings = () => {
  const [switches, setSwitches] = useState({ emailNotify: true, browserNotify: false, publicProfile: true })

  const toggleSwitch = (key) => setSwitches(s => ({ ...s, [key]: !s[key] }))

  const Switch = ({ active, onToggle }) => (
    <button 
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${active ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      <motion.div 
        animate={{ x: active ? 26 : 2 }}
        className="absolute top-1 left-0 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </button>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences and security options</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 px-2 lg:px-4">Account & Profile</h2>
        <SettingItem 
          icon={User} 
          title="Personal Information" 
          desc="Update your name, bio, and contact details shared with instructors" 
        />
        <SettingItem 
          icon={Shield} 
          title="Password & Security" 
          desc="Manage two-factor authentication and change account password" 
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 px-2 lg:px-4">Notifications</h2>
        <SettingItem 
          icon={Bell} 
          title="Email Notifications" 
          desc="Receive weekly progress reports and course updates via email" 
          action={<Switch active={switches.emailNotify} onToggle={() => toggleSwitch('emailNotify')} />}
        />
        <SettingItem 
           icon={AppWindow} 
           title="Push Notifications" 
           desc="Get real-time browser alerts for new lessons and messages" 
           action={<Switch active={switches.browserNotify} onToggle={() => toggleSwitch('browserNotify')} />}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 px-2 lg:px-4">Preferences</h2>
        <SettingItem 
           icon={Moon} 
           title="Dark Mode Experience" 
           desc="Toggle between dark and light themes for a better viewing comfort" 
           action={<Switch active={true} onToggle={() => {}} />} // Controlled by layout usually
        />
        <SettingItem 
           icon={Laptop} 
           title="Login Sessions" 
           desc="View and manage all active devices currently logged into your account" 
        />
      </div>

      <div className="pt-8">
         <button className="w-full py-4 rounded-3xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:scale-[1.02] transition-transform shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3">
            <Save size={20} />
            Save Configuration
         </button>
         <p className="text-[10px] text-center mt-4 text-slate-400 font-black uppercase tracking-widest">Changes are automatically applied across all devices</p>
      </div>
    </div>
  )
}

export default StudentSettings
