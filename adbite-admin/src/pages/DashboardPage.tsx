import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Search } from 'lucide-react'
import { Location, getLocations } from '../api'
import { Navbar } from '../components/Navbar'
import { StatsBar } from '../components/StatsBar'
import { CityTabs } from '../components/CityTabs'
import { LocationCard } from '../components/LocationCard'
import { LocationModal } from '../components/LocationModal'
import { DeleteModal } from '../components/DeleteModal'
import { ToastContainer } from '../components/Toast'
import { useToast } from '../hooks/useToast'

type Filter = string | 'All'

export const DashboardPage = () => {
  const [locations, setLocations]           = useState<Location[]>([])
  const [filter, setFilter]                 = useState<Filter>('All')
  const [searchQuery, setSearchQuery]       = useState('')
  const [isLoading, setIsLoading]           = useState(true)
  const [isRefreshing, setIsRefreshing]     = useState(false)
  const [addModalOpen, setAddModalOpen]     = useState(false)
  const [editLocation, setEditLocation]     = useState<Location | null>(null)
  const [deleteLocation, setDeleteLocation] = useState<Location | null>(null)
  const { toasts, addToast, removeToast }   = useToast()

  // ─── Fetch ────────────────────────────────────────────
  const fetchLocations = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true)
    else setIsLoading(true)
    try {
      const res = await getLocations()
      setLocations(res.data.locations)
    } catch {
      addToast('Failed to load locations', 'error')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [addToast])

  useEffect(() => { fetchLocations() }, [fetchLocations])

  // ─── Handlers ─────────────────────────────────────────
  const handleSuccess = (message: string) => {
    addToast(message, 'success')
    fetchLocations(true)
  }

  const handleError   = (message: string) => addToast(message, 'error')

  const handleCityStatClick = (city: string) =>
    setFilter(prev => prev === city ? 'All' : city)

  // ─── Filter ───────────────────────────────────────────
  const filteredLocations = locations.filter((l) => {
    const matchesCity   = filter === 'All' || l.city === filter
    const matchesSearch = !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCity && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0C0C0C]">
      <Navbar
        locationCount={locations.length}
        onAddLocation={() => setAddModalOpen(true)}
        onRefresh={() => fetchLocations(true)}
        isRefreshing={isRefreshing}
      />

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8">

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatsBar
            activeCity={filter}
            onCityClick={handleCityStatClick}
            refreshKey={locations.length}
          />
        </motion.div>

        {/* Filters + Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <CityTabs
            locations={locations}
            activeFilter={filter}
            onFilterChange={setFilter}
          />
          <div className="relative sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locations..."
              className="w-full sm:w-56 bg-white/5 border border-white/8 hover:border-white/15 focus:border-white/25 text-white placeholder-white/25 font-dm text-sm pl-9 pr-4 py-2 rounded-xl outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Grid / Skeleton / Empty */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#1C1C1C] border border-white/8 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-white/5" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-white/5 rounded-lg w-3/4" />
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-14 bg-white/5 rounded-xl" />
                    ))}
                  </div>
                  <div className="h-9 bg-white/5 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredLocations.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-white/20" />
            </div>
            <h3 className="font-syne font-semibold text-white/50 text-lg mb-2">No locations found</h3>
            <p className="font-dm text-white/25 text-sm">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : filter !== 'All'
                ? `No locations in ${filter} yet`
                : 'Add your first location to get started'}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredLocations.map((location, i) => (
                <LocationCard
                  key={location._id}
                  location={location}
                  index={i}
                  onEdit={(loc) => setEditLocation(loc)}
                  onDelete={(loc) => setDeleteLocation(loc)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Count */}
        {!isLoading && filteredLocations.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center font-dm text-white/20 text-xs pb-4"
          >
            Showing {filteredLocations.length} of {locations.length} locations
          </motion.p>
        )}
      </main>

      {/* Add Modal */}
      <LocationModal
        isOpen={addModalOpen}
        location={null}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleSuccess}
        onError={handleError}
      />

      {/* Edit Modal */}
      <LocationModal
        isOpen={!!editLocation}
        location={editLocation}
        onClose={() => setEditLocation(null)}
        onSuccess={handleSuccess}
        onError={handleError}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteLocation}
        location={deleteLocation}
        onClose={() => setDeleteLocation(null)}
        onSuccess={handleSuccess}
        onError={handleError}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}