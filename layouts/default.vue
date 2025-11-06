<template>
  <div>
    <CHeader />
    <MCart />
    <MLogin
      :visible="modal.activeModal === 'login'"
      @close="modal.closeModal()"
      @switchToRegister="modal.openModal('register')"
      @switchToForgotPassword="modal.openModal('forgot-password')"
      @loggedIn="modal.openModal('login-completed')"
    />
    <MRegister
      :visible="modal.activeModal === 'register'"
      @close="modal.closeModal()"
      @switchToLogin="modal.openModal('login')"
      @registered="modal.openModal('login')"
    />
    <MForgotPassword
      :visible="modal.activeModal === 'forgot-password'"
      @switchToRegister="modal.openModal('register')"
      @switchToLogin="modal.openModal('login')"
      @close="modal.closeModal()"
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
    <MAuthResponse
      :visible="modal.activeModal === 'email-sent'"
      text="El correo fue enviado correctamente, pronto uno de nuestros agentes se pondra en contacto"
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
import MForgotPassword from "~/components/modal/m-forgot-password.vue";
import MAuthResponse from "~/components/modal/m-auth-response.vue";

const modal = useModalStore();

// const onAutenticado = () => {
//   modal.closeModal();
// };
</script>

<style lang="scss" scoped></style>
