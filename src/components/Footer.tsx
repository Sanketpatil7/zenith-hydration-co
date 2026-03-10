import { Droplets } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";

const Footer = () => (
  <footer className="bg-foreground text-background py-12 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="h-7 w-7 text-primary-glow" />
            <span className="font-display text-xl font-bold">PuraVida</span>
          </div>
          <p className="text-background/60 text-sm leading-relaxed">
            Premium hydration sourced from the Himalayas. Purity you can taste, trust you can feel.
          </p>
        </div>
        {[
          { title: "Products", links: ["500ml Bottle", "1L Classic", "2L Family", "5L Jar", "20L Dispenser"] },
          { title: "Company", links: ["About Us", "Our Process", "Sustainability", "Careers", "Blog"] },
          { title: "Support", links: ["Contact Us", "FAQs", "Delivery Areas", "Track Order", "Refund Policy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-bold text-base mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/60 hover:text-background text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <NewsletterSignup />

      <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-background/40 text-sm">© 2026 PuraVida Water Pvt. Ltd. All rights reserved.</p>
        <p className="text-background/40 text-sm">Made with 💧 in India</p>
      </div>
    </div>
  </footer>
);

export default Footer;
