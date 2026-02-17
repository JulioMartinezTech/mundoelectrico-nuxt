<template>
  <div class="c-search-bar">
    <input
      type="text"
      class="c-search-bar__input"
      v-model="searchText"
      aria-controls="search-results"
      :aria-expanded="products.length > 0"
      role="combobox"
      aria-autocomplete="list"
      aria-haspopup="listbox"
      @keydown.down.prevent="moveDown"
      @keydown.up.prevent="moveUp"
      @keydown.enter.prevent="goToSearchResults"
      @keydown.esc="closeList"
    />
    <button class="c-search-bar__icon-container" @click="goToSearchResults">
      <img
        src="../assets/img/search-icon.svg"
        alt="icono de busqueda"
        class="c-search-bar__icon"
        :class="{ 'c-search-bar__icon--animate': isAnimating }"
        @animationend="isAnimating = false"
      />
    </button>
  </div>
  <div
    id="search-results"
    class="c-search-bar__autocomplete-box"
    v-if="products.length > 0 && !productSelected"
    role="listbox"
  >
    <div class="c-search-bar__item-container">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="c-search-bar__item"
        role="option"
        :aria-selected="index === activeIndex"
        :class="{ 'is-active': index === activeIndex }"
        @click="goToProductDetail(product.documentId)"
      >
        <p>{{ product.nombre }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { getProductsByName } from "~/api/services/productsService";

import type { StrapiProduct } from "~/types/product";

const router = useRouter();
const searchText = ref(<string>"");
const inputText = ref(<string>""); //lo utilizo para poder comparar luego si el input solo cambio parcialmente y asi reactivar los resultados desplegables
const products = ref(<StrapiProduct[]>[]);
const productSelected = ref<string | null>(null); // aqui guardo el document_id del producto para luego pasarlo por parametro
const activeIndex = ref(<number>-1);
const isAnimating = ref(<boolean>false);
let debounceTimeout: ReturnType<typeof setTimeout>;

watch(searchText, (newValue) => {
  clearTimeout(debounceTimeout);

  // 👇 solo buscar si hay 3 o más caracteres
  if (newValue.length < 3) {
    products.value = [];
    productSelected.value = null;
    activeIndex.value = -1;
    return;
  }

  if (productSelected.value && newValue != inputText.value) {
    productSelected.value = null;
  }

  debounceTimeout = setTimeout(async () => {
    products.value = await getProductsByName(newValue);
    activeIndex.value = -1;
  }, 300);
});
// Navegación con teclado
function moveDown() {
  if (products.value.length === 0) return;
  activeIndex.value = (activeIndex.value + 1) % products.value.length;
}

function moveUp() {
  if (products.value.length === 0) return;
  activeIndex.value =
    (activeIndex.value - 1 + products.value.length) % products.value.length;
}

function selectActive() {
  if (activeIndex.value >= 0) {
    const product = products.value[activeIndex.value];
    selectProduct(product);
    goToProductDetail(product.documentId);
  }
}

function selectProduct(product: StrapiProduct) {
  searchText.value = product.nombre;
  inputText.value = product.nombre;
  products.value = [];
  productSelected.value = product.documentId;
  activeIndex.value = -1;
}

function closeList() {
  products.value = [];
  activeIndex.value = -1;
}

function goToProductDetail(id: string | null) {
  isAnimating.value = true;
  if (!id) return;
  router.push(`/producto/${id}`);
  searchText.value = "";
}

function goToSearchResults() {
  if (!searchText.value.trim()) return;
  router.push({ path: `/productos`, query: { search: searchText.value } });
  searchText.value = "";
}
</script>

<style lang="scss" scoped>
.c-search-bar {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 2px var(--secondary-color);
  border-radius: 50px;
  overflow: hidden;
  padding-left: 2px;
}
.c-search-bar__input {
  width: 80%;
  height: calc(90%);
  background-color: transparent;
  border: none;
}
.c-search-bar__input:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
.c-search-bar__icon-container {
  width: 10%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
}
.c-search-bar__icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}

.c-search-bar__icon--animate {
  animation: zoom 0.4s ease;
}
.c-search-bar__autocomplete-box {
  position: relative;
  width: 100%;
  height: auto;
}
.c-search-bar__item-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;
}
.c-search-bar__item {
  padding: 8px 12px;
  cursor: pointer;
}

.c-search-bar__item:hover {
  background-color: #f5f5f5;
}

/* ---------- Desktop ---------- */
</style>
