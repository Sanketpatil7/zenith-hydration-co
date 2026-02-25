import { useState } from "react";
import { products } from "@/data/products";
import ProductModal from "./ProductModal";
import type { Product } from "@/contexts/CartContext";

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2">Our Collection</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Choose Your <span className="text-gradient">Perfect</span> Hydration
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            From personal bottles to corporate dispensers — premium purity in every drop.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group glass-card-solid rounded-2xl p-4 sm:p-6 text-left hover-lift cursor-pointer"
            >
              <div className="bg-secondary rounded-xl p-4 mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 sm:h-40 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-[10px] sm:text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</span>
              <h3 className="font-display font-bold text-foreground text-sm sm:text-base mt-1 truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground">{product.size}</p>
              <p className="text-lg sm:text-xl font-bold text-primary mt-2">₹{product.price}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
};

export default ProductsSection;
