import { Button } from "@/components/ui/button";
// Removed: import heroCharacter from "@/assets/hero-character.png";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-hero flex items-center px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 animate-slide-up">
          <div className="space-y-4">
            <p className="text-sm font-medium font-bold text-foreground/50 tracking-wider uppercase">
              Welcome to Adbite
            </p>
            
            {/* Malayalam Text */}
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold leading-tight">
              <span className="text-foreground block mb-2">
                ഹുദ്ധാകോർഡുക്കൾ വഴി
              </span>
              <span className="text-lightback block mb-2">
                പരസ്യം ചെയ്യൂ
              </span>
              <span className="text-foreground block mb-2">
                മികച്ച നേട്ടങ്ങൾ സ്വന്തമാക്കൂ.
              </span>
            </h1>
          </div>

          {/* English Description */}
          <p className="text-lg text-foreground/80 max-w-lg leading-relaxed">
            Built for marketers and founders, Pixel Post gets your brand seen 
            indoors, where it matters most.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              variant="contact" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => window.open('https://wa.me/916282359567?text=Hi%2C%20I%27m%20interested%20in%20your%20services', '_blank')}
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Right Content - GIF Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            
            <img 
              src="/assets/Animatedlogo.gif"
              alt="Animated logo"
              className="w-full max-w-md lg:max-w-lg select-none pointer-events-none"
              draggable={false}
              style={{ userSelect: "none" }}
            />
            {/* No shadow or bounce/float animation */}
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero;