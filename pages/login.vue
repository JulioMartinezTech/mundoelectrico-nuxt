<template>
  <div class="v-login">
    <div class="v-login__form-container">
      <div class="v-login__form-card">
        <div class="v-login__form__img-container">
          <img
            src="../assets/img/logo-isotipo.png"
            alt="Logo"
            class="v-login__form__logo"
          />
        </div>
        <h1 class="v-login__form__title">INICIA SESIÓN</h1>
        <form action="" class="v-login__form">
          <input
            type="email"
            v-model="email"
            class="v-login__form__input"
            placeholder="Correo"
          />
          <div class="v-login__form__error-container">
            <p v-if="!emailValido" class="v-login__form__error">
              Formato no valido
            </p>
          </div>
          <input
            type="password"
            v-model="password"
            class="v-login__form__input"
            placeholder="Contraseña"
          />
          <input
            type="submit"
            class="v-login__form__button"
            value="Iniciar sesión"
          />
        </form>
        <p class="v-login__form__text">
          Si no tienes una cuenta puedes
          <NuxtLink to="/registro" class="v-login__form__link"
            >Regístrarte</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NuxtLink } from "#components";
import { ref, computed } from "vue";

//declaramos las variables para los inputs
const email = ref("");
const password = ref("");

//Definimos un validador para el email con expresiones regulares
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Creamos una funcion computada para validar el email usando el validador que definimos anteriormente
const emailValido = computed(() => emailRegex.test(email.value));
</script>

<style lang="scss" scoped>
.v-login {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-login__form-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-login__form-card {
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
}
.v-login__form__img-container {
  width: 150px;
  height: 150px;
}
.v-login__form__logo {
  width: 100%;
  height: 100%;
}
.v-login__form__title {
  color: var(--secondary-color);
  font-family: "ItcDemi";
  font-size: 1.7rem;
  font-weight: 800;
  text-align: center;
}
.v-login__form {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.v-login__form__input {
  width: 90%;
  height: 30px;
  border: solid 1px var(--secondary-color);
  border-radius: 18px;
  padding: 10px;
}
.v-login__form__error-container {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
}
.v-login__form__error {
  color: var(--text-error);
}
.v-login__form__button {
  width: 90%;
  height: 35px;
  border-radius: 18px;
  background-color: var(--secondary-color);
  color: var(--vt-c-white);
}
.v-login__form__link {
  color: var(--secondary-color);
  font-weight: bold;
}
</style>
