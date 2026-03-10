import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Where does PuraVida water come from?",
    a: "Our water is sourced from natural Himalayan springs and undergoes a 7-stage purification process to ensure the highest quality and mineral balance.",
  },
  {
    q: "What areas do you deliver to?",
    a: "We currently deliver across all major Indian cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, and Kolkata. Enter your pincode on our site to check availability.",
  },
  {
    q: "How does the subscription plan work?",
    a: "Choose a plan based on your monthly water needs. We deliver on a fixed schedule (daily, weekly, or bi-weekly). You can pause, modify, or cancel anytime from your account.",
  },
  {
    q: "Is your packaging eco-friendly?",
    a: "Yes! Our bottles are made from 100% recyclable PET material. Our 5L and 20L containers are reusable and collected during your next delivery for sanitization and refill.",
  },
  {
    q: "What is the minimum order for corporate supply?",
    a: "Corporate plans start at 50 litres per week. We offer customized pricing, branded dispensers, and dedicated account managers for business clients.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order is confirmed, you'll receive a tracking link via SMS and WhatsApp. You can also track orders in real-time from the 'My Orders' section of your account.",
  },
];

const FAQSection = () => (
  <section className="py-16 sm:py-24 bg-background" id="faq">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about PuraVida water delivery.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass-card rounded-xl px-6 border-none"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-sm sm:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </div>
  </section>
);

export default FAQSection;
