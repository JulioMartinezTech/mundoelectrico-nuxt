<template>
  <div class="v-home">
    <section class="v-home__hero">
      <Splide :options="{ perPage: 1, type: 'loop' }">
        <SplideSlide v-for="image in heroImages" :key="image.documentId">
          <div class="slide-content">
            <img
              :src="image.url"
              :alt="image.alternativeText || 'Hero image'"
            />
          </div>
        </SplideSlide>
      </Splide>
    </section>
    <section class="v-home__slider-container">
      <CSlider3d :images="carrucelImages" />
    </section>
    <!-- <div class="v-home__categories">
      <div class="v-home__categories__group">
        <div class="v-home__categories__group__item">
          <div class="v-home__categories__group__item-inner">
            <div class="v-home__categories__group__item-front"></div>
            <div class="v-home__categories__group__item-back">
              <p class="v-home__categories__group__item__text">
                DISPOSITIVOS ELÉCTRONICOS
              </p>
            </div>
          </div>
        </div>
        <div class="v-home__categories__group__item">
          <div class="v-home__categories__group__item-inner">
            <div class="v-home__categories__group__item-front"></div>
            <div class="v-home__categories__group__item-back">
              <p class="v-home__categories__group__item__text">HERRAMIENTAS</p>
            </div>
          </div>
        </div>
        <div class="v-home__categories__group__item">
          <div class="v-home__categories__group__item-inner">
            <div class="v-home__categories__group__item-front"></div>
            <div class="v-home__categories__group__item-back">
              <p class="v-home__categories__group__item__text">ILUMINACIÓN</p>
            </div>
          </div>
        </div>
        <div class="v-home__categories__group__item">
          <div class="v-home__categories__group__item-inner">
            <div class="v-home__categories__group__item-front"></div>
            <div class="v-home__categories__group__item-back">
              <p class="v-home__categories__group__item__text">ALTA TENSIÓN</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="v-home__action">
      <img :src="adsImage.url" alt="Publicidad" class="v-home__action-image" />
    </div>
    <div class="v-home__product-featurerd">
      <h2 class="v-home__product-featurerd__title">PRODUCTOS DESTACADOS</h2>
      <div class="v-home__product-featured__list">
        <CProductCard
          v-for="product in products"
          :key="product.id"
          :data="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import homeService from "~/api/services/homeService";
import { getFeaturedProducts } from "@/api/services/productsService";

const homeData = await homeService.fetchHomeContent();
const heroImages = homeData.data.heroe || [];
const carrucelImages = homeData.data.carrucel3D || [];
const adsImage = homeData.data.publicidad || [];

import { ref, onMounted } from "vue";

//import components
import CProductCard from "../components/c-product-card.vue";
import CSlider3d from "~/components/c-slider-3d.vue";

//import services

const products = ref([]);
// const errorMessage = ref("");

onMounted(async () => {
  try {
    const response = await getFeaturedProducts();
    products.value = response; // Strapi devuelve los datos dentro de `data`
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
// productsService.getProducts().then(console.log).catch(console.error);
</script>

<style lang="scss" scoped>
.v-home {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
}
.v-home__hero {
  width: 100%;
  background-color: var(--secondary-color);
}
//start splide styles
.splide {
  width: 100% !important;
  height: 700px !important;
}

.splide__slide {
  height: 700px !important;
}
.slide-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #ddd;
}
// end splide styles
.v-home__slider-container {
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-home__categories {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
}
.v-home__categories__title {
  font-family: var(--secondary-font);
  font-size: 2em;
  border-bottom: solid 2px var(--secondary-color);
}
.v-home__categories__group {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  margin-top: 40px;
}
.v-home__categories__group__item {
  width: 250px;
  height: 350px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  perspective: 1000px;
}
.v-home__categories__group__item:hover .v-home__categories__group__item-inner {
  transform: rotateY(180deg);
}

.v-home__categories__group__item-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.v-home__categories__group__item-front,
.v-home__categories__group__item-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.v-home__categories__group__item-front {
  background-color: var(--vt-c-indigo);
}
.v-home__categories__group__item-back {
  background-color: var(--vt-c-white);
  color: var(--secondary-color);
  transform: rotateY(180deg);
}
.v-home__categories__group__item__text {
  width: 70%;
  font-family: var(--secondary-font);
  color: var(--secondary-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.v-home__action {
  width: calc(90%);
  height: 300px;
  overflow: hidden;
  border-radius: 15px 15px 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.v-home__action-image {
  width: 100%;
  height: 100%;
}
.v-home__product-featurerd {
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--vt-c-indigo);
  padding: 40px 0;
  margin-top: 80px;
}
.v-home__product-featurerd__title {
  height: 60px;
  color: var(--vt-c-white);
  font-family: var(--secondary-font);
  font-size: 1.5rem;
  text-align: center;
  padding: 10px 20px;
}
.v-home__product-featured__list {
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 60px;
}
</style>
