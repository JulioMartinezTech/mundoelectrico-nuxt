<template>
  <div>
    <CHeader />
    <MCart />
    <MLogin
      :visible="modal.activeModal === 'login'"
      @close="modal.closeModal()"
      @switchToRegister="modal.openModal('register')"
      @loggedIn="modal.openModal('login-completed')"
    />
    <MRegister
      :visible="modal.activeModal === 'register'"
      @close="modal.closeModal()"
      @switchToLogin="modal.openModal('login')"
      @registered="modal.openModal('login')"
    />
    <MAuthResponse
      :visible="modal.activeModal === 'login-completed'"
      text="Inicio de sesión realizado exitosamente"
      @close="modal.closeModal()"
    />
    <MAuthResponse
      :visible="modal.activeModal === 'register-completed'"
      text="Registro de usuario realizado exitosamente"
      @close="modal.closeModal()"
    />
    <slot />
    <CFooter />
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/useModalStore";
import CHeader from "~/components/c-header";
import CFooter from "~/components/c-footer";
import MCart from "~/components/modal/m-cart";
import MLogin from "~/components/modal/m-login";
import MRegister from "~/components/modal/m-register";
import MAuthResponse from "~/components/modal/m-auth-response.vue";

const modal = useModalStore();

// const onAutenticado = () => {
//   modal.closeModal();
// };
</script>

<style lang="scss" scoped></style>
