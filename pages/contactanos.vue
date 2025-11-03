<template>
  <main class="v-contact-us">
    <section class="v-contact-us__form-section">
      <h1 class="v-contact-us__form-section__title">CONTÁCTANOS</h1>
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
        <textarea
          v-model="message"
          class="v-contact-us__form__text-area"
          placeholder="Mensáje"
        />
        <input
          type="submit"
          class="v-contact-us__form__button"
          :disabled="isSending"
          :value="isSending ? 'Enviando...' : 'Enviar'"
        />
      </form>
    </section>
    <section class="v-contact-us__map-section">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8654207348122!2d-69.92322009002923!3d18.489754182525225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89b9ed4fc9e7%3A0x19e827ccd256d5dc!2sMundo%20El%C3%A9ctrico!5e0!3m2!1sen!2ses!4v1754495274300!5m2!1sen!2ses"
        style="border: 0"
        allowFullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="v-contact-us__map"
      ></iframe>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { sendContactEmail } from "~/api/services/emailService";

const name = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const message = ref<string>("");

const isSending = ref(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValido = computed(() => emailRegex.test(email.value));

const resetForm = () => {
  name.value = "";
  email.value = "";
  phone.value = "";
  message.value = "";
};

const sendForm = async () => {
  if (!emailValido.value) {
    alert("Correo no válido");
    return;
  }
  isSending.value = true;

  const response = await sendContactEmail({
    name: name.value,
    email: email.value,
    phone: phone.value,
    message: message.value,
  });

  isSending.value = false;

  if (response) {
    resetForm();
  }
};
</script>

<style scoped>
.v-contact-us {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px; /* espaciado en mobile */
  gap: 40px; /* separa form y mapa */
}

/* --- FORM --- */
.v-contact-us__form-section {
  width: 100%; /* mobile-first */
  max-width: 600px; /* no crecer más de 600px en desktop */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-contact-us__form-section__title {
  width: 100%;
  text-align: center;
  font-family: var(--secondary-font);
  font-size: 1.4rem;
  color: var(--secondary-color);
  margin-bottom: 40px;
}

.v-contact-us__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v-contact-us__form__input,
.v-contact-us__form__text-area,
.v-contact-us__form__button {
  width: 100%; /* en móvil ocupan todo el ancho */
  max-width: 500px; /* en desktop no más de 500px */
  margin: 0 auto;
}

.v-contact-us__form__text-area {
  height: 160px;
}

.v-contact-us__form__error-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  padding-left: 5px;
}

.v-contact-us__form__button {
  height: 40px;
  cursor: pointer;
  color: var(--vt-c-white);
  font-weight: bold;
  background-color: var(--secondary-color);
  border-radius: 15px;
}

.v-contact-us__form__error {
  color: var(--text-error);
  font-size: 0.9rem;
}

/* --- MAP --- */
.v-contact-us__map-section {
  width: 100%;
  height: 300px; /* más pequeño en móvil */
}

.v-contact-us__map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

/* --- Tablet/Desktop --- */
@media (min-width: 768px) {
  .v-contact-us {
    flex-direction: row; /* form a la izquierda, mapa a la derecha */
    align-items: flex-start;
  }

  .v-contact-us__form-section {
    flex: 1;
    max-width: 600px;
    padding-right: 20px;
  }

  .v-contact-us__map-section {
    flex: 1;
    height: 450px;
    margin-top: 0;
  }
}
</style>
