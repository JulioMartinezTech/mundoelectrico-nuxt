const apiBaseUrl =
  import.meta.env.NUXT_PUBLIC_API_URL || "http://localhost:1337";

// Función genérica para manejar errores
const handleApiError = (error) => {
  console.error("API Error:", error?.data?.message || error.message);
  throw error?.data || new Error("An error occurred");
};

// Función genérica para obtener productos con filtros
export const getProducts = async ({
  pageSize = 20,
  page = 1,
  categoryId = null,
  brandId = null,
  sort = "product_name:asc",
} = {}) => {
  try {
    const query = new URLSearchParams();

    query.append("pagination[pageSize]", pageSize);
    query.append("pagination[page]", page);

    if (categoryId) {
      query.append("filters[categories][documentId][$eq]", categoryId);
    }

    if (brandId) {
      query.append("filters[brand][documentId][$eq]", brandId);
    }

    if (sort) {
      query.append("sort", sort);
    }

    query.append("populate", "*");

    const data = await $fetch(
      `${apiBaseUrl}/api/products?${query.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data || null;
  } catch (error) {
    handleApiError(error);
  }
};

export const getProductsByName = async (name) => {
  if (!name || name.length < 3) return null;
  try {
    const data = await $fetch(
      `${apiBaseUrl}/api/products?filters[product_name][$containsi]=${encodeURIComponent(
        name
      )}`
    );
    return data.data || null;
  } catch (error) {
    console.error(error);
  }
};

// Traer un producto por ID
export const getProduct = async (id) => {
  try {
    const data = await $fetch(`${apiBaseUrl}/api/products/${id}?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data?.data || null;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCategories = async () => {
  try {
    const data = await $fetch(`${apiBaseUrl}/api/categorias?sort=nombre:asc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data?.data || [];
  } catch (error) {
    handleApiError(error);
  }
};

export const getBrands = async () => {
  try {
    const data = await $fetch(`${apiBaseUrl}/api/brands?sort=name:asc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data?.data || [];
  } catch (error) {
    handleApiError(error);
  }
};

export const getBrandsWithProductsAndCategories = async () => {
  try {
    const data = await $fetch(
      `${apiBaseUrl}/api/brands?populate[products][populate]=categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Transformar respuesta en un array más limpio
    return data?.data.map((brand) => ({
      documentId: brand.documentId,
      name: brand.name,
      products: brand.products.map((product) => ({
        id: product.documentId,
        categories: product.categories.map((category) => ({
          documentId: category.documentId, // O usa category.attributes.documentId si tienes uno
          name: category.name,
        })),
      })),
    }));
  } catch (error) {
    handleApiError(error);
  }
};

export default {
  getProducts,
  getProduct,
  getCategories,
  getBrands,
  getBrandsWithProductsAndCategories,
};
