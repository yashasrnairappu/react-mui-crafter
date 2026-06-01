import { motion } from 'framer-motion'
import { MapPin, Plus, RefreshCw, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  locationCount: number
  onAddLocation: () => void
  onRefresh: () => void
  isRefreshing: boolean
}

export const Navbar = ({ locationCount, onAddLocation, onRefresh, isRefreshing }: NavbarProps) => {
  const { logout } = useAuth()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-white/8"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo + info */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-baseline">
              <span className="font-syne font-800 text-xl text-white tracking-tight">Ad</span>
              <span className="font-syne font-800 text-xl text-[#E8181E] tracking-tight">bite</span>
            </div>
            <span className="bg-white/8 border border-white/10 text-white/50 text-[10px] font-dm font-500 px-2 py-0.5 rounded-md tracking-widest uppercase">
              Admin
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-white/30 text-xs font-dm">
            <MapPin className="w-3 h-3" />
            <span>{locationCount} locations · Location Manager</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onAddLocation}
            className="flex items-center gap-2 bg-[#E8181E] hover:bg-[#c91419] text-white text-sm font-dm font-500 px-4 py-2 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Location</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={onRefresh}
            disabled={isRefreshing}
            className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/60 hover:text-white rounded-xl transition-all"
          >
            <motion.div
              animate={{ rotate: isRefreshing ? 360 : 0 }}
              transition={{ duration: 0.8, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={logout}
            className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/60 hover:text-white rounded-xl transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
