import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders, type OrderStatus } from "@/contexts/OrderContext";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Package, RefreshCw, CheckCircle2, Truck, ChefHat, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: any; color: string }> = {
  placed: { label: "Order Placed", icon: Clock, color: "text-accent" },
  preparing: { label: "Preparing", icon: ChefHat, color: "text-amber-500" },
  out_for_delivery: { label: "Out for Delivery", icon: Truck, color: "text-primary" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "text-primary" },
};

const STATUS_ORDER: OrderStatus[] = ["placed", "preparing", "out_for_delivery", "delivered"];

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!isAuthenticated) { navigate("/login"); return null; }

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => addToCart(item.product, item.quantity));
    toast({ title: "Items added to cart! 🛒", description: "Your previous order items have been added." });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-border mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">No orders yet</p>
            <Link to="/" className="text-primary font-semibold hover:underline text-sm mt-2 inline-block">Start shopping →</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => {
              const statusIdx = STATUS_ORDER.indexOf(order.status);
              return (
                <div key={order.id} className="glass-card-solid rounded-2xl p-6 animate-fade-in">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-mono font-bold text-primary text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">Placed {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-sm font-semibold ${STATUS_CONFIG[order.status].color}`}>
                      {(() => { const Icon = STATUS_CONFIG[order.status].icon; return <Icon className="h-4 w-4" />; })()}
                      {STATUS_CONFIG[order.status].label}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-1 mb-6">
                    {STATUS_ORDER.map((s, i) => (
                      <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors ${i <= statusIdx ? "water-gradient" : "bg-border"}`} />
                    ))}
                  </div>

                  {/* Items */}
                  <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex-shrink-0 flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
                        <img src={item.product.image} alt={item.product.name} className="w-8 h-10 object-contain" />
                        <div>
                          <p className="text-xs font-medium text-foreground">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-bold text-foreground font-display">₹{order.total}</span>
                      {order.couponCode && <span className="ml-2 text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">{order.couponCode}</span>}
                    </div>
                    <button onClick={() => handleReorder(order)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                      <RefreshCw className="h-4 w-4" /> Reorder
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    📅 {order.deliveryDate} • 🕐 {order.deliverySlot}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
