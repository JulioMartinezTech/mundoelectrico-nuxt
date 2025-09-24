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
  sort = "nombre:asc",
} = {}) => {
  try {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;
    
    const query = new URLSearchParams();

    query.append("pagination[pageSize]", pageSize);
    query.append("pagination[page]", page);

    if (categoryId) {
      query.append("filters[categorias][documentId][$eq]", categoryId);
    }

    if (brandId) {
      query.append("filters[marca][documentId][$eq]", brandId);
    }

    if (sort) {
      query.append("sort", sort);
    }

    query.append("populate", "*");

    const data = await $fetch(
      `${apiBaseUrl}/api/productos?${query.toString()}`,
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
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;
    
    const data = await $fetch(
      `${apiBaseUrl}/api/productos?filters[nombre][$containsi]=${encodeURIComponent(
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
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;
    
    const data = await $fetch(`${apiBaseUrl}/api/productos/${id}?populate=*`, {
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
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;
    
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
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;
    
    const data = await $fetch(`${apiBaseUrl}/api/marcas?sort=nombre:asc`, {
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
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;
    
    const data = await $fetch(
      `${apiBaseUrl}/api/marcas?populate[productos][populate]=categorias`,
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
      nombre: brand.nombre,
      productos: brand.productos.map((product) => ({
        id: product.documentId,
        categorias: product.categorias.map((category) => ({
          documentId: category.documentId, // O usa category.attributes.documentId si tienes uno
          nombre: category.nombre,
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
