import { Building2, Truck, HeadphonesIcon } from "lucide-react";

const CorporateSection = () => (
  <section id="corporate" className="py-16 sm:py-24 wave-bg">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2">Corporate Solutions</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Hydrate Your <span className="text-gradient">Workplace</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
            From tech startups in Bangalore to corporate towers in Mumbai — we supply premium water to 500+ businesses across India. Custom billing, dedicated account managers, and guaranteed supply.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Building2, text: "Custom plans for offices of any size" },
              { icon: Truck, text: "Scheduled deliveries across 200+ cities" },
              { icon: HeadphonesIcon, text: "Dedicated account manager & 24/7 support" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl water-gradient flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-sm sm:text-base text-foreground">{text}</span>
              </div>
            ))}
          </div>
          <button className="mt-8 water-gradient text-primary-foreground px-8 py-3.5 rounded-xl font-semibold btn-ripple hover:opacity-90 transition-opacity">
            Get a Corporate Quote
          </button>
        </div>

        <div className="glass-card-solid rounded-2xl p-8 sm:p-10">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">Request a Callback</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <input
              type="email"
              placeholder="Business Email"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
              <option>Estimated Monthly Requirement</option>
              <option>10 – 50 units</option>
              <option>50 – 200 units</option>
              <option>200+ units</option>
            </select>
            <button
              type="submit"
              className="w-full water-gradient text-primary-foreground py-3.5 rounded-xl font-semibold btn-ripple hover:opacity-90 transition-opacity"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default CorporateSection;
