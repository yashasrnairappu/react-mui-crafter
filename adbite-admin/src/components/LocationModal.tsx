import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Plus, MapPin } from 'lucide-react'
import { Location, City, LocationStats, createLocation, updateLocation, getCities } from '../api'

interface LocationModalProps {
  isOpen: boolean
  location: Location | null
  onClose: () => void
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

const emptyStats: LocationStats = {
  seats: '',
  bills: '',
  time: '',
  footfall: '',
  size: '',
  nearestPlaces: '',
}

export const LocationModal = ({ isOpen, location, onClose, onSuccess, onError }: LocationModalProps) => {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')        // the typed/selected city string
  const [cities, setCities] = useState<City[]>([])  // City[] from DB for suggestions
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [stats, setStats] = useState<LocationStats>(emptyStats)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [newPreviews, setNewPreviews] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const isEdit = !!location

  // Fetch cities for suggestions whenever modal opens
  useEffect(() => {
    if (isOpen) {
      getCities()
        .then(res => setCities(res.data.cities))
        .catch(() => {})
    }
  }, [isOpen])

  // Populate fields on edit, reset on add
  useEffect(() => {
    if (isOpen) {
      if (location) {
        setName(location.name)
        setCity(location.city)
        setStats(location.stats)
        setExistingImages(location.images)
      } else {
        setName('')
        setCity('')
        setStats(emptyStats)
        setExistingImages([])
      }
      setNewImages([])
      setNewPreviews([])
      setError('')
    }
  }, [isOpen, location])

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setNewImages(prev => [...prev, ...files])
    setNewPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
    e.target.value = ''
  }

  const removeExisting = (url: string) =>
    setExistingImages(prev => prev.filter(u => u !== url))

  const removeNew = (idx: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== idx))
    setNewPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  const handleStat = (key: keyof LocationStats, val: string) =>
    setStats(prev => ({ ...prev, [key]: val }))

  // Filter City[] objects by typed value
  const suggestions = city.trim()
    ? cities.filter(c => c.name.toLowerCase().includes(city.toLowerCase()))
    : cities

  // True when typed value doesn't match any existing city name
  const isNewCity = city.trim() !== '' && !cities.some(
    c => c.name.toLowerCase() === city.trim().toLowerCase()
  )

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Location name is required'); return }
    if (!city.trim()) { setError('City is required'); return }
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('city', city.trim())
      formData.append('stats', JSON.stringify(stats))

      if (isEdit) {
        formData.append('existingImages', JSON.stringify(existingImages))
      }

      newImages.forEach(file => formData.append('images', file))

      if (isEdit && location) {
        await updateLocation(location._id, formData)
        onSuccess('Location updated successfully')
      } else {
        await createLocation(formData)
        onSuccess('Location added successfully')
      }
      onClose()
    } catch {
      setError('Failed to save location. Please try again.')
      onError('Failed to save location')
    } finally {
      setIsLoading(false)
    }
  }

  const statFields: { key: keyof LocationStats; label: string; placeholder: string }[] = [
    { key: 'seats',         label: 'Seats',           placeholder: 'e.g. 120' },
    { key: 'bills',         label: 'Bills / Month',   placeholder: 'e.g. ₹15,000' },
    { key: 'time',          label: 'Operating Hours', placeholder: 'e.g. 9AM – 9PM' },
    { key: 'footfall',      label: 'Footfall / Day',  placeholder: 'e.g. 500+' },
    { key: 'size',          label: 'Screen Size',     placeholder: 'e.g. 55"' },
    { key: 'nearestPlaces', label: 'Nearest Places',  placeholder: 'e.g. Town Hall, Bus Stand' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#141414] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
              <h2 className="font-syne font-600 text-white text-lg">
                {isEdit ? 'Edit Location' : 'Add Location'}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Basic info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block font-dm text-white/50 text-xs mb-2 uppercase tracking-wide">
                    Location Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Central Mall Food Court"
                    className="w-full bg-[#1C1C1C] border border-white/8 hover:border-white/15 focus:border-white/25 text-white placeholder-white/25 font-dm text-sm px-4 py-3 rounded-xl outline-none transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block font-dm text-white/50 text-xs mb-2 uppercase tracking-wide">
                    City *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={city}
                      onChange={e => { setCity(e.target.value); setShowSuggestions(true) }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                      placeholder="Type or add a new city"
                      className="w-full bg-[#1C1C1C] border border-white/8 hover:border-white/15 focus:border-white/25 text-white placeholder-white/25 font-dm text-sm px-4 py-3 rounded-xl outline-none transition-colors"
                    />

                    <AnimatePresence>
                      {showSuggestions && (suggestions.length > 0 || isNewCity) && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute top-full left-0 right-0 mt-1 bg-[#1C1C1C] border border-white/10 rounded-xl overflow-hidden z-10 shadow-xl"
                        >
                          {/* Existing city matches — use c.name not c */}
                          {suggestions.map(c => (
                            <button
                              key={c.name}
                              type="button"
                              onMouseDown={() => { setCity(c.name); setShowSuggestions(false) }}
                              className="w-full text-left px-4 py-2.5 font-dm text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                            >
                              <MapPin className="w-3 h-3 text-white/30 shrink-0" />
                              <span className="flex-1">{c.name}</span>
                              <span className="font-dm text-xs text-white/25">
                                {c.count} {c.count === 1 ? 'location' : 'locations'}
                              </span>
                            </button>
                          ))}

                          {/* New city */}
                          {isNewCity && (
                            <button
                              type="button"
                              onMouseDown={() => setShowSuggestions(false)}
                              className="w-full text-left px-4 py-2.5 font-dm text-sm text-[#E8181E] hover:bg-white/5 transition-colors flex items-center gap-2 border-t border-white/8"
                            >
                              <Plus className="w-3 h-3 shrink-0" />
                              Add new city "{city.trim()}"
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block font-dm text-white/50 text-xs mb-3 uppercase tracking-wide">
                  Photos
                </label>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map(url => (
                    <div key={url} className="relative group">
                      <img src={url} alt="location" className="w-24 h-24 object-cover rounded-xl border border-white/10" />
                      <div className="absolute top-1 left-1 bg-emerald-500/80 text-white text-[9px] font-dm px-1.5 py-0.5 rounded-md">
                        saved
                      </div>
                      <button
                        onClick={() => removeExisting(url)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E8181E] hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}

                  {newPreviews.map((preview, idx) => (
                    <div key={preview} className="relative group">
                      <img src={preview} alt="new" className="w-24 h-24 object-cover rounded-xl border border-[#E8181E]/30" />
                      <div className="absolute top-1 left-1 bg-[#E8181E]/80 text-white text-[9px] font-dm px-1.5 py-0.5 rounded-md">
                        new
                      </div>
                      <button
                        onClick={() => removeNew(idx)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E8181E] hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-24 h-24 rounded-xl border-2 border-dashed border-white/15 hover:border-white/30 bg-white/3 hover:bg-white/6 flex flex-col items-center justify-center gap-1.5 text-white/30 hover:text-white/60 transition-all"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="font-dm text-[10px]">Add photo</span>
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
                </div>
              </div>

              {/* Stats */}
              <div>
                <label className="block font-dm text-white/50 text-xs mb-3 uppercase tracking-wide">
                  Location Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {statFields.map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block font-dm text-white/40 text-xs mb-1.5">{label}</label>
                      <input
                        type="text"
                        value={stats[key]}
                        onChange={e => handleStat(key, e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-[#1C1C1C] border border-white/8 hover:border-white/15 focus:border-white/25 text-white placeholder-white/20 font-dm text-sm px-3.5 py-2.5 rounded-xl outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-dm text-[#E8181E] text-sm bg-[#E8181E]/10 border border-[#E8181E]/20 px-4 py-3 rounded-xl"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/8 shrink-0">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/60 hover:text-white font-dm text-sm transition-all"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-[#E8181E] hover:bg-[#c91419] disabled:opacity-50 disabled:cursor-not-allowed text-white font-dm text-sm font-500 flex items-center gap-2 transition-colors"
              >
                {isLoading
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Plus className="w-4 h-4" />
                }
                {isEdit ? 'Save Changes' : 'Add Location'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}