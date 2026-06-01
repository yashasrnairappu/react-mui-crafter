import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoP from "@/assets/adbitelogo.jpeg";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Why Us", href: "#why" },
    { label: "Services", href: "#services" },
    { label: "Loctions", href: "#locations" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);


  const handleNavClick = (href: string) => {
  setMenuOpen(false);

  const targetId = href.replace("#", "");

  if (location.pathname !== "/") {
    navigate("/", { replace: false });

    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  } else {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
    });
  }
};

  const handleContact = () => {
    window.open(
      "https://wa.me/7907262988?text=Hi%2C%20I%27m%20interested%20in%20your%20services",
      "_blank"
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/8 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "py-3 bg-[#0c0c0c]/95" : "py-5 bg-[#0c0c0c]/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3 no-underline"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-10 h-10 rounded-md overflow-hidden ring-2 ring-[#E8181E]/30">
              <img src={logoP} alt="Adbite Logo" className="w-full h-full " />
            </div>
            <span className="text-xl font-bold text-[#E8181E] hidden sm:block tracking-tight">
              Adbite
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-white/60 hover:text-white text-sm font-medium tracking-wide cursor-pointer bg-transparent border-none transition-colors duration-200 relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -1 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E8181E] transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Contact Button */}
            <motion.button
              onClick={handleContact}
              className="hidden sm:flex items-center gap-2 bg-[#E8181E] hover:bg-[#B91219] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors duration-200 cursor-pointer border-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Now
            </motion.button>

            {/* Hamburger — mobile */}
            <motion.button
              className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-[2px] bg-white rounded-full origin-center"
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block w-6 h-[2px] bg-white rounded-full"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[2px] bg-white rounded-full origin-center"
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-[#141414] border-b border-white/10 px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={handleNavClick}
                  className="text-left text-white/70 hover:text-white hover:bg-white/5 text-base font-medium px-4 py-3 rounded-lg cursor-pointer bg-transparent border-none transition-all duration-150"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                onClick={handleContact}
                className="mt-4 w-full bg-[#E8181E] hover:bg-[#B91219] text-white font-semibold py-3 rounded-md text-sm cursor-pointer border-none transition-colors duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;