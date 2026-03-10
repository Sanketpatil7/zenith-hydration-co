import { useState } from "react";
import { MapPin, CheckCircle, XCircle, Search } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const SERVICEABLE_PINCODES: Record<string, string> = {
  "110001": "New Delhi", "110020": "New Delhi", "110085": "New Delhi",
  "400001": "Mumbai", "400050": "Mumbai", "400076": "Mumbai",
  "560001": "Bangalore", "560034": "Bangalore", "560100": "Bangalore",
  "500001": "Hyderabad", "500034": "Hyderabad",
  "600001": "Chennai", "600028": "Chennai",
  "411001": "Pune", "411038": "Pune",
  "700001": "Kolkata", "700020": "Kolkata",
  "302001": "Jaipur", "380001": "Ahmedabad",
  "226001": "Lucknow", "201301": "Noida", "122001": "Gurgaon",
  "248001": "Dehradun", "160001": "Chandigarh",
};

const ServiceAreaChecker = () => {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<{ available: boolean; city?: string } | null>(null);

  const check = () => {
    const trimmed = pincode.trim();
    if (trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) return;
    const city = SERVICEABLE_PINCODES[trimmed];
    setResult(city ? { available: true, city } : { available: false });
  };

  return (
    <section className="py-16 sm:py-24 wave-bg" id="service-area">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <MapPin className="h-4 w-4 inline mr-1" /> Delivery Check
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Do We <span className="text-gradient">Deliver</span> to You?
            </h2>
            <p className="text-muted-foreground text-sm">Enter your pincode to check availability</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass-card-solid rounded-2xl p-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={e => { setPincode(e.target.value.replace(/\D/g, "").slice(0, 6)); setResult(null); }}
                placeholder="Enter 6-digit pincode"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono text-lg tracking-wider"
                maxLength={6}
                onKeyDown={e => e.key === "Enter" && check()}
              />
              <button onClick={check} disabled={pincode.length !== 6}
                className="water-gradient text-primary-foreground px-6 py-3 rounded-xl font-semibold btn-ripple hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1">
                <Search className="h-4 w-4" /> Check
              </button>
            </div>

            {result && (
              <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 animate-fade-in ${result.available ? "bg-primary/10" : "bg-destructive/10"}`}>
                {result.available ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Delivery available! 🎉</p>
                      <p className="text-muted-foreground text-xs">We deliver to <span className="font-semibold text-primary">{result.city}</span> – {pincode}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Not available yet</p>
                      <p className="text-muted-foreground text-xs">We're expanding rapidly. Leave your email and we'll notify you!</p>
                    </div>
                  </>
                )}
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center mt-4">
              Currently serving 200+ cities across India
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServiceAreaChecker;
