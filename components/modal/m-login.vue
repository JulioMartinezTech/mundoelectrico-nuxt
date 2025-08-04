<template>
  <div class="m-login-modal" v-if="visible">
    <div class="m-login-modal__backdrop" @click="close" />
    <div class="m-login__form-container">
      <div class="m-login__form-card">
        <button class="m-login__close" @click="close">✕</button>
        <div class="m-login__form__img-container">
          <img
            src="../../assets/img/logo-isotipo.png"
            alt="Logo"
            class="m-login__form__logo"
          />
        </div>
        <h1 class="m-login__form__title">INICIA SESIÓN</h1>
        <form @submit.prevent="handleLogin" class="m-login__form">
          <input
            type="email"
            v-model="email"
            class="m-login__form__input"
            placeholder="Correo"
          />
          <div
            v-if="!emailValido && email"
            class="m-login__form__error-container"
          >
            <p class="m-login__form__error">Formato no válido</p>
          </div>
          <input
            type="password"
            v-model="password"
            class="m-login__form__input"
            placeholder="Contraseña"
          />
          <input
            type="submit"
            class="m-login__form__button"
            value="Iniciar sesión"
          />
        </form>
        <p class="m-login__form__text">
          ¿No tienes cuenta?
          <span @click="switchToRegister" class="m-login__form__link">
            Regístrate
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { loginUser } from "~/api/services/authService";

const user = useUserStore();

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(["close", "switchToRegister", "loggedIn"]);

const close = () => emit("close");
const switchToRegister = () => emit("switchToRegister");

const email = ref("");
const password = ref("");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValido = computed(() => emailRegex.test(email.value));

const handleLogin = async () => {
  if (!emailValido.value) return;

  try {
    const res = await loginUser({
      identifier: email.value,
      password: password.value,
    });
    user.addUser(
      {
        documentId: res.user.documentId,
        username: res.user.username,
        email: res.user.email,
        provider: res.user.provider,
        confirmed: res.user.confirmed,
        blocked: res.user.blocked,
      },
      res.jwt
    );
    emit("loggedIn"); // para continuar flujo
  } catch (err) {
    alert("Credenciales incorrectas");
  }
};
</script>
<style lang="scss" scoped>
.m-login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
}
.m-login-modal__backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.m-login__close {
  position: absolute;
  top: 10px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 998;
}
.m-login {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-login__form-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-login__form-card {
  width: 450px;
  height: 500px;
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
  z-index: 999;
}
.m-login__form__img-container {
  width: 150px;
  height: 150px;
}
.m-login__form__logo {
  width: 100%;
  height: 100%;
}
.m-login__form__title {
  color: var(--secondary-color);
  font-family: "ItcDemi";
  font-size: 1.7rem;
  font-weight: 800;
  text-align: center;
}
.m-login__form {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.m-login__form__input {
  width: 90%;
  height: 40px;
  border: solid 1px var(--third-color);
  border-radius: 18px;
  padding: 10px;
}
.m-login__form__error-container {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
}
.m-login__form__error {
  color: var(--text-error);
}
.m-login__form__button {
  width: 90%;
  height: 35px;
  border-radius: 18px;
  background-color: var(--secondary-color);
  font-family: "ItcDemi";
  color: var(--vt-c-white);
}
.m-login__form__link {
  cursor: pointer;
  color: var(--secondary-color);
  font-weight: bold;
}
</style>
