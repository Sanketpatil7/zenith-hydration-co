import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import ProductsSection from "@/components/ProductsSection";
import QualitySection from "@/components/QualitySection";
import WaterSourceSection from "@/components/WaterSourceSection";
import WaterCalculator from "@/components/WaterCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import SubscriptionSection from "@/components/SubscriptionSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import BrandStorySection from "@/components/BrandStorySection";
import ServiceAreaChecker from "@/components/ServiceAreaChecker";
import CorporateSection from "@/components/CorporateSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <TrustBadges />
    <ProductsSection />
    <QualitySection />
    <WaterSourceSection />
    <WaterCalculator />
    <TestimonialsSection />
    <SubscriptionSection />
    <SustainabilitySection />
    <BrandStorySection />
    <ServiceAreaChecker />
    <CorporateSection />
    <FAQSection />
    <Footer />
    <CartDrawer />
    <WhatsAppButton />
    <BackToTop />
  </div>
);

export default Index;
