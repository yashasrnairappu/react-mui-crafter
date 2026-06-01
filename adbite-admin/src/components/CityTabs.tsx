import { motion } from 'framer-motion'
import { Location } from '../api'

interface CityTabsProps {
  locations: Location[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export const CityTabs = ({ locations, activeFilter, onFilterChange }: CityTabsProps) => {
  const cities = ['All', ...Array.from(new Set(locations.map((l) => l.city))).sort()]

  const getCount = (filter: string) =>
    filter === 'All'
      ? locations.length
      : locations.filter((l) => l.city === filter).length

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {cities.map((tab) => {
        const count = getCount(tab)
        const isActive = activeFilter === tab

        return (
          <motion.button
            key={tab}
            whileTap={{ scale: 0.96 }}
            onClick={() => onFilterChange(tab)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-dm font-500 whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-[#E8181E] text-white shadow-lg shadow-red-900/30'
                : 'bg-white/5 text-white/40 hover:bg-white/8 hover:text-white/70'
            }`}
          >
            <span>{tab}</span>
            <span
              className={`text-xs rounded-md px-1.5 py-0.5 font-500 ${
                isActive ? 'bg-white/20 text-white' : 'bg-white/8 text-white/30'
              }`}
            >
              {count}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}