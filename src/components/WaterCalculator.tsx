import { useState } from "react";
import { Users, Droplets, Calculator } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const WaterCalculator = () => {
  const [members, setMembers] = useState(4);
  const dailyPerPerson = 3; // litres
  const weeklyTotal = members * dailyPerPerson * 7;
  const monthlyTotal = members * dailyPerPerson * 30;
  const recommended20L = Math.ceil(monthlyTotal / 20);

  return (
    <section className="py-16 sm:py-24 bg-background" id="calculator">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calculator className="h-4 w-4 inline mr-1" /> Smart Tool
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Water <span className="text-gradient">Calculator</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Find out how much water your family needs weekly
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass-card-solid rounded-2xl p-8">
            <div className="text-center mb-8">
              <label className="text-sm font-medium text-foreground mb-3 flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Family Members
              </label>
              <div className="flex items-center justify-center gap-4 mt-3">
                <button onClick={() => setMembers(Math.max(1, members - 1))}
                  className="w-12 h-12 rounded-xl border border-border text-foreground font-bold text-xl hover:bg-secondary transition-colors">−</button>
                <span className="text-5xl font-display font-bold text-primary w-20 text-center">{members}</span>
                <button onClick={() => setMembers(Math.min(20, members + 1))}
                  className="w-12 h-12 rounded-xl border border-border text-foreground font-bold text-xl hover:bg-secondary transition-colors">+</button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-xl bg-secondary">
                <Droplets className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground font-display">{members * dailyPerPerson}L</p>
                <p className="text-xs text-muted-foreground">Daily</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary">
                <Droplets className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground font-display">{weeklyTotal}L</p>
                <p className="text-xs text-muted-foreground">Weekly</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary">
                <Droplets className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground font-display">{monthlyTotal}L</p>
                <p className="text-xs text-muted-foreground">Monthly</p>
              </div>
            </div>

            <div className="water-gradient rounded-xl p-5 text-primary-foreground text-center">
              <p className="text-sm opacity-90 mb-1">Recommended Monthly Supply</p>
              <p className="text-3xl font-display font-bold">{recommended20L} × 20L Dispensers</p>
              <p className="text-sm opacity-80 mt-1">≈ ₹{recommended20L * 120}/month</p>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              * Based on WHO recommended intake of 3L per person per day
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WaterCalculator;
