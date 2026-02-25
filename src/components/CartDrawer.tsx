import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={() => setIsCartOpen(false)}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div
        className="absolute top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl animate-slide-in-right flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-bold">Your Cart</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-border mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add some premium water to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 rounded-xl glass-card-solid">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-contain rounded-lg bg-secondary p-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground truncate">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.product.size}</p>
                    <p className="text-sm font-bold text-primary mt-1">₹{item.product.price * item.quantity}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded bg-secondary hover:bg-border transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded bg-secondary hover:bg-border transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                      <button onClick={() => removeFromCart(item.product.id)} className="ml-auto p-1 rounded text-destructive hover:bg-destructive/10 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Total</span>
              <span className="text-2xl font-display font-bold text-foreground">₹{totalPrice}</span>
            </div>
            <button className="w-full water-gradient text-primary-foreground py-3.5 rounded-xl font-semibold btn-ripple hover:opacity-90 transition-opacity">
              Proceed to Checkout
            </button>
            <button onClick={clearCart} className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
