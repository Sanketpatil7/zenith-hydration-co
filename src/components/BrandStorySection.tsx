import { Droplets } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const timeline = [
  { year: "2018", title: "The Vision", desc: "Founded by a team of environmental scientists and water enthusiasts in Dehradun, with a mission to deliver the purest water from Himalayan springs." },
  { year: "2019", title: "First Bottle", desc: "Launched our flagship 1L glass bottle in Delhi NCR. Received overwhelming response from health-conscious families." },
  { year: "2021", title: "Pan-India Expansion", desc: "Expanded to 50+ cities with our subscription model. Introduced the 20L dispenser for homes and offices." },
  { year: "2023", title: "Going Green", desc: "Achieved carbon-neutral operations. Launched 100% recycled packaging and electric delivery fleet." },
  { year: "2025", title: "200+ Cities", desc: "Now serving over 200 cities with 50,000+ happy subscribers. Recognized as India's #1 premium water brand." },
];

const BrandStorySection = () => (
  <section className="py-16 sm:py-24 bg-background" id="about">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <ScrollReveal>
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Story</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The PuraVida <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From a small spring in the Himalayan foothills to India's most trusted premium water brand.
          </p>
        </div>
      </ScrollReveal>

      {/* Mission Card */}
      <ScrollReveal delay={100}>
        <div className="water-gradient rounded-2xl p-8 sm:p-10 text-primary-foreground text-center mb-12">
          <Droplets className="h-10 w-10 mx-auto mb-4 opacity-80" />
          <h3 className="font-display text-2xl font-bold mb-3">Our Mission</h3>
          <p className="text-primary-foreground/90 max-w-xl mx-auto leading-relaxed">
            To make the purest, most responsibly sourced water accessible to every Indian household — because clean water isn't a luxury, it's a right.
          </p>
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border sm:-translate-x-px" />
        {timeline.map((item, i) => (
          <ScrollReveal key={item.year} delay={i * 100}>
            <div className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
              <div className={`hidden sm:block flex-1 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                <p className="font-display text-2xl font-bold text-primary">{item.year}</p>
                <h4 className="font-display text-lg font-bold text-foreground mt-1">{item.title}</h4>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full water-gradient border-4 border-background -translate-x-1/2 mt-1.5 z-10" />
              <div className="sm:hidden flex-1 pl-10">
                <p className="font-display text-xl font-bold text-primary">{item.year}</p>
                <h4 className="font-display text-base font-bold text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <div className={`hidden sm:block flex-1 ${i % 2 === 0 ? "pl-8" : "pr-8"}`} />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default BrandStorySection;
