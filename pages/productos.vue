<template>
  <div class="v-products">
    <!-- <h1 class="v-products__title">PRODUCTOS</h1> -->
    <div class="v-products__container">
      <div class="v-products__filters">
        <h2 class="v-products__filters__title">FILTROS</h2>
        <h3 class="v-products__filters__subtitles">Categorías</h3>
        <fwb-select
          v-model="selectedCategory"
          :options="categories"
          placeholder="Selecciona una"
        />
        <h3 class="v-products__filters__subtitles">Marcas</h3>
        <fwb-select
          v-model="selectedBrand"
          :options="brands"
          placeholder="Selecciona"
        />
        <h3 class="v-products__filters__subtitles">Ordenar</h3>
        <fwb-select
          v-model="sortOrder"
          :options="sortOptions"
          placeholder="Selecciona una"
        ></fwb-select>
      </div>
      <div>
        <div></div>
        <div class="v-products__list">
          <CProductList
            :search="filterSearch"
            :category="selectedCategory"
            :brand="selectedBrand"
            :sort="sortOrder"
            :size="20"
            :onPage="currentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import CProductCard from "../components/c-product-card.vue";
import { ref, onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FwbSelect } from "flowbite-vue";
import CProductList from "~/components/c-product-list.vue";
import productsService from "~/api/services/productsService";

const router = useRouter();
const route = useRoute();

const categories = ref([]);
const allBrands = ref([]); // Lista original de marcas (sin filtrar)
const brands = ref([]); // Lista filtrada según la categoría
const filterSearch = ref("");
const selectedCategory = ref("");
const selectedBrand = ref("");
const sortOrder = ref("nombre:asc");

const currentPage = computed(() => {
  return Number(route.query.page) || 1;
});

const sortOptions = [
  { value: "nombre:asc", name: "A-Z" },
  { value: "nombre:desc", name: "Z-A" },
];

const formatLabel = (str) => {
  if (!str) return "";
  return str
    .split("-")
    .map((part) => part.toUpperCase())
    .join(" ");
};

/// Cargar categorías y marcas
onMounted(async () => {
  // Obtener categorías
  const catData = await productsService.getCategories();
  categories.value = [
    { value: "", name: "TODAS" },
    ...catData.map((c) => ({
      value: c.documentId,
      name: formatLabel(c.nombre),
    })),
  ];

  // Obtener marcas con sus productos y categorías
  const brandData = await productsService.getBrandsWithProductsAndCategories();

  // Guardar lista original
  allBrands.value = brandData;

  // Guarda temporalmente query params
  const initialCategory = route.query.category || "";
  const initialBrand = route.query.brand || "";
  const initialSort = route.query.sort || "nombre:asc";
  const initialSearch = route.query.search || "";

  selectedCategory.value = initialCategory;

  updateFilteredBrands();

  selectedBrand.value = initialBrand;
  sortOrder.value = initialSort;
  filterSearch.value = initialSearch;
});

// Actualizar marcas filtradas cuando cambia selectedCategory
watch(selectedCategory, () => {
  updateFilteredBrands();
  // Resetear la marca seleccionada si cambia la categoría
  selectedBrand.value = "";
});

// Actualizar URL cada vez que cambian filtros
watch([selectedCategory, selectedBrand, sortOrder], () => {
  router.replace({
    query: {
      category: selectedCategory.value || undefined,
      brand: selectedBrand.value || undefined,
      sort: sortOrder.value || undefined,
      search: filterSearch.value || undefined,
    },
  });
});
watch(filterSearch, () => {
  selectedCategory.value = "";
  selectedBrand.value = "";
  router.replace({
    query: {
      search: filterSearch.value || undefined,
    },
  });
});

watch(
  () => route.query.search,
  (newSearch) => {
    filterSearch.value = newSearch || "";
  },
);

// Función que recalcula las marcas filtradas
function updateFilteredBrands() {
  if (!selectedCategory.value) {
    // Si no hay categoría, mostrar todas
    brands.value = [
      { value: "", name: "TODAS" },
      ...allBrands.value.map((b) => ({
        value: b.documentId,
        name: formatLabel(b.nombre),
      })),
    ];
  } else {
    // Filtrar marcas que tengan productos en la categoría seleccionada
    const filtered = allBrands.value.filter((brand) => {
      return brand.productos.some((product) =>
        product.categorias.some(
          (cat) => cat.documentId === selectedCategory.value,
        ),
      );
    });

    brands.value = [
      { value: "", name: "TODAS" },
      ...filtered.map((b) => ({
        value: b.documentId,
        name: formatLabel(b.nombre),
      })),
    ];
  }
}
</script>

<style lang="scss" scoped>
.v-products {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.v-products__container {
  width: 100%;
  display: flex;
  flex-direction: column; /* mobile-first */
  align-items: center;
  gap: 20px;
}

/* Filtros */
.v-products__filters {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.v-products__filters__title {
  font-family: var(--secondary-font);
  font-size: 1.2em;
  border-bottom: solid 2px var(--secondary-color);
  margin-bottom: 10px;
}

.v-products__filters__subtitles {
  font-family: var(--secondary-font);
  font-size: 1em;
}

/* Lista de productos */
.v-products__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .v-products__container {
    flex-direction: row;
    align-items: flex-start;
  }

  .v-products__filters {
    width: 220px;
    height: auto;
    flex-shrink: 0;
    border: none;
    border-right: 1px solid #ddd;
  }

  .v-products__list {
    flex: 1;
    justify-content: flex-start;
  }
}

/* Desktop grande */
@media (min-width: 1200px) {
  .v-products__list {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
