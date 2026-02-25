import { useState } from "react";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart, type Product } from "@/contexts/CartContext";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary hover:bg-border transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid sm:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Image */}
          <div
            className="bg-secondary rounded-xl flex items-center justify-center p-6 cursor-zoom-in overflow-hidden"
            onClick={() => setZoomed(!zoomed)}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`max-h-64 sm:max-h-80 object-contain transition-transform duration-500 ${
                zoomed ? "scale-150" : "scale-100 hover:scale-110"
              }`}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">{product.category}</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-1">{product.name}</h2>
              <p className="text-muted-foreground text-lg mt-1">{product.size}</p>
              <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-6">
              <p className="text-3xl font-bold text-primary">₹{product.price * quantity}</p>
              <p className="text-sm text-muted-foreground">₹{product.price} per unit</p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-sm font-medium text-foreground">Qty:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-secondary transition-colors rounded-l-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-secondary transition-colors rounded-r-lg"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full mt-6 water-gradient text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 btn-ripple hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart — ₹{product.price * quantity}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
