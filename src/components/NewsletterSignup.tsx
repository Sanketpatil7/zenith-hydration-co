import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Subscribed! 🎉", description: "You'll receive hydration tips and exclusive offers." });
  };

  return (
    <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 mt-10">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-primary" />
            <h4 className="font-display font-bold text-foreground text-lg">Stay Hydrated</h4>
          </div>
          <p className="text-muted-foreground text-sm">
            Get hydration tips, exclusive offers, and new product updates directly to your inbox.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          {submitted ? (
            <div className="flex items-center gap-2 text-primary font-semibold">
              <CheckCircle className="h-5 w-5" />
              <span>You're subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 sm:w-56 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                maxLength={255}
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition flex items-center gap-1"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
