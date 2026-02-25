import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import QualitySection from "@/components/QualitySection";
import SubscriptionSection from "@/components/SubscriptionSection";
import CorporateSection from "@/components/CorporateSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ProductsSection />
    <QualitySection />
    <SubscriptionSection />
    <CorporateSection />
    <Footer />
    <CartDrawer />
  </div>
);

export default Index;
