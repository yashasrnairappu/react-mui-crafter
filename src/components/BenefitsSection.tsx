import { motion } from "framer-motion";
import businessGrowthImage from "@/assets/3.png";
import visitorsImage from "@/assets/2.png";
import fourKScreenImage from "@/assets/1.png";
import costSavingsImage from "@/assets/display.png";
import displayFlexibilityImage from "@/assets/store.png";
import designSupportImage from "@/assets/cake.png";
const benefits = [
  {
    number: "01",
    title: "ബിസിനസ്സ് വളർച്ചാസാധ്യത",
    description:
      "മറ്റ് റീട്ടെയിൽ സ്ഥാപനങ്ങളെക്കാൾ കൂടുതൽ സമയം ജനങ്ങൾ ചിലവഴിക്കുന്ന ഇടമാണ് ഫൂഡ് കോർട്ടുകൾ. ശരാശരി 30 മിനിറ്റോളം. ഇതിനിടയിൽ സ്ക്രീനിലെ പരസ്യങ്ങൾ കാണുന്നതിനും പരസ്പരം ചർച്ച ചെയ്യുന്നതിനുമുള്ള സാധ്യത ഏറെയാണ്.",
    image: businessGrowthImage,
  },
  {
    number: "02",
    title: "സന്ദർശകർ",
    description:
      "മുതിർന്നവരും കുടുംബങ്ങളും യുവപ്രൊഫഷണലുകളും വലിയ അളവിൽ സന്ദർശിക്കുന്ന ഇടമാണ് ഫൂഡ്കോർട്ടുകൾ. ഇതുവഴി താങ്കളുടെ സ്ഥാപനത്തിന്റെ ഓഫറുകളും പ്രൊമോഷനുകളും Target ഗ്രൂപ്പിലേക്ക് എളുപ്പമെത്തുന്നു.",
    image: visitorsImage,
  },
  {
    number: "03",
    title: "Digital സ്ക്രീനുകൾ",
    description:
      "നിങ്ങളുടെ ഓഫറുകളും പ്രൊമോഷനുകളും ഏറ്റവും മികച്ച ദൃശ്യഭംഗിയോടെ ഞങ്ങളുടെ Digital സ്ക്രീനുകളിൽ പ്രദർശിപ്പിക്കാൻ സാധിക്കും.",
    image: fourKScreenImage,
  },
  {
    number: "04",
    title: "പരസ്യച്ചിലവ്",
    description:
      "അച്ചടിമാധ്യമങ്ങളിലെ പരസ്യസേവനങ്ങളെക്കാൾ 90 ശതമാനം കുറഞ്ഞ ചിലവ്.",
    image: costSavingsImage,
  },
  {
    number: "05",
    title: "പ്രദർശനസൗകര്യം",
    description:
      "നിങ്ങളുടെ ഇഷ്ടാനുസരണം പരസ്യങ്ങൾ എപ്പോൾ വേണമെങ്കിലും മാറ്റാൻ സാധിക്കും. ഉദാഹരണം:- ഓരോ ദിവസവും ഓരോ ഓഫറുകൾ.",
    image: displayFlexibilityImage,
  },
  {
    number: "06",
    title: "Design Support",
    description:
      "നിങ്ങൾക്ക് പരസ്യം ഡിസൈൻ ചെയ്യാൻ support ആവശ്യമെങ്കിൽ ഞങ്ങൾ തയ്യാറാണ്.",
    image: designSupportImage,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const BenefitsSection = () => {
  return (
    <section className="py-24 px-6 bg-[#141414]" id="why">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          {/* Section tag */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#E8181E]" />
            <span className="text-[#E8181E] text-xs font-bold tracking-[0.14em] uppercase font-dm">
              Why Adbite
            </span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-malayalam">
            ഫൂഡ്കോർട്ടുകൾ വഴി പരസ്യം{" "}
            <span className="text-[#E8181E]">ചെയ്താലുള്ള ഗുണങ്ങൾ</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/5 rounded-xl overflow-hidden"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.number}
              variants={cardVariants}
              whileHover={{ backgroundColor: "#222222" }}
              className="group bg-[#1C1C1C] p-8 flex flex-col gap-5 cursor-default transition-colors duration-300 border-t-2 border-t-transparent hover:border-t-[#E8181E]"
            >
              <div className="flex items-center justify-between">
              <div className="w-full h-full rounded-xl bg-[#E8181E]/10 flex items-center justify-center overflow-hidden group-hover:bg-[#E8181E]/20 transition-colors duration-300">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-96 md:h-full object-contain"
                />
              </div>
              </div>

              {/* Title */}
              <h3 className="font-syne font-bold text-lg text-white leading-snug font-malayalam">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/50 leading-relaxed font-dm font-malayalam">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default BenefitsSection;