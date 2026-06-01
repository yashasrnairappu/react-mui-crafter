import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    mobile: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   try {
    await emailjs.send(
      "service_15dvyrn",
      "template_el4yfaf",
      {
        from_name: formData.firstName,
        from_email: formData.email,
        mobile: formData.mobile,
        message: formData.comments,
      },
    "8JZgnQ9jC4XTWaPlx"
    );
    toast({
      title:"Message sent!",
      description:"We'll get back to you shortly.",
    });

    setFormData({firstName:"",email:"",mobile:"",comments:""});

   } catch (error) {
    toast({
      title: "Failed to send ",
      description: "Please try WhatsApp instead.",
      variant: "destructive",
    });
   }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-[#E8181E]" />,
      label: "Address",
      value: "Near Mallappally Thiruvalla Road Market, Mallappally, Kerala 689585",
    },
    {
      icon: <Phone className="w-5 h-5 text-[#E8181E]" />,
      label: "Phone",
      value: "+91 7907262988",
    },
    {
      icon: <Mail className="w-5 h-5 text-[#E8181E]" />,
      label: "Email",
      value: "contact.adbite@gmail.com",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#F5F2EE] relative overflow-hidden" id="contact">

      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#E8181E]/5 blur-[120px] pointer-events-none rounded-full" />

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
              Contact Us
            </span>
          </div>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#0C0C0C] leading-tight">
            Ready to Get Your Brand <br />
            <span className="text-[#E8181E]">Seen Indoors?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left — Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-5"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-start gap-5 bg-[#1C1C1C] border border-white/8 rounded-xl p-6 hover:border-[#E8181E]/30 transition-colors duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E8181E]/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30 font-dm mb-1">
                    {item.label}
                  </p>
                  <p className="text-white/80 text-sm font-dm leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp Button */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                window.open(
                  "https://wa.me/7907262988?text=Hi%2C%20I%27m%20interested%20in%20your%20services",
                  "_blank"
                )
              }
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white font-bold font-dm text-sm px-6 py-4 rounded-xl transition-colors duration-200 cursor-pointer border-none w-full mt-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact via WhatsApp
            </motion.button>
          </motion.div>

          {/* ── Right — Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="bg-[#1C1C1C] border border-white/8 rounded-2xl p-8 md:p-10"
          >
            <h3 className="font-syne font-bold text-xl text-white mb-8">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* First Name + Mobile row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/35 font-dm">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-lg px-4 py-3 text-sm font-dm outline-none focus:border-[#E8181E] focus:ring-2 focus:ring-[#E8181E]/20 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/35 font-dm">
                    Mobile *
                  </label>
                  <input
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-lg px-4 py-3 text-sm font-dm outline-none focus:border-[#E8181E] focus:ring-2 focus:ring-[#E8181E]/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/35 font-dm">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-lg px-4 py-3 text-sm font-dm outline-none focus:border-[#E8181E] focus:ring-2 focus:ring-[#E8181E]/20 transition-all duration-200"
                />
              </div>

              {/* Comments */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/35 font-dm">
                  Comments / Questions *
                </label>
                <textarea
                  name="comments"
                  rows={4}
                  value={formData.comments}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your advertising goals..."
                  className="bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-lg px-4 py-3 text-sm font-dm outline-none focus:border-[#E8181E] focus:ring-2 focus:ring-[#E8181E]/20 transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#E8181E] hover:bg-[#B91219] text-white font-bold font-dm text-sm py-4 rounded-lg transition-colors duration-200 cursor-pointer border-none shadow-[0_4px_24px_rgba(232,24,30,0.3)] mt-2"
              >
                Send Message →
              </motion.button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;