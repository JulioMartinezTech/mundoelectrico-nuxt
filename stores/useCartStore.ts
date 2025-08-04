import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    products: [] as Array<{ id: string; name: string; quantity: number }>,
  }),
  actions: {
    addProduct(product: { id: string; name: string; quantity?: number }) {
      const existing = this.products.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        this.products.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    clearCart() {
      this.products = [];
    },
  },
});
