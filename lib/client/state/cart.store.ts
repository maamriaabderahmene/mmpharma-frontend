import { create } from 'zustand';
import type { CartLineItem } from '@/lib/shared/types/Cart';

interface CartState {
  items: CartLineItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: CartLineItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, conditionnement: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

function computeItemCount(items: CartLineItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function computeSubtotal(items: CartLineItem[]): number {
  return items.reduce((sum, item) => sum + item.lineTotal, 0);
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  itemCount: 0,
  subtotal: 0,

  addItem: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.productId === item.productId && i.conditionnement === item.conditionnement,
      );
      let newItems: CartLineItem[];
      if (existingIndex > -1) {
        newItems = state.items.map((i, idx) =>
          idx === existingIndex
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                lineTotal: (i.quantity + item.quantity) * i.unitPrice,
              }
            : i,
        );
      } else {
        newItems = [...state.items, item];
      }
      return {
        items: newItems,
        itemCount: computeItemCount(newItems),
        subtotal: computeSubtotal(newItems),
      };
    }),

  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.productId !== productId);
      return {
        items: newItems,
        itemCount: computeItemCount(newItems),
        subtotal: computeSubtotal(newItems),
      };
    }),

  updateQuantity: (productId, conditionnement, quantity) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.productId === productId && i.conditionnement === conditionnement
          ? { ...i, quantity, lineTotal: quantity * i.unitPrice }
          : i,
      );
      return {
        items: newItems,
        itemCount: computeItemCount(newItems),
        subtotal: computeSubtotal(newItems),
      };
    }),

  clearCart: () => set({ items: [], itemCount: 0, subtotal: 0 }),

  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
}));
