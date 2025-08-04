<template>
  <div class="v-register">
    <div class="v-register__form-container">
      <div class="v-register__form-card">
        <div class="v-register__form__img-container">
          <img
            src="../assets/img/logo-isotipo.png"
            alt="Logo"
            class="v-register__form__logo"
          />
        </div>
        <h1 class="v-register__form__title">CREAR CUENTA</h1>
        <form action="" class="v-register__form">
          <input
            type="text"
            class="v-register__form__input"
            placeholder="Nombre"
          />
          <input
            type="email"
            class="v-register__form__input"
            placeholder="Correo"
          />
          <input
            type="password"
            class="v-register__form__input"
            placeholder="Contraseña"
          />
          <input
            type="password"
            class="v-register__form__input"
            placeholder="Confirmar contraseña"
          />
          <input
            type="submit"
            class="v-register__form__button"
            value="Registrar"
          />
        </form>
        <p class="v-register__form__text">
          Si ya tienes una cuenta puedes
          <NuxtLink to="/login" class="v-register__form__link"
            >Iniciar sesión</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.v-register {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-register__form-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-register__form-card {
  width: 450px;
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
}
.v-register__form__img-container {
  width: 150px;
  height: 150px;
}
.v-register__form__logo {
  width: 100%;
  height: 100%;
}
.v-register__form__title {
  color: var(--secondary-color);
  font-family: "ItcDemi";
  font-size: 1.7rem;
  font-weight: 800;
  text-align: center;
}
.v-register__form {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.v-register__form__input {
  width: 90%;
  height: 30px;
  border: solid 1px var(--secondary-color);
  border-radius: 18px;
  padding: 10px;
}
.v-register__form__button {
  width: 90%;
  height: 35px;
  border-radius: 18px;
  background-color: var(--secondary-color);
  color: var(--vt-c-white);
}
.v-register__form__link {
  color: var(--secondary-color);
  font-weight: bold;
}
</style>
