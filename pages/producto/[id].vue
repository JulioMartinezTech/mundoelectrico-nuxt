<template>
  <div class="v-product-details">
    <h1 class="v-product-details__title">DETALLE DEL PRODUCTO</h1>
    <div class="v-product-details__container">
      <div class="v-product-details__container__image-container">
        <div class="v-product-details__container__image-container__card">
          <div
            class="v-product-details__container__image-container__card__frame"
          >
            <div
              class="v-product-details__container__image-container__card__frame__icons"
            ></div>
            <img
              v-if="mainImageUrl"
              :src="mainImageUrl"
              alt="Imagen del producto"
              class="v-product-details__card__image v-product-details__card__image--zoomable"
              @click="openZoom(mainImageUrl)"
            />
            <img
              v-else-if="!mainImageUrl"
              src="../../assets/img/Mundo-electrico-default.svg"
              alt="Imagen del producto"
              class="v-product-details__card__image"
            />
          </div>
        </div>
        <div class="v-product-detail__galeria-container">
          <div
            v-for="(url, index) in galeriaUrls"
            :key="index"
            class="v-product-detail__image-frame"
          >
            <img
              :src="url"
              alt="Imagen de producto"
              :class="
                mainImageUrl === url
                  ? 'v-product-details__galeria-image__selected'
                  : 'v-product-details__galeria-image'
              "
              @click="handleMainImageUrl(url)"
            />
          </div>
        </div>
      </div>
      <div class="v-product-details__container__description-container">
        <p
          class="v-product-details__container__description-container__product-name"
        >
          {{ productName }}
        </p>
        <div class="v-product-details__container__description-container__card">
          <p
            class="v-product-details__container__description-container__card__text"
          >
            {{ productDescription }}
          </p>
        </div>
        <div
          class="v-product-details__container__description-container__button-container"
        >
          <CButton
            text="Agregar a la lista"
            @actionButton="
              () =>
                cart.addProduct({
                  id: product.codigo_producto,
                  name: productName,
                  imgUrl: mainImageUrl,
                })
            "
          />
        </div>
      </div>
    </div>
    <div
      class="v-product-details__technicals-detail-container"
      v-if="showTechnicalValues"
    >
      <h2 class="v-product-details__title">INFORMACIÓN TÉCNICA</h2>
      <div class="v-product-details__technicals-detail">
        <CTechnicalDetails :items="technicalValues" />
      </div>
    </div>
    <div class="v-product-details__products-list-container">
      <h2 class="v-product-details__title">PRODUCTOS RELACIONADOS</h2>
      <div class="v-product-details__product-list">
        <CProductList
          :size="5"
          :category="category"
          :excludeProduct="productId"
          hidePagination
        />
      </div>
    </div>
    <MImageModal
      :show="isZoomOpen"
      :imageUrl="zoomedImageUrl"
      :altText="productName"
      @close="closeZoom"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
//import store
import { useCartStore } from "~/stores/useCartStore";
//import components
import CProductList from "~/components/c-product-list.vue";
import CButton from "~/components/c-button.vue";
import CTechnicalDetails from "~/components/c-technical-details.vue";
//import services
import productsService from "@/api/services/productsService";
//import modals
import MImageModal from "~/components/modal/m-image-modal.vue";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

//import store
const cart = useCartStore();

const route = useRoute();
const productId = route.params.id;
const product = ref(null);
const galeriaUrls = ref([]);
const mainImageUrl = ref("");
//estoy guardando todas las categorias asociadas a este producto por si luego hago una query para traerme diferentes listas de productos y juntarlas
const categories = ref([]);
const category = ref("");
const productName = ref("");
const technicalValues = ref([]);
const showTechnicalValues = computed(() => technicalValues.value.length > 0);
const productDescription = ref("");
const isZoomOpen = ref(false);
const zoomedImageUrl = ref("");

const openZoom = (url) => {
  if (url) {
    zoomedImageUrl.value = url;
    isZoomOpen.value = true;
  }
};

const closeZoom = () => {
  isZoomOpen.value = false;
  // Pequeño retraso para que termine la animación de cierre antes de limpiar la URL
  setTimeout(() => {
    zoomedImageUrl.value = "";
  }, 300);
};

const handleMainImageUrl = (url) => {
  mainImageUrl.value = url;
};

onMounted(async () => {
  const response = await productsService.getProduct(productId);

  if (response) {
    product.value = response;

    response.categorias.map((c) => {
      categories.value.push(c.documentId);
    });

    category.value = categories.value[0];
    productName.value = response.nombre.toUpperCase();
    productDescription.value =
      response.descripcion || "No hay descripción actualmente";
    technicalValues.value = [
      { name: "Calibre", value: response.calibre },
      { name: "Voltaje", value: response.voltaje },
      { name: "Dimensiones", value: response.dimensiones },
      { name: "Color", value: response.color },
      { name: "Certificaciones", value: response.certificacion },
      { name: "Capacidad", value: response.capacidad },
      { name: "Temperatura", value: response.temperatura },
      { name: "Amperaje", value: response.amperaje },
      { name: "Zócalo", value: response.zocalo },
      { name: "Potencia", value: response.potencia },
      { name: "Luminosidad", value: response.luminocidad },
      { name: "Medidas", value: response.medidas },
    ].filter((item) => item.value);

    if (response.galeria && response.galeria.length > 0) {
      galeriaUrls.value = response.galeria.map((img) => img.url);
      mainImageUrl.value = galeriaUrls.value[0];
    } else {
      galeriaUrls.value = [];
    }
  } else {
    console.error("Producto no encontrado");
  }
});
</script>

<style lang="scss" scoped>
//Mobile first
.v-product-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
}
.v-product-details__title {
  font-family: var(--secondary-font);
  font-size: 1.2rem;
  border-bottom: solid 2px var(--secondary-color);
}
.v-product-details__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  gap: 20px;
}
.v-product-details__container__image-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.v-product-details__container__image-container__card {
  width: 300px;
  height: 400px;
  position: relative;
  background-color: var(--vt-c-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.v-product-details__container__image-container__card__frame {
  width: 90%;
  height: 95%;
  position: absolute;
  border: solid 1px var(--gray);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.v-product-details__container__image-container__card__frame__icons {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 5px;
}
.v-product-details__card__image {
  width: 90%;
  margin-top: 15px;
}
.v-product-details__card__image--zoomable {
  cursor: zoom-in;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }
}
.v-product-detail__galeria-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.v-product-details__galeria-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px;
}
.v-product-details__galeria-image__selected {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: solid 2px var(--secondary-color);
  cursor: pointer;
  padding: 4px;
}
.v-product-details__container__description-container {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.v-product-details__container__description-container__title {
  width: 75%;
  font-family: var(--secondary-font);
  font-size: 1.8em;
  border-bottom: solid 2px var(--secondary-color);
}
.v-product-details__container__description-container__product-name {
  width: 60%;
  font-family: var(--secondary-font);
  font-size: 1.2em;
  text-align: center;
}
.v-product-details__container__description-container__card {
  width: calc(70%);
  min-height: 250px;
  background-color: var(--vt-c-white);
  border-radius: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  -webkit-box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
  -moz-box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
  box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
  padding: 15px;
}
.v-product-details__container__description-container__card__text {
  text-align: center;
}
.v-product-details__container__description-container__button-container {
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-product-details__technicals-detail-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.v-product-details__technicals-detail {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 80px;
}
.v-product-details__products-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 90px 0;
}
.v-product-details__product-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 80px;
}

// media queries Desktop
@media (min-width: 900px) {
  .v-product-details__title {
    font-size: 1.9rem;
  }
  .v-product-details__container {
    width: 70%;
    flex-direction: row;
    justify-content: center;
  }
  .v-product-details__container__image-container {
    width: 50%;
  }
  .v-product-details__container__image-container__card {
    width: 300px;
    height: 400px;
  }
  .v-product-details__container__image-container__card__frame {
    width: 95%;
    height: 95%;
    position: absolute;
    border: solid 1px var(--gray);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .v-product-details__container__image-container__card__frame__icons {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 5px;
  }
  .v-product-details__card__image {
    width: 90%;
    margin-top: 15px;
  }
  .v-product-detail__galeria-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .v-product-details__galeria-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px;
  }
  .v-product-details__galeria-image__selected {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    border: solid 2px var(--secondary-color);
    cursor: pointer;
    padding: 4px;
  }
  .v-product-details__container__description-container {
    width: 50%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }
  .v-product-details__container__description-container__title {
    width: 75%;
    font-family: var(--secondary-font);
    font-size: 1.8em;
    border-bottom: solid 2px var(--secondary-color);
  }
  .v-product-details__container__description-container__product-name {
    width: 60%;
    font-family: var(--secondary-font);
    font-size: 1.2em;
    text-align: center;
  }
  .v-product-details__container__description-container__card {
    width: calc(70%);
    min-height: 250px;
    background-color: var(--vt-c-white);
    border-radius: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    -webkit-box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
    -moz-box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
    box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
    padding: 15px;
  }
  .v-product-details__container__description-container__card__text {
    text-align: center;
  }
  .v-product-details__container__description-container__button-container {
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .v-product-details__technicals-detail-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }
  .v-product-details__technicals-detail {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 80px;
  }
  .v-product-details__products-list-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 90px 0;
  }
  .v-product-details__product-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 80px;
  }
}
</style>
