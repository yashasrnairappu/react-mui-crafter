import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { City, getCities } from '../api'

const COLOR_PALETTE = [
  '#E8181E',
  '#E87818',
  '#1878E8',
  '#18E878',
  '#8818E8',
  '#E8D018',
]

interface StatsBarProps {
  activeCity: string | 'All'
  onCityClick: (city: string) => void
  refreshKey?: number  // bump this from parent after add/edit/delete to re-fetch
}

export const StatsBar = ({ activeCity, onCityClick, refreshKey }: StatsBarProps) => {
  const [cities, setCities] = useState<City[]>([])

  useEffect(() => {
    getCities()
      .then(res => setCities(res.data.cities))
      .catch(() => {})
  }, [refreshKey])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cities.map((city, i) => {
        const isActive = activeCity === city.name
        const color = COLOR_PALETTE[i % COLOR_PALETTE.length]

        return (
          <motion.button
            key={city.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCityClick(city.name)}
            className={`relative overflow-hidden text-left p-5 rounded-2xl border transition-all duration-200 ${
              isActive
                ? 'bg-[#1C1C1C] border-white/20 shadow-lg'
                : 'bg-[#1C1C1C] border-white/8 hover:border-white/15'
            }`}
          >
            {/* Active glow */}
            {isActive && (
              <div
                className="absolute inset-0 opacity-10 rounded-2xl"
                style={{ background: `radial-gradient(circle at 20% 50%, ${color}, transparent 70%)` }}
              />
            )}

            <div className="relative flex items-center justify-between">
              <div>
                <p className="font-dm text-white/40 text-xs mb-1 uppercase tracking-wider">
                  {city.name}
                </p>
                <p className="font-syne font-700 text-3xl text-white">
                  {city.count}
                </p>
                <p className="font-dm text-white/30 text-xs mt-1">
                  {city.count === 1 ? 'location' : 'locations'}
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}22`, border: `1px solid ${color}33` }}
              >
                <MapPin className="w-4 h-4" style={{ color }} />
              </div>
            </div>

            {/* Active indicator line */}
            {isActive && (
              <motion.div
                layoutId="stats-active"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
                style={{ background: color }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}