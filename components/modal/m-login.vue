<template>
  <div class="m-login-modal" v-if="visible">
    <div class="m-login-modal__backdrop" @click="close" />
    <div class="m-login__form-container">
      <div class="m-login__form-card">
        <button class="m-login__close" @click="close">✕</button>
        <div class="m-login__form__img-container">
          <img
            src="../../assets/img/Mundo-electrico-isotipo.svg"
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px; // margen interno en mobile
}

.m-login-modal__backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.m-login__form-container {
  width: 100%;
  height: auto;
  max-width: 500px; // en desktop
  z-index: 999;
}

.m-login__form-card {
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

.m-login__close {
  position: absolute;
  top: 10px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}

.m-login__form__img-container {
  width: 70px;
  height: 70px;
}

.m-login__form__logo {
  width: 100%;
  height: 100%;
}

.m-login__form__title {
  color: var(--secondary-color);
  font-family: var(--secondary-font);
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
}

.m-login__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.m-login__form__input,
.m-login__form__button {
  width: 100%;
  height: 40px;
  border-radius: 18px;
  padding: 10px;
}

.m-login__form__input {
  border: solid 1px var(--third-color);
}

.m-login__form__error-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 5px;
}

.m-login__form__error {
  color: var(--text-error);
  font-size: 0.85rem;
}

.m-login__form__button {
  background-color: var(--secondary-color);
  font-family: var(--secondary-font);
  color: var(--vt-c-white);
  cursor: pointer;
}

.m-login__form__link {
  cursor: pointer;
  color: var(--secondary-color);
  font-weight: bold;
  text-align: center;
}

/* --- Responsive --- */
@media (min-width: 768px) {
  .m-login__form-card {
    padding: 40px 30px;
  }

  .m-login__form__title {
    font-size: 1.7rem;
  }
}
</style>
