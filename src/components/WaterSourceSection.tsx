import { Mountain, Droplets, ThermometerSun, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const WaterSourceSection = () => (
  <section className="py-16 sm:py-24 bg-background relative overflow-hidden" id="source">
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <ScrollReveal>
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Origin</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Born in the <span className="text-gradient">Himalayas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our water begins its journey 3,000 feet above sea level, filtering naturally through ancient rock formations over thousands of years.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <ScrollReveal direction="left">
          <div className="space-y-6">
            {[
              { icon: Mountain, title: "Himalayan Springs", desc: "Sourced from protected spring aquifers in the pristine Himalayan foothills, untouched by pollution." },
              { icon: ThermometerSun, title: "Natural Filtration", desc: "Water percolates through layers of glacial rock for over 20 years, naturally enriching it with essential minerals." },
              { icon: Droplets, title: "Perfect pH 7.4", desc: "Naturally alkaline with the ideal pH balance for optimal hydration and taste that's smooth on the palate." },
              { icon: Sparkles, title: "Mineral Rich", desc: "Contains calcium, magnesium, and potassium in perfect proportions — nature's own electrolyte formula." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="flex gap-4 group" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl water-gradient flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={200}>
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-24 h-24 rounded-full water-gradient flex items-center justify-center mx-auto mb-6">
              <Mountain className="h-12 w-12 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">The Journey of Purity</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">1</span>
                <span className="text-left">Glacial snow melts at 5,000ft altitude</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">2</span>
                <span className="text-left">Filters through ancient rock for 20+ years</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">3</span>
                <span className="text-left">Collected at protected spring aquifers</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">4</span>
                <span className="text-left">7-stage purification & bottled at source</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default WaterSourceSection;
