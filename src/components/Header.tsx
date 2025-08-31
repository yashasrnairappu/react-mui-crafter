import { Button } from "@/components/ui/button";
import logoP from "@/assets/logo-p.png";

const Header = () => {
  const navItems = ["Callicut", "Ernakulum", "Trivandrum"];

  return (
    <header className="w-full px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={logoP} 
            alt="PixelPost Logo" 
            className="w-12 h-12 animate-float"
          />
          <span className="text-xl font-bold text-foreground hidden sm:block">
            PixelPost
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Contact Button */}
        <Button variant="outline-header" size="sm" className="font-medium">
          Contact Now
        </Button>
      </div>
    </header>
  );
};

export default Header;