<template>
  <div class="c-product-list">
    <div v-if="loading" class="c-product-list__grid">
      <CProductCardSkeleton
        v-for="n in 8"
        :key="n"
        class="c-product-list__item"
      />
    </div>

    <div v-else-if="products.length" class="c-product-list__grid">
      <CProductCard
        v-for="product in products"
        :key="product.id"
        :data="product"
        class="c-product-list__item"
      />
    </div>

    <p v-else class="c-product-list__empty">
      No hay productos que coincidan con los filtros seleccionados.
    </p>
    <div
      v-if="pagination.total > pagination.pageSize && hidePagination === false"
      class="c-product-list__pagination"
    >
      <button
        @click="goToPage(pagination.page - 1)"
        :disabled="pagination.page === 1"
        class="c-product-list__pagination-button"
      >
        Anterior
      </button>

      <span class="c-product-list__pagination-info">
        Página {{ pagination.page }} de {{ pagination.pageCount }}
      </span>

      <button
        @click="goToPage(pagination.page + 1)"
        :disabled="pagination.page === pagination.pageCount"
        class="c-product-list__pagination-button"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import CProductCard from "./c-product-card.vue";
import CProductCardSkeleton from "./c-product-card-skeleton.vue";
import productsService from "~/api/services/productsService";

const props = defineProps({
  search: String,
  brand: String,
  category: String,
  sort: {
    type: String,
    default: "nombre:asc", // orden alfabético ascendente por defecto
  },
  size: Number,
  onPage: Number,
  hidePagination: { type: Boolean, default: false },
  excludeProduct: String, //esto es por si muestro una lista de productos relacionados pero si el producto seleccionado
});

// Estados
const products = ref([]);
const loading = ref(false);
const pagination = ref({
  page: props.onPage || 1,
  pageSize: props.size || 20,
  pageCount: 1,
  total: 0,
});

const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await productsService.getProducts({
      pageSize: pagination.value.pageSize,
      page: pagination.value.page,
      categoryId: props.category,
      brandId: props.brand,
      sort: props.sort,
      search: props.search,
    });

    let data = response?.data || [];

    if (props.excludeProduct) {
      data = data.filter((p) => p.documentId != props.excludeProduct);
    }

    products.value = data;

    pagination.value = response?.meta?.pagination || pagination.value;
  } catch (error) {
    console.error("Error al cargar productos:", error);
    products.value = [];
  }
  loading.value = false;
};

onMounted(fetchProducts);

watch(
  () => [props.search, props.brand, props.category, props.sort],
  () => {
    pagination.value.page = 1; // Resetear a la primera página
    fetchProducts();
  }
);

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.pageCount) {
    pagination.value.page = page;
    fetchProducts();
  }
};
</script>

<style scoped>
.c-product-list {
  width: 100%;
}
.c-product-list__grid {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.c-product-list__empty {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-product-list__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.c-product-list__pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vt-c-white);
  background: var(--secondary-color);
  color: var(--vt-c-white);
  cursor: pointer;
}

.c-product-list__pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
