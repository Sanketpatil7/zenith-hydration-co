import { Shield, Award, FlaskConical, BadgeCheck, Truck, HeartHandshake } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const badges = [
  { icon: Shield, label: "BIS Certified", sub: "IS 10500" },
  { icon: FlaskConical, label: "NABL Lab Tested", sub: "Every Batch" },
  { icon: Award, label: "ISO 22000", sub: "Food Safety" },
  { icon: BadgeCheck, label: "FSSAI Approved", sub: "Lic. No. 100..." },
  { icon: Truck, label: "200+ Cities", sub: "Pan India" },
  { icon: HeartHandshake, label: "50K+ Families", sub: "Trust Us Daily" },
];

const TrustBadges = () => (
  <section className="py-12 sm:py-16 bg-background border-y border-border">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12">
          {badges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default TrustBadges;
