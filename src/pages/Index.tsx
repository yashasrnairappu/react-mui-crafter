import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner"
import LocationCards from "@/components/LocationCards";
import BenefitsSection from "@/components/BenefitsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import BackToTop from "@/components/ui/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <MarqueeBanner/>
      <BenefitsSection/>
      <ServicesSection/>
      <ProcessSection/>
      <LocationCards />
      <ContactSection />
      <BackToTop/> 
    </div>
  );
};

export default Index;
