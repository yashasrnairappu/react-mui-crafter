import { motion, AnimatePresence } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Location, deleteLocation } from '../api'
import { useState } from 'react'

interface DeleteModalProps {
  isOpen: boolean
  location: Location | null
  onClose: () => void
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export const DeleteModal = ({ isOpen, location, onClose, onSuccess, onError }: DeleteModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (!location) return
    setIsLoading(true)
    try {
      await deleteLocation(location._id)
      onSuccess(`${location.name} has been deleted`)
      onClose()
    } catch {
      onError('Failed to delete location')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && location && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="relative w-full max-w-sm bg-[#141414] border border-white/10 rounded-2xl p-6 text-center"
          >
            {/* Icon */}
            <div className="w-14 h-14 bg-[#E8181E]/15 border border-[#E8181E]/25 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-[#E8181E]" />
            </div>

            <h3 className="font-syne font-600 text-white text-lg mb-2">Delete Location?</h3>
            <p className="font-dm text-white/40 text-sm mb-1">
              You're about to permanently delete
            </p>
            <p className="font-syne font-600 text-white text-base mb-5">
              "{location.name}"
            </p>
            <p className="font-dm text-white/30 text-xs mb-6">
              This action cannot be undone. All images and data will be removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/60 hover:text-white font-dm text-sm transition-all"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 py-2.5 rounded-xl bg-[#E8181E] hover:bg-[#c91419] disabled:opacity-50 text-white font-dm text-sm font-500 flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
