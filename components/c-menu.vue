<template>
  <nav class="c-menu">
    <div class="c-menu__login-cart__mobile">
      <!-- Login en mobile-->
      <button
        v-if="!user.isLogin"
        class="c-menu__login-icon-container"
        @click="handleLoginClick"
        aria-label="Abrir login"
      >
        <img
          src="../assets/img/login-icon.svg"
          alt="login"
          class="c-menu__login-icon"
        />
        <!-- Botón hamburguesa -->
      </button>
      <div v-else class="c-menu__login-icon-container">
        <p>{{ userInitial }}</p>
      </div>

      <!-- Carrito en mobile -->
      <CCart class="c-menu__cart" />
    </div>
    <button
      class="c-hamburger"
      :class="{ 'is-active': isOpen }"
      @click="isOpen = !isOpen"
      aria-label="Abrir menú"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Enlaces -->
    <div :class="['c-menu__links', { 'c-menu__links--open': isOpen }]">
      <NuxtLink to="/" class="c-menu__item" @click="isOpen = !isOpen"
        >INICIO</NuxtLink
      >
      <NuxtLink to="/nosotros" class="c-menu__item" @click="isOpen = !isOpen"
        >NOSOTROS</NuxtLink
      >
      <NuxtLink to="/productos" class="c-menu__item" @click="isOpen = !isOpen"
        >PRODUCTOS</NuxtLink
      >
      <NuxtLink to="/contactanos" class="c-menu__item" @click="isOpen = !isOpen"
        >CONTÁCTANOS</NuxtLink
      >

      <!-- Login en desktop -->
      <button
        v-if="!user.isLogin"
        class="c-menu__login-icon-container c-menu__desktop"
        @click="handleLoginClick"
        aria-label="Abrir login"
      >
        <img
          src="../assets/img/login-icon.svg"
          alt="login"
          class="c-menu__login-icon"
        />
      </button>
      <div v-else class="c-menu__login-icon-container c-menu__desktop">
        <p>{{ userInitial }}</p>
      </div>

      <!-- Cart en desktop -->
      <CCart class="c-menu__cart c-menu__desktop" />
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useModalStore } from "@/stores/useModalStore";
import { useUserStore } from "@/stores/useUserStore";
import CCart from "./c-cart.vue";

const isOpen = ref(false);

const modal = useModalStore();
const user = useUserStore();

const userInitial = computed(() => user.userData?.username?.[0] ?? "");

const handleLoginClick = () => {
  modal.openModal("login");
};
</script>

<style lang="scss" scoped>
/* Nav base */
.c-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 99;
}

.c-menu__login-cart__mobile {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
}

/* ---------- Botón hamburguesa ---------- */
.c-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 25px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    display: block;
    height: 3px;
    width: 100%;
    background: var(--secondary-color);
    border-radius: 2px;
    transition: all 0.3s ease;
  }
}

/* Animación a "X" */
.c-hamburger.is-active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.c-hamburger.is-active span:nth-child(2) {
  opacity: 0;
}
.c-hamburger.is-active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ---------- Menú Links ---------- */
.c-menu__links {
  display: none;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.c-menu__links--open {
  display: flex;
}

.c-menu__item {
  font-family: var(--secondary-font);
  color: var(--secondary-color);
  text-decoration: none;

  &:hover {
    border-bottom: solid 2px var(--secondary-color);
  }
}

/* Login */
.c-menu__login-icon-container {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: solid 2px var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}

.c-menu__login-icon-container p {
  color: var(--secondary-color);
  font-family: var(--secondary-font);
  font-size: 1.3rem;
  line-height: 1;
  margin: 0;
}

.c-menu__login-icon {
  width: 80%;
}

.c-menu__desktop {
  display: none;
}

/* ---------- Desktop ---------- */
@media (min-width: 768px) {
  .c-menu__desktop {
    display: flex;
  }
  .c-menu__login-cart__mobile {
    display: none;
  }
  .c-hamburger {
    display: none;
  }

  .c-menu__links {
    display: flex !important;
    flex-direction: row;
    position: static;
    background: none;
    box-shadow: none;
    padding: 0;
    gap: 16px;
  }
}
</style>
