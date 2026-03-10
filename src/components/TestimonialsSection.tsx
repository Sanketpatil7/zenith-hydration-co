import { Star, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fitness Coach, Mumbai",
    rating: 5,
    text: "PuraVida has transformed my hydration routine. The purity is unmatched and my clients love it too. Best water brand I've used in India!",
    avatar: "PS",
  },
  {
    name: "Arjun Mehta",
    role: "CEO, TechStart India",
    rating: 5,
    text: "We supply PuraVida in our office and our team productivity has improved. The corporate plans are extremely cost-effective.",
    avatar: "AM",
  },
  {
    name: "Neha Kapoor",
    role: "Nutritionist, Delhi",
    rating: 5,
    text: "The mineral balance in PuraVida is perfect. I recommend it to all my patients. It's the cleanest water available for families.",
    avatar: "NK",
  },
  {
    name: "Rahul Verma",
    role: "Home User, Bangalore",
    rating: 4,
    text: "Switched from another brand and the difference is clear. The 20L dispenser is a game changer for our household!",
    avatar: "RV",
  },
];

const TestimonialsSection = () => (
  <section className="py-16 sm:py-24 bg-muted/30" id="testimonials">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Trusted by Thousands
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy families and businesses across India who trust PuraVida for their hydration needs.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 100}>
            <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
              <Quote className="h-8 w-8 text-primary/30 mb-3" />
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                "{t.text}"
              </p>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`h-4 w-4 ${si < t.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
