import { Recycle, TreePine, Leaf, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const metrics = [
  { value: "100%", label: "Recyclable Packaging", icon: Recycle },
  { value: "50K+", label: "Trees Planted", icon: TreePine },
  { value: "Zero", label: "Plastic to Landfill", icon: Leaf },
  { value: "Carbon", label: "Neutral by 2025", icon: Globe },
];

const SustainabilitySection = () => (
  <section className="py-16 sm:py-24 wave-bg" id="sustainability">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">🌍 Our Commitment</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Water for the <span className="text-gradient">Planet</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sustainability isn't a buzzword for us — it's built into every bottle, every delivery, and every decision we make.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map(({ value, label, icon: Icon }, i) => (
          <ScrollReveal key={label} delay={i * 100}>
            <div className="glass-card rounded-2xl p-6 text-center hover-lift group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{value}</p>
              <p className="text-muted-foreground text-sm mt-1">{label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={200}>
        <div className="glass-card-solid rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto">
          <h3 className="font-display text-xl font-bold text-foreground mb-4 text-center">Our Green Initiatives</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              "Bottles made from 100% recycled PET",
              "20L containers collected & sanitized for reuse",
              "Solar-powered bottling facility",
              "Electric delivery fleet in metro cities",
              "1 bottle sold = 1 litre clean water donated",
              "Partnered with WaterAid India",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Leaf className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default SustainabilitySection;
