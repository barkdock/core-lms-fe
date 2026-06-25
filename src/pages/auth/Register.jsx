import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, Loader2, CheckCircle2,
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import AuthLayout from '@/layouts/AuthLayout'
import { useAuth } from '@/hooks/useAuth'
import { registerSchema } from '@/utils/validators'
import { clearError } from '@/store/authSlice'

/** Password strength indicator */
const PasswordStrength = ({ password }) => {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
  ]
  return (
    <div className="flex gap-2 mt-2">
      {checks.map((c) => (
        <div key={c.label} className="flex items-center gap-1 text-[10px] font-medium">
          <div className={`w-1.5 h-1.5 rounded-full ${c.pass ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
          <span className={c.pass ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>{c.label}</span>
        </div>
      ))}
    </div>
  )
}

const InputField = ({ id, label, icon: Icon, type = 'text', placeholder, registration, error, rightElement, autoComplete }) => (
  <div>
    <label htmlFor={id} className="label">{label}</label>
    <div className="relative">
      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registration}
        className={`input-field pl-10 ${rightElement ? 'pr-11' : ''} ${error ? 'input-error' : ''}`}
      />
      {rightElement}
    </div>
    {error && (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <AlertCircle size={12} /> {error}
      </p>
    )}
  </div>
)

const Register = () => {
  const { register: registerUser } = useAuth()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '' },
  })

  const password = watch('password', '')

  const onSubmit = async (data) => {
    dispatch(clearError())
    await registerUser(data)
  }

  const handleGoogleLogin = () => {
    const googleAuthUrl =
      import.meta.env.VITE_GOOGLE_AUTH_URL || 'http://localhost:8080/api/v1/auth/google'
    window.location.href = googleAuthUrl
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join 50,000+ learners on EduFlow"
    >
      {/* Server error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl
            bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
        >
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Full Name */}
        <InputField
          id="fullName"
          label="Full Name"
          icon={User}
          placeholder="John Doe"
          autoComplete="name"
          registration={register('fullName')}
          error={errors.fullName?.message}
        />

        {/* Email */}
        <InputField
          id="email"
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          registration={register('email')}
          error={errors.email?.message}
        />

        {/* Phone */}
        <InputField
          id="phone"
          label="Phone Number"
          icon={Phone}
          type="tel"
          placeholder="+84 123 456 789"
          autoComplete="tel"
          registration={register('phone')}
          error={errors.phone?.message}
        />

        {/* Password */}
        <div>
          <label htmlFor="password" className="label">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 8 chars, uppercase & number"
              autoComplete="new-password"
              {...register('password')}
              className={`input-field pl-10 pr-11 ${errors.password ? 'input-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {password && <PasswordStrength password={password} />}
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.password.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          By creating an account you agree to our{' '}
          <a href="#" className="text-primary-600 hover:underline font-medium">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary-600 hover:underline font-medium">Privacy Policy</a>.
        </p>

        {/* Submit */}
        <button type="submit" disabled={isLoading} className="btn-primary w-full">
          {isLoading ? (
            <><Loader2 size={16} className="animate-spin" /> Creating account…</>
          ) : (
            <><CheckCircle2 size={16} /> Create Account</>
          )}
        </button>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-100 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-4 h-4"
            />
            <span>Continue with Google</span>
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-600 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Register
