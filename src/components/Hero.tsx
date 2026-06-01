import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#0C0C0C] flex items-center px-6 py-24 overflow-hidden">

      {/* Background red glow */}
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#E8181E]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-[#E8181E]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">

        {/* ── Left Content ── */}
        <div className="space-y-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#E8181E]/10 border border-[#E8181E]/30 text-[#E8181E] px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#E8181E] animate-pulse" />
            Welcome to Adbite
          </motion.div>

          {/* Headline */}
          <div className="space-y-1">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="block font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-malayalam"
            >
              ഫുഡ്കോർട്ടുകൾ വഴി
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="block font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#E8181E] leading-tight font-malayalam"
            >
              പരസ്യം ചെയ്യൂ
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.44 }}
              className="block font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-malayalam"
            >
              മികച്ച നേട്ടങ്ങൾ സ്വന്തമാക്കൂ.
            </motion.span>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.56 }}
            className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed font-dm"
          >
            Built for marketers and founders, Adbite gets your brand seen
            indoors, where it matters most.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center gap-8 pt-2"
          >
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex items-center gap-4 pt-2 flex-wrap"
          >
            <Button
              variant="contact"
              size="lg"
              className="bg-[#E8181E] hover:bg-[#B91219] text-white font-semibold px-8 py-3 rounded-lg text-base shadow-[0_4px_24px_rgba(232,24,30,0.35)] hover:shadow-[0_8px_32px_rgba(232,24,30,0.45)] hover:-translate-y-0.5 transition-all duration-200 border-none cursor-pointer"
              onClick={() =>
                window.open(
                  "https://wa.me/7907262988?text=Hi%2C%20I%27m%20interested%20in%20your%20services",
                  "_blank"
                )
              }
            >
              Contact Us
            </Button>

            <button
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-white/60 hover:text-white text-sm font-medium font-dm underline underline-offset-4 transition-colors duration-200 bg-transparent border-none cursor-pointer"
            >
              See How It Works →
            </button>
          </motion.div>
        </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="flex justify-center lg:justify-end "
      >
            <motion.video
              src="/assets/Animatedlogo.mp4"
              autoPlay
              loop
              muted
              playsInline
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full object-contain select-none pointer-events-none"
              style={{ userSelect: "none" }}
            />

      </motion.div>
      </div>
    </section>
  );
};

export default Hero;