<template>
  <div class="m-register-modal" v-if="isVisible">
    <div class="m-register-modal__backdrop" @click="closeModal" />
    <div class="m-register__form-container">
      <div class="m-register__form-card">
        <button class="m-register__close" @click="closeModal">✕</button>

        <div class="m-register__form__img-container">
          <img
            src="../../assets/img/Mundo-electrico-isotipo.svg"
            alt="Logo"
            class="m-register__form__logo"
          />
        </div>
        <h1 class="m-register__form__title">CREAR CUENTA</h1>

        <form @submit.prevent="handleRegister" class="m-register__form">
          <input
            v-model="name"
            type="text"
            class="m-register__form__input"
            placeholder="Nombre"
          />
          <input
            v-model="email"
            type="email"
            class="m-register__form__input"
            placeholder="Correo"
          />
          <!-- <input
            v-model="phone"
            type="phone"
            class="m-register__form__input"
            placeholder="Teléfono"
          /> -->
          <input
            v-model="password"
            type="password"
            class="m-register__form__input"
            placeholder="Contraseña"
          />
          <input
            v-model="confirmPassword"
            type="password"
            class="m-register__form__input"
            placeholder="Confirmar contraseña"
          />
          <input
            type="submit"
            class="m-register__form__button"
            value="Registrar"
          />
        </form>

        <p class="m-register__form__text">
          ¿Ya tienes cuenta?
          <span @click="switchToLogin" class="m-register__form__link"
            >Inicia sesión</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useModalStore } from "~/stores/useModalStore";
import { registerUser } from "~/api/services/authService";
import { useAuth } from "~/composables/useAuth";

const modal = useModalStore();

const isVisible = computed(() => modal.activeModal === "register");

const closeModal = () => {
  modal.closeModal();
};

const switchToLogin = () => {
  modal.openModal("login");
};

const name = ref("");
const email = ref("");
// const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

const { setAuth } = useAuth();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const res = await registerUser({
      username: name.value,
      email: email.value,
      // phone: phone.value,
      password: password.value,
    });

    setAuth(res.jwt, res.user);
    modal.closeModal();
  } catch (err) {
    alert("Error al registrar. Revisa los datos.");
  }
};
</script>

<style scoped lang="scss">
.m-register-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
}
.m-register-modal__backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.m-register__close {
  position: absolute;
  top: 10px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 998;
}
.m-register {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-register__form-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-register__form-card {
  width: 100%;
  max-width: 450px;
  min-height: 600px;
  min-height: 600px;
  background-color: var(--vt-c-white);
  border-radius: 16px;
  -webkit-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  -moz-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
  z-index: 9999;
}
.m-register__form__img-container {
  width: 80px;
  height: 80px;
  margin-top: 30px;
}
.m-register__form__logo {
  width: 100%;
  height: 100%;
}
.m-register__form__title {
  color: var(--secondary-color);
  font-family: var(--secondary-font);
  font-size: 1.7rem;
  font-weight: 800;
  text-align: center;
}
.m-register__form {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.m-register__form__input {
  width: 90%;
  height: 40px;
  border: solid 1px var(--third-color);
  border-radius: 18px;
  padding: 10px;
}
.m-register__form__button {
  width: 90%;
  height: 35px;
  border-radius: 18px;
  background-color: var(--secondary-color);
  font-family: var(--secondary-font);
  color: var(--vt-c-white);
}
.m-register__form__link {
  cursor: pointer;
  color: var(--secondary-color);
  font-weight: bold;
}
</style>
