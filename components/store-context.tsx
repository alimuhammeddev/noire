"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  key: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

type StoreContextValue = {
  items: CartItem[];
  ready: boolean;
  count: number;
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearBag: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const storageKey = "noire-shopping-bag";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (item): item is CartItem =>
                typeof item?.key === "string" &&
                typeof item?.productId === "string" &&
                typeof item?.size === "string" &&
                typeof item?.color === "string" &&
                Number.isInteger(item?.quantity) &&
                item.quantity > 0,
            ),
          );
        }
      }
    } catch (error) {
      console.error("Unable to restore the NOIRÉ shopping bag.", error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(items));
      } catch (error) {
        console.error("Unable to save the NOIRÉ shopping bag.", error);
      }
    }
  }, [items, ready]);

  const value = useMemo<StoreContextValue>(
    () => ({
      items,
      ready,
      count: items.reduce((total, item) => total + item.quantity, 0),
      addItem: (item) =>
        setItems((current) => {
          const key = `${item.productId}:${item.size}:${item.color}`;
          const existing = current.find((entry) => entry.key === key);
          return existing
            ? current.map((entry) =>
                entry.key === key ? { ...entry, quantity: entry.quantity + item.quantity } : entry,
              )
            : [...current, { ...item, key }];
        }),
      updateQuantity: (key, quantity) => {
        if (!Number.isInteger(quantity) || quantity < 1) return;
        setItems((current) => current.map((item) => (item.key === key ? { ...item, quantity } : item)));
      },
      removeItem: (key) => setItems((current) => current.filter((item) => item.key !== key)),
      clearBag: () => setItems([]),
    }),
    [items, ready],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider.");
  return context;
}
