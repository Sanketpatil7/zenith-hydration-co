import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { CartItem } from "./CartContext";
import type { Address } from "./AddressContext";

export type OrderStatus = "placed" | "preparing" | "out_for_delivery" | "delivered";

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  deliveryDate: string;
  deliverySlot: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode: string | null;
  status: OrderStatus;
  placedAt: string;
  statusHistory: { status: OrderStatus; timestamp: string }[];
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "status" | "placedAt" | "statusHistory">) => Order;
  getOrder: (id: string) => Order | undefined;
  lastOrder: Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const simulateProgress = (order: Order): Order => {
  const placed = new Date(order.placedAt).getTime();
  const now = Date.now();
  const diff = (now - placed) / 1000;
  let status: OrderStatus = "placed";
  const history = [...order.statusHistory];
  
  if (diff > 30) { status = "preparing"; if (!history.find(h => h.status === "preparing")) history.push({ status: "preparing", timestamp: new Date(placed + 30000).toISOString() }); }
  if (diff > 90) { status = "out_for_delivery"; if (!history.find(h => h.status === "out_for_delivery")) history.push({ status: "out_for_delivery", timestamp: new Date(placed + 90000).toISOString() }); }
  if (diff > 180) { status = "delivered"; if (!history.find(h => h.status === "delivered")) history.push({ status: "delivered", timestamp: new Date(placed + 180000).toISOString() }); }
  
  return { ...order, status, statusHistory: history };
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("puravida-orders") || "[]");
      return stored.map(simulateProgress);
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("puravida-orders", JSON.stringify(orders));
  }, [orders]);

  // Simulate order progression
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(simulateProgress));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const placeOrder = useCallback((orderData: Omit<Order, "id" | "status" | "placedAt" | "statusHistory">) => {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderData,
      id: `PV-${Date.now().toString(36).toUpperCase()}`,
      status: "placed",
      placedAt: now,
      statusHistory: [{ status: "placed", timestamp: now }],
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const getOrder = useCallback((id: string) => orders.find(o => o.id === id), [orders]);
  const lastOrder = orders[0];

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder, lastOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
