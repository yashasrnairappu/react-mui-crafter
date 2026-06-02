import { motion } from "framer-motion";

const items = [
  "Indoor Advertising",
  "Food Courts",
  "Digital Screens",
  "Pathanamthitta",
  "Kottayam",
  "Alappuzha",
  "Brand Visibility",
  "Design Support",
  "90% Cost Savings",
];

const MarqueeBanner = () => {
  return (
    <div className="w-full bg-[#E8181E] border-y border-white/10 py-3 overflow-hidden">
      <motion.div
        className="flex gap-12 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className="text-white/60 text-sm">✦</span>
            <span className="text-white text-sm font-bold tracking-[0.1em] uppercase font-dm">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;