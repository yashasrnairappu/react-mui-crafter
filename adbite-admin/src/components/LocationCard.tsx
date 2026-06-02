import { motion } from 'framer-motion'
import { Edit2, Trash2, Users, Clock, Activity, Image as ImageIcon, MapPin, Images } from 'lucide-react'
import { Location } from '../api'

interface LocationCardProps {
  location: Location
  index: number
  onEdit: (location: Location) => void
  onDelete: (location: Location) => void
}

const cityColors: Record<string, string> = {
  Pathanamthitta: '#E8181E',
  Kottayam: '#E87818',
  Alappuzha: '#1878E8',
}

export const LocationCard = ({ location, index, onEdit, onDelete }: LocationCardProps) => {
  const hasImages = location.images.length > 0
  const color = cityColors[location.city] || '#E8181E'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-[#1C1C1C] border border-white/8 hover:border-white/15 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-black/40 cursor-default"
    >
      {/* Image section */}
      <div className="relative h-44 bg-[#141414] overflow-hidden">
        {hasImages ? (
          <>
            <motion.img
              src={location.images[0]}
              alt={location.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-white/20">
            <ImageIcon className="w-10 h-10" />
            <span className="font-dm text-xs">No photos yet</span>
          </div>
        )}

        {/* City badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-xs font-dm font-500"
          style={{ background: `${color}dd`, border: `1px solid ${color}` }}
        >
          <MapPin className="w-3 h-3" />
          {location.city}
        </div>

        {/* Photo count */}
        {location.images.length > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-dm">
            <Images className="w-3 h-3" />
            {location.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-syne font-600 text-white text-base mb-3 truncate">{location.name}</h3>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {location.stats.seats && (
            <div className="flex flex-col gap-1 bg-white/4 rounded-xl p-2.5">
              <Users className="w-3 h-3 text-white/30" />
              <span className="font-syne font-600 text-white text-sm">{location.stats.seats}</span>
              <span className="font-dm text-white/30 text-[10px]">seats</span>
            </div>
          )}
          {location.stats.footfall && (
            <div className="flex flex-col gap-1 bg-white/4 rounded-xl p-2.5">
              <Activity className="w-3 h-3 text-white/30" />
              <span className="font-syne font-600 text-white text-sm">{location.stats.footfall}</span>
              <span className="font-dm text-white/30 text-[10px]">footfall</span>
            </div>
          )}
          {location.stats.time && (
            <div className="flex flex-col gap-1 bg-white/4 rounded-xl p-2.5">
              <Clock className="w-3 h-3 text-white/30" />
              <span className="font-syne font-600 text-white text-xs leading-tight">{location.stats.time}</span>
              <span className="font-dm text-white/30 text-[10px]">hours</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onEdit(location)}
            className="flex-1 flex items-center justify-center gap-2 bg-white/6 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/70 hover:text-white text-sm font-dm py-2 rounded-xl transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onDelete(location)}
            className="w-9 h-9 flex items-center justify-center bg-red-500/8 hover:bg-red-500/15 border border-red-500/15 hover:border-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
