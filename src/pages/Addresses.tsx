import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAddresses, type Address } from "@/contexts/AddressContext";
import { ArrowLeft, Plus, Pencil, Trash2, MapPin, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emptyAddr = { label: "Home", name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", isDefault: false };

const Addresses = () => {
  const { isAuthenticated } = useAuth();
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddresses();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Address, "id">>(emptyAddr);

  if (!isAuthenticated) { navigate("/login"); return null; }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.line1.trim() || !form.city.trim() || !form.pincode.trim()) {
      toast({ title: "Please fill all required fields", variant: "destructive" }); return;
    }
    if (editing) {
      updateAddress(editing, form);
      toast({ title: "Address updated" });
    } else {
      addAddress(form);
      toast({ title: "Address added ✨" });
    }
    setShowForm(false); setEditing(null); setForm(emptyAddr);
  };

  const startEdit = (addr: Address) => {
    const { id, ...rest } = addr;
    setForm(rest); setEditing(id); setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Delivery Addresses</h1>
          {!showForm && (
            <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyAddr); }}
              className="water-gradient text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold btn-ripple hover:opacity-90 flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add New
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSave} className="glass-card-solid rounded-2xl p-6 mb-6 space-y-4 animate-fade-in">
            <h3 className="font-display text-lg font-bold text-foreground">{editing ? "Edit" : "New"} Address</h3>
            <div className="grid grid-cols-2 gap-4">
              <select value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>Home</option><option>Office</option><option>Other</option>
              </select>
              <input placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" maxLength={100} />
            </div>
            <input placeholder="Phone *" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" maxLength={15} />
            <input placeholder="Address Line 1 *" value={form.line1} onChange={e => setForm(f => ({ ...f, line1: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" maxLength={200} />
            <input placeholder="Address Line 2" value={form.line2} onChange={e => setForm(f => ({ ...f, line2: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" maxLength={200} />
            <div className="grid grid-cols-3 gap-4">
              <input placeholder="City *" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" maxLength={50} />
              <input placeholder="State" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" maxLength={50} />
              <input placeholder="Pincode *" value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))}
                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" maxLength={6} />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input type="checkbox" checked={form.isDefault} onChange={e => setForm(f => ({ ...f, isDefault: e.target.checked }))} className="accent-primary" />
              Set as default address
            </label>
            <div className="flex gap-3">
              <button type="submit" className="water-gradient text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold btn-ripple hover:opacity-90">
                {editing ? "Update" : "Save"} Address
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                className="border border-border text-foreground px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-secondary transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        {addresses.length === 0 && !showForm && (
          <div className="text-center py-16">
            <MapPin className="h-16 w-16 text-border mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">No addresses saved yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add a delivery address to get started</p>
          </div>
        )}

        <div className="space-y-4">
          {addresses.map(addr => (
            <div key={addr.id} className={`glass-card-solid rounded-2xl p-5 animate-fade-in ${addr.isDefault ? "ring-2 ring-primary/30" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">{addr.label}</span>
                    {addr.isDefault && <span className="flex items-center gap-0.5 text-xs text-primary"><Star className="h-3 w-3 fill-primary" /> Default</span>}
                  </div>
                  <p className="font-semibold text-foreground text-sm">{addr.name}</p>
                  <p className="text-muted-foreground text-sm">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                  <p className="text-muted-foreground text-sm">{addr.city}, {addr.state} – {addr.pincode}</p>
                  <p className="text-muted-foreground text-xs mt-1">📞 {addr.phone}</p>
                </div>
                <div className="flex items-center gap-1">
                  {!addr.isDefault && (
                    <button onClick={() => { setDefault(addr.id); toast({ title: "Default address updated" }); }}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary" title="Set as default">
                      <Star className="h-4 w-4" />
                    </button>
                  )}
                  <button onClick={() => startEdit(addr)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => { deleteAddress(addr.id); toast({ title: "Address deleted" }); }}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
