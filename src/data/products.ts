import product500ml from "@/assets/product-500ml.jpg";
import product1l from "@/assets/product-1l.jpg";
import product2l from "@/assets/product-2l.jpg";
import product5l from "@/assets/product-5l.jpg";
import product20l from "@/assets/product-20l.jpg";
import type { Product } from "@/contexts/CartContext";

export const products: Product[] = [
  {
    id: "pure-500",
    name: "PuraVida Pure",
    size: "500ml",
    price: 20,
    image: product500ml,
    description: "Perfect for on-the-go hydration. Himalayan mineral water purified through 7-stage RO process. Ideal companion for your daily commute.",
    category: "personal",
  },
  {
    id: "pure-1000",
    name: "PuraVida Classic",
    size: "1 Litre",
    price: 35,
    image: product1l,
    description: "Our signature glass bottle. Naturally enriched with essential minerals from pristine mountain springs. The everyday premium choice.",
    category: "personal",
  },
  {
    id: "pure-2000",
    name: "PuraVida Family",
    size: "2 Litres",
    price: 55,
    image: product2l,
    description: "Share the purity with your loved ones. Balanced mineral content perfect for the whole family. BPA-free eco-friendly packaging.",
    category: "family",
  },
  {
    id: "pure-5000",
    name: "PuraVida Jar",
    size: "5 Litres",
    price: 90,
    image: product5l,
    description: "Premium hydration for home and small offices. Convenient handle design. UV-treated for maximum purity and safety.",
    category: "home",
  },
  {
    id: "pure-20000",
    name: "PuraVida Dispenser",
    size: "20 Litres",
    price: 120,
    image: product20l,
    description: "Enterprise-grade hydration solution. Compatible with all standard water dispensers. Weekly doorstep delivery available across major Indian cities.",
    category: "corporate",
  },
];
