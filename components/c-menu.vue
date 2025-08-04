<template>
  <nav class="c-menu">
    <NuxtLink to="/" class="c-menu__item">INICIO</NuxtLink>
    <NuxtLink to="/nosotros" class="c-menu__item">NOSOTROS</NuxtLink>
    <NuxtLink to="/productos" class="c-menu__item">PRODUCTOS</NuxtLink>
    <NuxtLink to="/contactanos" class="c-menu__item">CONTÁCTANOS</NuxtLink>
    <div
      v-if="!user.isLogin"
      class="c-menu__login-icon-container"
      role="button"
      tabindex="0"
      @click="handleLoginClick"
      @keyup.enter="handleLoginClick"
      aria-label="Abrir login"
    >
      <img
        src="../assets/img/login-icon.svg"
        alt="login"
        class="c-menu__login-icon"
      />
    </div>
    <div v-else class="c-menu__login-icon-container">
      <p>{{ userInitial }}</p>
    </div>
    <CCart />
  </nav>
</template>

<script setup>
import { useModalStore } from "@/stores/useModalStore";
import CCart from "./c-cart.vue";
const modal = useModalStore();
const user = useUserStore();

const userInitial = user.userData ? user.userData.username[0] : "";

const handleLoginClick = () => {
  modal.openModal("login");
};
</script>

<style lang="scss" scoped>
.c-menu {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 16px;
  padding: 10px;
}
.c-menu__item {
  font-family: "ItcDemi";
  color: var(--secondary-color);
  text-decoration: none;
  &:hover {
    border-bottom: solid 2px var(--secondary-color);
  }
}
.c-menu__login-icon-container {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: solid 2px var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-menu__login-icon-container p {
  color: var(--secondary-color);
  font-family: "ItcDemi";
  font-size: 1.3rem;
}
.c-menu__login-icon {
  width: 80%;
}
</style>
