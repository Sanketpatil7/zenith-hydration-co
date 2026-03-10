import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAddresses } from "@/contexts/AddressContext";
import { useOrders } from "@/contexts/OrderContext";
import { ArrowLeft, Tag, Calendar, Clock, MapPin, ShoppingBag, Plus, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, addDays } from "date-fns";

const COUPONS: Record<string, { type: "percent" | "flat" | "free_delivery"; value: number; minOrder: number; label: string }> = {
  FIRSTORDER: { type: "percent", value: 20, minOrder: 0, label: "20% off your first order" },
  SAVE50: { type: "flat", value: 50, minOrder: 200, label: "₹50 off on orders above ₹200" },
  FREEDEL: { type: "free_delivery", value: 0, minOrder: 0, label: "Free delivery on this order" },
};

const TIME_SLOTS = ["7:00 AM – 9:00 AM", "9:00 AM – 12:00 PM", "12:00 PM – 3:00 PM", "3:00 PM – 6:00 PM", "6:00 PM – 9:00 PM"];
const DELIVERY_FEE = 40;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addresses, defaultAddress } = useAddresses();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id || "");
  const [deliveryDate, setDeliveryDate] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"));
  const [deliverySlot, setDeliverySlot] = useState(TIME_SLOTS[1]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || defaultAddress;

  const { discount, deliveryFee, total } = useMemo(() => {
    let disc = 0;
    let delFee = DELIVERY_FEE;
    if (appliedCoupon && COUPONS[appliedCoupon]) {
      const c = COUPONS[appliedCoupon];
      if (c.type === "percent") disc = Math.round(totalPrice * c.value / 100);
      else if (c.type === "flat") disc = c.value;
      else if (c.type === "free_delivery") delFee = 0;
    }
    return { discount: disc, deliveryFee: delFee, total: totalPrice - disc + delFee };
  }, [totalPrice, appliedCoupon]);

  if (!isAuthenticated) { navigate("/login"); return null; }

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const coupon = COUPONS[code];
    if (!coupon) { toast({ title: "Invalid coupon", description: "This coupon code doesn't exist.", variant: "destructive" }); return; }
    if (totalPrice < coupon.minOrder) { toast({ title: "Minimum order not met", description: `This coupon requires a minimum order of ₹${coupon.minOrder}.`, variant: "destructive" }); return; }
    setAppliedCoupon(code);
    toast({ title: "Coupon applied! 🎉", description: coupon.label });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) { toast({ title: "Please select a delivery address", variant: "destructive" }); return; }
    if (items.length === 0) return;

    const order = placeOrder({
      items: [...items],
      address: selectedAddress,
      deliveryDate,
      deliverySlot,
      subtotal: totalPrice,
      discount,
      deliveryFee,
      total,
      couponCode: appliedCoupon,
    });

    clearCart();
    setOrderPlaced(true);
    setPlacedOrderId(order.id);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md animate-scale-in">
          <div className="w-20 h-20 rounded-full water-gradient flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
          <p className="text-muted-foreground mb-1">Order ID: <span className="font-mono font-bold text-primary">{placedOrderId}</span></p>
          <p className="text-muted-foreground text-sm mb-8">Your premium water is on its way. Track your order in real time.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/orders" className="water-gradient text-primary-foreground px-8 py-3 rounded-xl font-semibold btn-ripple hover:opacity-90 transition-opacity">
              Track Order
            </Link>
            <Link to="/" className="border border-border text-foreground px-8 py-3 rounded-xl font-medium hover:bg-secondary transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-border mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <Link to="/" className="text-primary font-semibold hover:underline text-sm">Continue shopping →</Link>
        </div>
      </div>
    );
  }

  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(new Date(), i + 1);
    return { value: format(d, "yyyy-MM-dd"), label: format(d, "EEE, d MMM") };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <div className="glass-card-solid rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Delivery Address</h2>
                <Link to="/addresses" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1"><Plus className="h-4 w-4" /> Add New</Link>
              </div>
              {addresses.length === 0 ? (
                <p className="text-muted-foreground text-sm">No addresses saved. <Link to="/addresses" className="text-primary font-semibold hover:underline">Add one</Link></p>
              ) : (
                <div className="space-y-3">
                  {addresses.map(addr => (
                    <label key={addr.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${selectedAddressId === addr.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                      <input type="radio" name="address" checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)} className="mt-1 accent-primary" />
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{addr.label}</span>
                        <p className="font-semibold text-foreground text-sm">{addr.name}</p>
                        <p className="text-muted-foreground text-xs">{addr.line1}, {addr.city} – {addr.pincode}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery Slot */}
            <div className="glass-card-solid rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Delivery Schedule</h2>
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">Select Date</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {availableDates.map(d => (
                    <button key={d.value} onClick={() => setDeliveryDate(d.value)}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${deliveryDate === d.value ? "water-gradient text-primary-foreground" : "border border-border text-foreground hover:border-primary/30"}`}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-1"><Clock className="h-4 w-4 text-primary" /> Select Time Slot</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button key={slot} onClick={() => setDeliverySlot(slot)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${deliverySlot === slot ? "water-gradient text-primary-foreground" : "border border-border text-foreground hover:border-primary/30"}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Coupon */}
            <div className="glass-card-solid rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Tag className="h-5 w-5 text-primary" /> Apply Coupon</h2>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-primary/10 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-primary">{appliedCoupon}</p>
                    <p className="text-xs text-muted-foreground">{COUPONS[appliedCoupon].label}</p>
                  </div>
                  <button onClick={() => setAppliedCoupon(null)} className="text-destructive text-sm font-medium hover:underline">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter coupon code"
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                    maxLength={20} />
                  <button onClick={applyCoupon} className="water-gradient text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold btn-ripple hover:opacity-90">Apply</button>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {Object.entries(COUPONS).map(([code, c]) => (
                  <button key={code} onClick={() => { setCouponCode(code); }}
                    className="text-xs border border-dashed border-primary/40 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors font-mono">
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="glass-card-solid rounded-2xl p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-contain rounded bg-secondary p-1" />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground ml-2">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{totalPrice}</span></div>
                {discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-₹{discount}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-foreground">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-bold text-foreground text-base">Total</span>
                  <span className="font-bold text-foreground text-xl font-display">₹{total}</span>
                </div>
              </div>
              <button onClick={handlePlaceOrder} disabled={!selectedAddress}
                className="w-full mt-6 water-gradient text-primary-foreground py-3.5 rounded-xl font-semibold btn-ripple hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                Place Order — ₹{total}
              </button>
              <p className="text-xs text-center text-muted-foreground mt-3">🔒 Secure checkout • Cash on delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
