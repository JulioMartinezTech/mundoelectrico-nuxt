<template>
  <main class="v-contact-us">
    <section class="v-contact-us__form-section">
      <h1 class="v-contact-us__form-section__title">CONTÁCTANOS</h1>
      <p class="v-contact-us__form-section__paragraph">
        Envíanos un mensaje y uno de nuestro agentes se pondra en contacto lo
        más pronto posible.
      </p>
      <form @submit.prevent="sendForm" class="v-contact-us__form">
        <input
          type="text"
          v-model="name"
          class="v-contact-us__form__input"
          placeholder="Nombre"
        />
        <input
          type="tel"
          v-model="phone"
          class="v-contact-us__form__input"
          placeholder="Teléfono"
        />
        <input
          type="email"
          v-model="email"
          class="v-contact-us__form__input"
          placeholder="Correo"
        />
        <div class="v-contact-us__form__error-container">
          <p v-if="!emailValido && email" class="v-contact-us__form__error">
            Formato no válido
          </p>
        </div>
        <textarea class="v-contact-us__form__text-area" placeholder="Mensáje" />
        <input
          type="submit"
          class="v-contact-us__form__button"
          value="Enviar"
        />
      </form>
    </section>
    <section></section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const phone = ref("");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValido = computed(() => emailRegex.test(email.value));

const sendForm = () => {};
</script>

<style scoped>
.v-contact-us {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
}
.v-contact-us__form-section {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.v-contact-us__form-section__title {
  width: 80%;
  text-align: center;
  font-family: "ItcDemi";
  font-size: 1.6rem;
  color: var(--secondary-color);
}
.v-contact-us__form-section__paragraph {
  width: 80%;
  font-family: "ItcDemi";
  text-align: center;

  margin: 20px 0;
}
.v-contact-us__form {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.v-contact-us__form__input {
  width: 90%;
  height: 40px;
  border: solid 1px var(--third-color);
  border-radius: 18px;
  padding: 10px;
}
.v-contact-us__form__text-area {
  width: 90%;
  height: 200px;
  border: solid 1px var(--third-color);
  border-radius: 18px 18px 0 18px;
  padding: 10px;
}
.v-contact-us__form__error-container {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
}
.v-contact-us__form__error {
  color: var(--text-error);
}
.v-contact-us__form__button {
  width: 90%;
  height: 40px;
  border-radius: 18px;
  background-color: var(--secondary-color);
  font-family: "ItcDemi";
  color: var(--vt-c-white);
}
</style>
