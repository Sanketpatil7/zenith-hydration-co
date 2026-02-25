import { Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    name: "Starter",
    price: "₹499",
    period: "/month",
    features: ["20L Dispenser × 2", "Free delivery", "Weekly schedule", "Basic support"],
    popular: false,
  },
  {
    name: "Family",
    price: "₹999",
    period: "/month",
    features: ["20L Dispenser × 5", "Free delivery", "Flexible schedule", "Priority support", "10% savings"],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹1,999",
    period: "/month",
    features: ["20L Dispenser × 12", "Same-day delivery", "Custom schedule", "Dedicated manager", "20% savings", "Glass bottles included"],
    popular: false,
  },
];

const SubscriptionSection = () => (
  <section id="subscription" className="py-16 sm:py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2">Subscription Plans</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Never Run <span className="text-gradient">Dry</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Monthly delivery plans tailored for your home or office needs.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <ScrollReveal key={plan.name} delay={i * 150}>
            <div
              className={`relative rounded-2xl p-6 sm:p-8 hover-lift h-full flex flex-col ${
                plan.popular
                  ? "water-gradient text-primary-foreground shadow-xl scale-[1.02]"
                  : "glass-card-solid"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-primary text-xs font-bold px-4 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl sm:text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-8 py-3 rounded-xl font-semibold text-sm transition-colors btn-ripple ${
                  plan.popular
                    ? "bg-background text-primary hover:bg-background/90"
                    : "water-gradient text-primary-foreground hover:opacity-90"
                }`}
              >
                Subscribe Now
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default SubscriptionSection;
