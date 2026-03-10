import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
  defaultAddress: Address | undefined;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("puravida-addresses") || "[]");
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("puravida-addresses", JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = useCallback((address: Omit<Address, "id">) => {
    const newAddr: Address = { ...address, id: crypto.randomUUID() };
    setAddresses(prev => {
      if (newAddr.isDefault) return [...prev.map(a => ({ ...a, isDefault: false })), newAddr];
      return [...prev, newAddr];
    });
  }, []);

  const updateAddress = useCallback((id: string, updates: Partial<Address>) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...updates } : 
      updates.isDefault ? { ...a, isDefault: false } : a
    ));
  }, []);

  const deleteAddress = useCallback((id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  }, []);

  const setDefault = useCallback((id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  }, []);

  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress, setDefault, defaultAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddresses must be used within AddressProvider");
  return ctx;
};
