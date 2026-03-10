import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart, Menu, X, Droplets, User, LogOut } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Products", href: "#products" },
  { label: "Quality", href: "#quality" },
  { label: "Plans", href: "#subscription" },
  { label: "About", href: "#about" },
  { label: "Corporate", href: "#corporate" },
];

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
            <Droplets className="h-7 w-7 sm:h-8 sm:w-8 text-primary transition-transform group-hover:scale-110" />
            <span className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Pura<span className="text-primary">Vida</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <DarkModeToggle />

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full water-gradient flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-xl shadow-xl z-50 py-2 animate-fade-in">
                      <p className="px-4 py-2 text-sm font-semibold text-foreground truncate border-b border-border mb-1">{user?.name}</p>
                      <button onClick={() => { navigate("/profile"); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2">
                        <User className="h-4 w-4" /> My Account
                      </button>
                      <button onClick={() => { navigate("/orders"); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" /> My Orders
                      </button>
                      <button onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={() => navigate("/login")}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                <User className="h-4 w-4" /> Login
              </button>
            )}

            <button
              onClick={() => scrollTo("#products")}
              className="hidden sm:inline-flex water-gradient text-primary-foreground px-4 lg:px-6 py-2 rounded-lg text-sm font-semibold btn-ripple hover:opacity-90 transition-opacity"
            >
              Order Now
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </button>
            ))}
            {!isAuthenticated && (
              <button onClick={() => { navigate("/login"); setMobileOpen(false); }}
                className="text-left px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary/50 flex items-center gap-2">
                <User className="h-5 w-5" /> Login / Sign Up
              </button>
            )}
            <button
              onClick={() => scrollTo("#products")}
              className="mt-2 water-gradient text-primary-foreground px-6 py-3 rounded-lg text-base font-semibold btn-ripple text-center"
            >
              Order Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
