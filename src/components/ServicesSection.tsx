import { motion } from "framer-motion";
import WebImage from "@/assets/web_solutions.webp"
import AdbiteScreen from "@/assets/adbitescreen.png"
import AdbiteWeels from "@/assets/adbitewheels.png"
import AdbiteProperties from "@/assets/adbite_properties.webp"
import DigitalMarketing from "@/assets/digital_marketing.webp"
import AdShoot from "@/assets/ad_shoot.jpg"


const services = [
  {
    number: "01",
    title: "Adbite Screens",
    description:
      "Premium indoor digital screens placed inside food courts and restaurants with high foot traffic across Kerala. Your brand plays repeatedly to a captive audience.",
    image:AdbiteScreen,
    tag: "Core",
  },
  {
    number: "02",
    title: "Adbite Wheels",
    description:
      "Take your brand on the move. Mobile advertising solutions that reach customers wherever they are across Kerala streets and key locations.",
    image:AdbiteWeels,
    tag: "Mobile",
  },
  {
    number: "03",
    title: "Adbite Properties",
    description:
      "Advertise directly inside your own venue or partner restaurants. Display your promotions to the most relevant audience every single day.",
    image:AdbiteProperties,
    tag: "Properties",
  },
  {
    number: "04",
    title: "Web Solutions",
    description:
      "Beyond screens — Adbite also offers professional web development and digital presence solutions to extend your brand's reach online.",
    image:WebImage,
    tag: "Digital",
  },
  {
    number: "05",
    title: "Ad Shoot & Design",
    description:
      "Professional ad creation service — from photography to full video production — so your brand looks its absolute best on every screen.",
     image:AdShoot,
    tag: "Creative",
  },
  {
    number: "06",
    title: "Digital Marketing",
    description:
      "Social media management, targeted campaigns, and online advertising to complement your indoor presence and grow your brand digitally.",
     image:DigitalMarketing,
    tag: "Marketing",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ServicesSection = () => {
  return (
    <section className="py-24 px-6 bg-[#F5F2EE] relative overflow-hidden" id="services">

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
              Our Services
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#0C0C0C] leading-tight max-w-2xl">
              Everything You Need to
              <br />
              <span className="text-[#E8181E]">Grow Your Brand</span>
            </h2>
            <p className="text-black/50 text-base font-dm leading-relaxed max-w-xs">
              From screen placement to creative design, Adbite handles it all so
              you can focus on what you do best.
            </p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={cardVariants}
              className="group bg-white rounded-2xl overflow-hidden border border-black/8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-default"
            >
             {/* Dark image top area — replace emoji with image */}
            <div className="relative bg-[#1C1C1C] h-52 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 to-transparent" />

              {/* Tag label */}
              <div className="absolute bottom-0 left-0">
                <span className="bg-[#E8181E] text-white text-[10px] font-black tracking-[0.12em] uppercase font-dm px-4 py-2 block">
                  {service.tag}
                </span>
              </div>
            </div>

              {/* Content bottom area */}
              <div className="p-7 flex flex-col gap-3">
                <h3 className="font-syne font-bold text-xl text-[#0C0C0C] leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-black/50 leading-relaxed font-dm">
                  {service.description}
                </p>
                <button
                  onClick={() =>
                    window.open(
                      "https://wa.me/7907262988?text=Hi%2C%20I%27m%20interested%20in%20your%20services",
                      "_blank"
                    )
                  }
                  className="mt-2 flex items-center gap-1.5 text-[#E8181E] text-sm font-semibold font-dm group-hover:gap-3 transition-all duration-300 bg-transparent border-none cursor-pointer p-0 w-fit"
                >
                  Learn more →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0C0C0C] rounded-2xl px-8 py-7"
        >
          <div>
            <p className="text-white font-syne font-bold text-lg">
              Not sure which service fits your brand?
            </p>
            <p className="text-white/50 text-sm font-dm mt-1">
              Talk to us — we'll help you find the right solution.
            </p>
          </div>
          <button
            onClick={() =>
              window.open(
                "https://wa.me/7907262988?text=Hi%2C%20I%27m%20interested%20in%20your%20services",
                "_blank"
              )
            }
            className="bg-[#E8181E] hover:bg-[#B91219] text-white font-semibold font-dm text-sm px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(232,24,30,0.4)] whitespace-nowrap cursor-pointer border-none"
          >
            Contact Us →
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;