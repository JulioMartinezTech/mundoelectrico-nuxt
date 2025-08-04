<template>
  <div class="c-cart">
    <div class="c-cart__icon-container" @click="openCart">
      <img
        src="../assets/img/cart-icon.svg"
        alt="carrito-icono"
        class="c-cart__icon"
      />
      <div class="c-cart__counter">{{ cartCounter }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cart = useCartStore();
const cartCounter = computed(() => cart.products.length);
const ui = useUIStore();
const openCart = () => (ui.showCartModal = true);
</script>

<style scoped>
.c-cart__icon-container {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
  border-radius: 50%;
}
.c-cart__icon {
  width: 60%;
  height: auto;
}
.c-cart__counter {
  min-width: 20px;
  min-height: 20px;
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 0.6rem;
  font-weight: bold;
  color: var(--vt-c-white);
  background-color: var(--secondary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
