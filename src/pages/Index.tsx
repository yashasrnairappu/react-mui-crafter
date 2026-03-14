import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LocationCards from "@/components/LocationCards";
import BenefitsSection from "@/components/BenefitsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <BenefitsSection />
      <LocationCards />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
