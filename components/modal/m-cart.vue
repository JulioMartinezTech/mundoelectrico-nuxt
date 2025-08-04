<!-- components/ui/modal/CartModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="ui.showCartModal" class="c-cart-modal">
        <div class="c-cart-modal__overlay" @click="closeModal" />
        <div class="c-cart-modal__content">
          <header class="c-cart-modal__header">
            <h2>🛒 Tu carrito</h2>
            <button class="c-cart-modal__close" @click="closeModal">✕</button>
          </header>

          <section v-if="cart.products.length" class="c-cart-modal__body">
            <ul>
              <li v-for="item in cart.products" :key="item.id">
                código: {{ item.id }} - Cantidad: {{ item.quantity }}
              </li>
            </ul>
          </section>

          <section v-else class="c-cart-modal__empty">
            <p>Tu carrito está vacío.</p>
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const cart = useCartStore();
const ui = useUIStore();

const closeModal = () => {
  ui.showCartModal = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.c-cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.c-cart-modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.c-cart-modal__content {
  position: relative;
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  z-index: 10001;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.c-cart-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.c-cart-modal__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.c-cart-modal__body {
  margin-top: 1rem;
}

.c-cart-modal__empty {
  text-align: center;
  margin-top: 2rem;
  color: #888;
}
</style>
