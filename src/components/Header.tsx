import { Button } from "@/components/ui/button";
import logoP from "@/assets/adbitelogo.jpeg";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navItems = [
    { label: "Pathanamthitta", href: "#locations" },
    { label: "Kottayam", href: "#locations" },
    { label: "Alappuzha", href: "#locations" }
  ];
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const section = document.getElementById("locations");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100); // Wait for navigation/render
    } else {
      const section = document.getElementById("locations");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={logoP} 
            alt="Adbite Logo" 
            className="w-12 h-12 "
          />
          <span className="text-xl font-bold text-foreground hidden sm:block">
            Adbite
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={handleNavClick}
              className="bg-transparent border-none text-foreground/80 hover:text-foreground transition-colors font-medium cursor-pointer"
              style={{ background: "none" }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Contact Button */}
        <Button 
          variant="outline-header" 
          size="sm" 
          className="font-medium"
          onClick={() => window.open('https://wa.me/6282359567?text=Hi%2C%20I%27m%20interested%20in%20your%20services', '_blank')}
        >
          Contact Now
        </Button>
      </div>
    </header>
  );
};

export default Header;