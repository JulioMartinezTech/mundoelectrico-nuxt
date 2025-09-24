<template>
  <NuxtLink class="c-product-card" :to="`/producto/${data.documentId}`">
    <div class="c-product-card__inner">
      <div class="c-product-card__front">
        <div class="c-product-card__frame">
          <!-- <div class="c-product-card__frame__icons"></div> -->
        </div>

        <div class="c-product-card__image-wrapper">
          <img
            v-if="data.gallery"
            :src="`${apiBase}${data.gallery[0].url}`"
            :alt="data.product_name"
            class="c-product-card__image"
            @load="handleImageLoaded"
            @error="handleImageLoaded"
            :style="{ display: isImageLoading ? 'none' : 'block' }"
            width="175"
            height="150"
          />
          <img
            v-else-if="!data.gallery"
            src="../assets/img/Mundo-electrico-default.svg"
            :alt="data.product_name"
            class="c-product-card__image"
            @load="handleImageLoaded"
            @error="handleImageLoaded"
            width="175"
            height="150"
          />

          <!-- Spinner mientras carga -->
          <div v-if="isImageLoading" class="c-product-card__spinner"></div>
        </div>
      </div>
      <div class="c-product-card__back">
        <div class="c-product-card__back__code">
          {{ props.data.product_code }}
        </div>
        <div class="c-product-card__back__name">
          {{ capitalizeFirstLetter(data.product_name) }}
        </div>
        <div class="c-product-card__back__button">
          <CButton text="Info" @actionButton="handleButtonClick" />
        </div>
        <!-- <div class="c-product-card__text-container">
          <p class="c-product-card__text-container__text">
            {{ capitalizeFirstLetter(data.product_name) }}
          </p>
        </div> -->
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { ref } from "vue";
import CButton from "./c-button.vue";

const props = defineProps({
  data: Object,
});

const isImageLoading = ref(true);

const handleImageLoaded = () => {
  isImageLoading.value = false;
};

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleButtonClick = () => {
  alert("click");
};

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
</script>

<style lang="scss" scoped>
.c-product-card {
  width: 250px;
  height: 300px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
  perspective: 1000px;
}

.c-product-card:hover .c-product-card__inner {
  transform: rotateY(180deg);
}

.c-product-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.c-product-card__front,
.c-product-card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: -4px 4px 19px 2px rgba(138, 138, 138, 1);
}

.c-product-card__front {
  background-color: var(--vt-c-white);
}
.c-product-card__back {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: var(--vt-c-white);
  transform: rotateY(180deg);
}
.c-product-card__back__name {
  text-align: center;
}
.c-product-card__back__button {
  width: 100%;
}
.c-product-card__frame {
  width: 95%;
  height: 95%;
  position: absolute;
  border: solid 2px var(--gray);
  border-radius: 15px;
  display: flex;
  justify-content: flex-end;
  z-index: 9;
}
.c-product-card__frame__icons {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
}
.c-product-card__frame__icon {
  cursor: pointer;
}
.c-product-card__image-wrapper {
  position: relative;
  width: 70%;
  height: 200px; /* fija la altura para evitar saltos */
}

.c-product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 4px;
}

/* Spinner centrado dentro del wrapper */
.c-product-card__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border: 4px solid #ccc;
  border-top-color: var(--secondary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Animación de giro */
@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.c-product-card__text-container {
  width: 100%; /* ancho fijo igual al max-width del texto */
  display: block; /* para que el contenido limite el ancho */
  border-radius: 8px 0 0 8px;
  background-color: var(--secondary-color);
  z-index: 7;
  overflow: hidden; /* necesario para ellipsis */
  padding: 0 10px;
  /* elimina margin-right negativo */
  margin-right: -20px;
}
.c-product-card__text-container__text {
  max-width: 100%; /* que ocupe todo el ancho del contenedor padre */
  height: 40px;
  font-size: 0.9rem;
  color: var(--vt-c-white);
  display: block; /* no uses flex aquí para que ellipsis funcione */
  line-height: 40px; /* para centrar vertical */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
