import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { useAddresses } from "@/contexts/AddressContext";
import { ArrowLeft, User, Package, MapPin, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { orders } = useOrders();
  const { addresses } = useAddresses();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  if (!user) { navigate("/login"); return null; }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: name.trim(), phone: phone.trim() });
    toast({ title: "Profile updated ✨" });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({ title: "Logged out successfully" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Account</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Package, label: "Orders", value: orders.length, link: "/orders" },
            { icon: MapPin, label: "Addresses", value: addresses.length, link: "/addresses" },
            { icon: User, label: "Member since", value: new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }), link: "" },
          ].map(s => (
            <Link key={s.label} to={s.link || "#"} className="glass-card-solid rounded-2xl p-4 text-center hover-lift">
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </Link>
          ))}
        </div>

        {/* Profile Form */}
        <div className="glass-card-solid rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Profile Details</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" maxLength={100} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input type="email" value={user.email} disabled
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-muted-foreground text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" maxLength={15} />
            </div>
            <button type="submit" className="water-gradient text-primary-foreground px-8 py-3 rounded-xl font-semibold btn-ripple hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <Link to="/orders" className="flex items-center gap-3 glass-card-solid rounded-xl p-4 hover-lift">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground text-sm">My Orders</span>
            <span className="ml-auto text-muted-foreground text-sm">{orders.length} orders →</span>
          </Link>
          <Link to="/addresses" className="flex items-center gap-3 glass-card-solid rounded-xl p-4 hover-lift">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground text-sm">Delivery Addresses</span>
            <span className="ml-auto text-muted-foreground text-sm">{addresses.length} saved →</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full glass-card-solid rounded-xl p-4 hover-lift text-left">
            <LogOut className="h-5 w-5 text-destructive" />
            <span className="font-medium text-destructive text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
