import { create } from "zustand";
import { Product } from "@/app/types/type-for-product";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  getCartTotal: () => number;
    clearCart: () => void;

  
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  addToCart: (product, quantity = 1) => {
    const existingItem = get().cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cartItems: get().cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({
        cartItems: [...get().cartItems, { ...product, quantity }],
      });
    }
  },

  clearCart: ()=>  set({ cartItems: []}),

  getCartTotal: () => {
    return get().cartItems.reduce((total, item) => {
      const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
      return total + price * item.quantity;
    }, 0);
  },
}));
