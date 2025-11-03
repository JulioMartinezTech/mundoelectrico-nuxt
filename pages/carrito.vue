<template>
  <main class="v-cart">
    <section class="v-cart__section-items-list">
      <div class="v-cart__item" v-for="item in cartItems" :key="item.id">
        <CCartItem
          :id="item.id"
          :quantity="item.quantity"
          :name="item.name"
          :image="item.imgUrl"
        />
      </div>
      <div v-if="isCartEmpty"><p>No hay productos en el carrito</p></div>
    </section>
    <div v-if="products.length > 0" class="v-cart__button-container">
      <CButton text="Solicitar cotización" @actionButton="sendEmail" />
    </div>
  </main>
</template>

<script setup lang="ts">
//dependencies
import { computed } from "vue";
//components
import CCartItem from "~/components/c-cart-item.vue";
import CButton from "~/components/c-button.vue";
//store
import { useCartStore } from "~/stores/useCartStore";
import { useModalStore } from "~/stores/useModalStore";
import { useUserStore } from "~/stores/useUserStore";
//services
import { sendQuoteRequest } from "~/api/services/emailService";

const cart = useCartStore();
const modal = useModalStore();
const user = useUserStore();
const products = computed(() =>
  cart.products.map(({ id, name, quantity }) => {
    return { id, name, quantity };
  })
);

const cartItems = computed(() => cart.products);
const isCartEmpty = computed(() => cart.products.length === 0);

const quoteRequestData = computed(() => {
  return {
    name: user.userData.username,
    email: user.userData.email,
    products: products.value,
  };
});

//functions
const sendEmail = async () => {
  if (!user.userData.documentId) {
    modal.openModal("login");
    return;
  } else {
    try {
      await sendQuoteRequest(quoteRequestData.value);
      cart.clearCart();
    } catch (error) {
      console.error("Error al enviar la cotización", error);
    }
  }
};
</script>

<style scoped>
.v-cart {
  width: 100%;
  height: 100%;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
}
.v-cart__section-items-list {
  width: 70%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.v-cart__item {
  width: 100%;
}
.v-cart__button-container {
  width: 250px;
}
</style>
