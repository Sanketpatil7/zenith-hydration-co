import { Shield, Droplets, Leaf, Award } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  { icon: Droplets, title: "Natural Sourcing", desc: "Collected from protected Himalayan spring aquifers at 3,000ft elevation." },
  { icon: Shield, title: "7-Stage Purification", desc: "Advanced RO + UV + mineral enrichment process ensuring pharmaceutical-grade purity." },
  { icon: Leaf, title: "Eco Packaging", desc: "100% recyclable BPA-free bottles with carbon-neutral manufacturing process." },
  { icon: Award, title: "Lab Certified", desc: "Every batch tested by NABL-accredited labs. BIS IS 10500 certified quality." },
];

const QualitySection = () => (
  <section id="quality" className="py-16 sm:py-24 wave-bg">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2">Our Promise</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Purity You Can <span className="text-gradient">Trust</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            From source to sip, every step is engineered for perfection.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 120}>
            <div className="glass-card-solid rounded-2xl p-6 sm:p-8 text-center hover-lift group h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl water-gradient flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110">
                <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default QualitySection;
