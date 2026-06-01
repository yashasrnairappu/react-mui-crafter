import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Receipt,
  Clock,
  TrendingUp,
  Monitor,
  Navigation,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { getSingleLocation, Location } from "../api";

const LocationDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [venue, setVenue] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    getSingleLocation(id)
      .then((res) => setVenue(res.data.location))
      .catch(() => setError('Location not found'))
      .finally(() => setIsLoading(false))
  }, [id])

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-4 animate-pulse">
              <div className="h-[420px] bg-[#1C1C1C] rounded-2xl" />
              <div className="h-12 bg-[#1C1C1C] rounded-xl" />
            </div>
            <div className="space-y-4 animate-pulse">
              <div className="h-12 bg-[#1C1C1C] rounded-xl w-3/4" />
              <div className="h-4 bg-[#1C1C1C] rounded-lg w-1/2" />
              <div className="space-y-[1px]">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-[#1C1C1C]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !venue) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center flex-col gap-4">
        <p className="text-white/40 font-dm text-lg">Location not found</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#E8181E] font-dm text-sm hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Go back
        </button>
      </div>
    )
  }

  const hasMultipleImages = venue.images.length > 1

  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? venue.images.length - 1 : prev - 1))

  const nextImage = () =>
    setCurrentImage((prev) => (prev === venue.images.length - 1 ? 0 : prev + 1))

  const stats = [
    { label: "Seats", value: venue.stats?.seats, icon: <Users className="w-4 h-4" /> },
    { label: "Bills", value: venue.stats?.bills, icon: <Receipt className="w-4 h-4" /> },
    { label: "Time", value: venue.stats?.time, icon: <Clock className="w-4 h-4" /> },
    { label: "Footfall / Day", value: venue.stats?.footfall, icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Screen Size", value: venue.stats?.size, icon: <Monitor className="w-4 h-4" /> },
    { label: "Nearest Places", value: venue.stats?.nearestPlaces, icon: <Navigation className="w-4 h-4" /> },
  ].filter((s) => s.value)

  return (
    <div className="min-h-screen bg-[#0C0C0C]">

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-6 py-4 border-b border-white/8 bg-[#0C0C0C]/90 backdrop-blur-sm sticky top-[65px] z-40"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-dm font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-white/20">/</span>
          <span className="text-white/40 text-sm font-dm">{venue.city}</span>
          <span className="text-white/20">/</span>
          <span className="text-white text-sm font-dm font-medium">{venue.name}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-4 h-4 text-[#E8181E]" />
              <span className="text-[#E8181E] text-xs font-bold tracking-[0.12em] uppercase font-dm">
                {venue.city}
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-[#1C1C1C] border border-white/8 group">
              <div className="relative h-[420px]">
                {venue.images.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={venue.images[currentImage]}
                      alt={`${venue.name} - ${currentImage + 1}`}
                      className="w-full h-full object-contain absolute inset-0"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 font-dm text-sm">
                    No photos available
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/70 via-transparent to-transparent pointer-events-none" />

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#E8181E] border border-white/10 flex items-center justify-center text-white transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#E8181E] border border-white/10 flex items-center justify-center text-white transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#E8181E] text-white text-xs font-bold tracking-[0.1em] uppercase font-dm px-3 py-1.5 rounded-md">
                    Adbite Partner
                  </span>
                </div>

                {hasMultipleImages && (
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-dm font-medium px-3 py-1.5 rounded-full border border-white/10">
                    {currentImage + 1} / {venue.images.length}
                  </div>
                )}
              </div>

              {hasMultipleImages && (
                <div className="flex items-center justify-center gap-2 py-4 bg-[#141414]">
                  {venue.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`transition-all duration-300 rounded-full cursor-pointer border-none ${
                        i === currentImage
                          ? "w-6 h-2 bg-[#E8181E]"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {venue.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      i === currentImage
                        ? "border-[#E8181E] scale-105"
                        : "border-white/10 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* WhatsApp button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                window.open(
                  `https://wa.me/916282359567?text=Hi%2C%20I%27m%20interested%20in%20advertising%20at%20${encodeURIComponent(venue.name)}`,
                  "_blank"
                )
              }
              className="mt-5 w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white font-bold font-dm text-sm px-6 py-4 rounded-xl transition-colors duration-200 cursor-pointer border-none"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Advertise at {venue.name}
            </motion.button>
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-white leading-tight mb-3">
              {venue.name}
            </h1>
            <p className="text-white/40 font-dm text-sm mb-10">
              Premium indoor advertising location in {venue.city}, Kerala
            </p>

            {/* Stats */}
            <div className="flex flex-col gap-[1px] bg-white/5 rounded-2xl overflow-hidden">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  className="flex items-center justify-between bg-[#141414] hover:bg-[#1C1C1C] px-6 py-5 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E8181E]/10 flex items-center justify-center text-[#E8181E] group-hover:bg-[#E8181E]/20 transition-colors duration-200">
                      {stat.icon}
                    </div>
                    <span className="text-white/60 font-dm text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-[#E8181E] font-syne font-bold text-lg">{stat.value}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                window.open(
                  `https://wa.me/916282359567?text=Hi%2C%20I%27m%20interested%20in%20advertising%20at%20${encodeURIComponent(venue.name)}`,
                  "_blank"
                )
              }
              className="mt-6 w-full bg-[#E8181E] hover:bg-[#B91219] text-white font-bold font-dm text-sm py-4 rounded-xl transition-colors duration-200 cursor-pointer border-none shadow-[0_4px_24px_rgba(232,24,30,0.3)]"
            >
              Contact Us to Advertise Here →
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default LocationDetailPage;