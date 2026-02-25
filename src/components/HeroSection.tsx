import heroBottle from "@/assets/hero-bottle.jpg";

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden wave-bg">
      {/* Wave SVG decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="hsl(0 0% 100%)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4 animate-fade-in">
              Premium Hydration from the Himalayas
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Pure Water,{" "}
              <span className="text-gradient">Pure Life</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Sourced from pristine Himalayan springs and purified through our 7-stage process. Experience water the way nature intended — crystal clear, mineral-rich, and refreshingly pure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={scrollToProducts}
                className="water-gradient text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold btn-ripple hover:opacity-90 transition-opacity glow-primary"
              >
                Explore Collection
              </button>
              <button
                onClick={() => document.getElementById("quality")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-primary text-primary px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Our Process
              </button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {[
                { value: "7.4", label: "pH Balance" },
                { value: "200+", label: "Cities Served" },
                { value: "100%", label: "Natural Minerals" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-primary">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute inset-0 water-gradient rounded-full blur-3xl opacity-20 scale-75" />
              <img
                src={heroBottle}
                alt="PuraVida Premium Bottled Water"
                className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg float-animation drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
