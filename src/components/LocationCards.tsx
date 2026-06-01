import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocations, Location } from "../api";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


const groupByCity = (locations: Location[]) => {
  return locations.reduce<Record<string, Location[]>>((acc, loc) => {
    if (!acc[loc.city]) acc[loc.city] = []
    acc[loc.city].push(loc)
    return acc
  }, {})
}

const LocationCards = () => {
  const navigate = useNavigate();
  const [grouped, setGrouped] = useState<Record<string, Location[]>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getLocations()
      .then((res) => {
        const active = res.data.locations.filter((l) => l.isActive !== false)
        setGrouped(groupByCity(active))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const handleRedirect = (citySlug: string, locationName: string, locationId: string) => {
    navigate(
      `/locations/${citySlug}/${locationId}`
    );
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <section className="py-24 px-6 bg-[#141414]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#1C1C1C] rounded-2xl border border-white/8 overflow-hidden animate-pulse">
              <div className="p-7 border-b border-white/8">
                <div className="h-7 bg-white/5 rounded-lg w-1/2 mb-3" />
                <div className="h-4 bg-white/5 rounded-lg w-full mb-2" />
                <div className="h-4 bg-white/5 rounded-lg w-3/4" />
              </div>
              <div className="p-7 flex flex-col gap-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-11 bg-white/5 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const cities = Object.keys(grouped).sort()

  return (
    <section id="locations" className="py-24 px-6 bg-[#141414] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E8181E]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#E8181E]" />
            <span className="text-[#E8181E] text-xs font-bold tracking-[0.14em] uppercase font-dm">
              Our Network
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Adbite <span className="text-[#E8181E]">Locations</span>
            </h2>
            <p className="text-white/40 text-base font-dm leading-relaxed max-w-sm lg:text-right">
              Choose your preferred location to start your advertising campaign
              across Kerala's busiest dining spots.
            </p>
          </div>
        </motion.div>

        {/* Location Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {cities.map((city) => {
            const cityLocations = grouped[city]
            const count = cityLocations.length

            return (
              <motion.div
                key={city}
                variants={cardVariants}
                className="group bg-[#1C1C1C] rounded-2xl border border-white/8 overflow-hidden hover:border-[#E8181E]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] flex flex-col"
              >
                {/* Card Header */}
                <div className="p-7 border-b border-white/8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-syne font-extrabold text-2xl text-white">
                      {city}
                    </h3>
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase font-dm text-[#E8181E] bg-[#E8181E]/10 px-3 py-1 rounded-full border border-[#E8181E]/20">
                      {count} {count === 1 ? 'Venue' : 'Venues'}
                    </span>
                  </div>
                  <p className="text-white/45 text-sm font-dm leading-relaxed">
                    Reach your audience in {city}'s busiest dining spots.
                  </p>
                </div>

                {/* Location list */}
                <div className="p-7 flex flex-col gap-3 flex-1">
                  {cityLocations.map((location) => (
                    <motion.button
                      key={location._id}
                      onClick={() => handleRedirect(city, location.name, location._id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium font-dm transition-all duration-200 border cursor-pointer bg-white/5 border-white/8 text-white/70 hover:bg-[#E8181E]/10 hover:border-[#E8181E]/30 hover:text-white"
                    >
                      <span className="flex items-center justify-between">
                        {location.name}
                        <span className="text-[#E8181E] opacity-0 group-hover:opacity-60 transition-opacity duration-200 text-xs">
                          →
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )
          })}

          {/* Empty state */}
          {cities.length === 0 && (
            <div className="lg:col-span-3 text-center py-16 text-white/30 font-dm">
              No locations available yet.
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default LocationCards;