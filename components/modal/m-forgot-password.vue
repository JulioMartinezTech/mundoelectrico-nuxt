<template>
  <div class="m-forgot-password-modal" v-if="visible">
    <div class="m-forgot-password-modal__backdrop" @click="close" />
    <div class="m-forgot-password__form-container">
      <div class="m-forgot-password__form-card">
        <button class="m-forgot-password__close" @click="close">✕</button>
        <div class="m-forgot-password__form__img-container">
          <img
            src="../../assets/img/Mundo-electrico-isotipo.svg"
            alt="Logo"
            class="m-forgot-password__form__logo"
          />
        </div>
        <h1 class="m-forgot-password__form__title">Olvide la contraseña</h1>
        <form @submit.prevent="handleLogin" class="m-forgot-password__form">
          <input
            type="email"
            v-model="email"
            class="m-forgot-password__form__input"
            placeholder="Correo"
          />
          <div
            v-if="!emailValido && email"
            class="m-forgot-password__form__error-container"
          >
            <p class="m-forgot-password__form__error">Formato no válido</p>
          </div>
          <input
            type="submit"
            class="m-forgot-password__form__button"
            value="Enviar"
          />
        </form>
        <p class="m-forgot-password__form__text">
          ¿No tienes cuenta?
          <span @click="switchToRegister" class="m-forgot-password__form__link">
            Regístrate
          </span>
        </p>
        <p class="m-forgot-password__form__text">
          ¿Ya tienes cuenta?
          <span @click="switchToLogin" class="m-forgot-password__form__link">
            Inicia sesion
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { forgotPassword } from "~/api/services/authService";

const user = useUserStore();

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(["close", "switchToRegister", "swithToLogin"]);

const close = () => emit("close");
const switchToRegister = () => emit("switchToRegister");
const switchToLogin = () => emit("switchToLogin");

const email = ref("");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValido = computed(() => emailRegex.test(email.value));

const handleLogin = async () => {
  if (!emailValido.value) return;

  try {
    const res = await forgotPassword(email.value);
    emit("emailSent", res);
  } catch (error) {
    console.error(error);
  }
};
</script>
<style lang="scss" scoped>
.m-forgot-password-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px; // margen interno en mobile
}

.m-forgot-password-modal__backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.m-forgot-password__form-container {
  width: 100%;
  height: auto;
  max-width: 500px; // en desktop
  z-index: 9999;
}

.m-forgot-password__form-card {
  width: 100%;
  max-width: 450px;
  background-color: var(--vt-c-white);
  border-radius: 16px;
  box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
  padding: 30px 20px; // padding interno
  position: relative;
}

.m-forgot-password__close {
  position: absolute;
  top: 10px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}

.m-forgot-password__form__img-container {
  width: 70px;
  height: 70px;
}

.m-forgot-password__form__logo {
  width: 100%;
  height: 100%;
}

.m-forgot-password__form__title {
  color: var(--secondary-color);
  font-family: var(--secondary-font);
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
}

.m-forgot-password__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.m-forgot-password__form__input,
.m-forgot-password__form__button {
  width: 100%;
  height: 40px;
  border-radius: 18px;
  padding: 10px;
}

.m-forgot-password__form__input {
  border: solid 1px var(--third-color);
}

.m-forgot-password__form__error-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 5px;
}

.m-forgot-password__form__error {
  color: var(--text-error);
  font-size: 0.85rem;
}

.m-forgot-password__form__button {
  background-color: var(--secondary-color);
  font-family: var(--secondary-font);
  color: var(--vt-c-white);
  cursor: pointer;
}

.m-forgot-password__form__link {
  cursor: pointer;
  color: var(--secondary-color);
  font-weight: bold;
  text-align: center;
}

/* --- Responsive --- */
@media (min-width: 768px) {
  .m-forgot-password__form-card {
    padding: 40px 30px;
  }

  .m-forgot-password__form__title {
    font-size: 1.7rem;
  }
}
</style>
