import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LocationCards from "@/components/LocationCards";
import BenefitsSection from "@/components/BenefitsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LocationCards />
      <BenefitsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
