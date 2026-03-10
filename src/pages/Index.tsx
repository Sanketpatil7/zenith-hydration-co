import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import QualitySection from "@/components/QualitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SubscriptionSection from "@/components/SubscriptionSection";
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
    <ProductsSection />
    <QualitySection />
    <TestimonialsSection />
    <SubscriptionSection />
    <CorporateSection />
    <FAQSection />
    <Footer />
    <CartDrawer />
    <WhatsAppButton />
    <BackToTop />
  </div>
);

export default Index;
