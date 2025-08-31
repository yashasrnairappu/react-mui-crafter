import { Button } from "@/components/ui/button";
import heroCharacter from "@/assets/hero-character.png";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-hero flex items-center px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 animate-slide-up">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground/70 tracking-wider uppercase">
              Welcome to PixelPost
            </p>
            
            {/* Malayalam Text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-secondary block mb-2">
                ഹുദ്ധാകോർഡുക്കൾ വഴി
              </span>
              <span className="text-foreground block mb-2">
                പരസ്യം ചെയ്യൂ
              </span>
              <span className="text-secondary text-lg md:text-xl font-normal">
                മികച്ച നേട്ടങ്ങൾ സ്വന്തമാക്കൂ...
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
            <Button variant="contact" size="lg" className="text-lg px-8 py-4">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Right Content - Character Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <img 
              src={heroCharacter}
              alt="Professional character illustration"
              className="w-full max-w-md lg:max-w-lg animate-float"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-foreground/10 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;