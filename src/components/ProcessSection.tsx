import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Location",
    description:
      "Pick from our network of premium food courts and restaurants across Pathanamthitta, Kottayam, and Alappuzha.",
    icon: "📍",
  },
  {
    number: "02",
    title: "Share Your Creative",
    description:
      "Upload your ad content, or let our design team create stunning visuals for your brand from scratch.",
    icon: "🎨",
  },
  {
    number: "03",
    title: "We Go Live",
    description:
      "Your ad starts playing on digital screens in front of a captive indoor audience — fully managed by us.",
    icon: "🚀",
  },
  {
    number: "04",
    title: "Track & Update",
    description:
      "Update your campaign anytime. Switch creatives, change timings, or scale to more locations as your brand grows.",
    icon: "📊",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const ProcessSection = () => {
  return (
    <section className="py-24 px-6 bg-[#0C0C0C] relative overflow-hidden" id="process">

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#E8181E]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#E8181E]" />
              <span className="text-[#E8181E] text-xs font-bold tracking-[0.14em] uppercase font-dm">
                Process
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Up & Running in <br />
              <span className="text-[#E8181E]">4 Simple Steps</span>
            </h2>
          </div>
          <p className="text-white/40 text-base font-dm leading-relaxed max-w-sm lg:text-right">
            Getting your brand on Adbite screens is fast, easy, and completely hassle-free.
          </p>
        </motion.div>

        {/* Steps */}
            <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
            {steps.map((step, index) => (
                <motion.div
                key={step.number}
                variants={stepVariants}
                className="group relative bg-[#141414] rounded-2xl p-8 flex flex-col gap-6 hover:bg-[#1C1C1C] transition-colors duration-300 overflow-hidden border border-white/5 hover:border-[#E8181E]/30 cursor-default"
                >
                {/* Big faded number — top */}
                <span className="font-syne font-black text-7xl text-[#E8181E]/10 group-hover:text-[#E8181E]/20 transition-colors duration-300 select-none leading-none pointer-events-none">
                    {step.number}
                </span>
                {/* Content */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-syne font-bold text-lg text-white leading-snug">
                    {step.title}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed font-dm">
                    {step.description}
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E8181E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.div>
            ))}
            </motion.div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8181E] to-[#B91219]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-8">
            <div>
              <p className="text-white font-syne font-extrabold text-2xl leading-tight">
                Ready to get your brand seen indoors?
              </p>
              <p className="text-white/70 text-sm font-dm mt-2">
                Join businesses already advertising with Adbite across Kerala.
              </p>
            </div>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/7907262988?text=Hi%2C%20I%27m%20interested%20in%20your%20services",
                  "_blank"
                )
              }
              className="bg-white text-[#E8181E] font-bold font-dm text-sm px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl whitespace-nowrap cursor-pointer border-none shrink-0"
            >
              Start Advertising →
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessSection;