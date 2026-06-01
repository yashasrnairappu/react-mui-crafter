import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'
import { useAuth } from '../context/AuthContext'

export const LoginPage = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { setAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    console.log(password);
    
    e.preventDefault()
    if (!password.trim()) { setError('Please enter your password'); return }
    setIsLoading(true)
    setError('')

    try {
      await login(password)
      setAuthenticated(true)
      navigate('/')
    } catch {
      setError('Incorrect password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #E8181E 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #E8181E 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/60">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-[#E8181E]/15 border border-[#E8181E]/25 rounded-xl flex items-center justify-center mr-3">
                <span className="font-syne font-800 text-[#E8181E] text-xl">A</span>
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-syne font-800 text-white text-2xl tracking-tight">Ad</span>
                  <span className="font-syne font-800 text-[#E8181E] text-2xl tracking-tight">bite</span>
                </div>
                <span className="font-dm text-white/30 text-xs tracking-widest uppercase">Indoor Advertising</span>
              </div>
            </div>
            <h1 className="font-syne font-600 text-white text-xl">Admin Panel</h1>
            <p className="font-dm text-white/35 text-sm mt-1">Sign in to manage your locations</p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block font-dm text-white/50 text-xs mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full bg-[#1C1C1C] border border-white/8 hover:border-white/15 focus:border-white/25 text-white placeholder-white/20 font-dm text-sm px-4 py-3 pr-12 rounded-xl outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 bg-[#E8181E]/10 border border-[#E8181E]/25 text-[#E8181E] text-sm font-dm px-4 py-3 rounded-xl overflow-hidden"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E8181E] hover:bg-[#c91419] disabled:opacity-60 disabled:cursor-not-allowed text-white font-dm font-500 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.form>
        </div>

        <p className="text-center font-dm text-white/15 text-xs mt-5">
          Adbite · Kerala, India
        </p>
      </motion.div>
    </div>
  )
}
