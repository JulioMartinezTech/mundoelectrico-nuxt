// Función genérica para manejar errores
const handleApiError = (error: any) => {
  console.error("API Error:", error?.data?.message || error.message);
  throw error?.data || new Error("An error occurred");
};

// Función para traer contenido de la página principal
export const fetchHomeContent = async () => {
  try {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;

    // Build the URL with proper query string encoding for Strapi
    // const populateQuery = {
    //   "populate[heroe][fields][0]": "url",
    //   "populate[heroe][fields][1]": "alternativeText",
    // };

    const data = await $fetch(`${apiBaseUrl}/api/pagina-principal?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Si necesitas autenticación:
        // Authorization: `Bearer ${config.public.apiToken}`,
      },
    });

    return data || null;
  } catch (error: any) {
    handleApiError(error);
  }
};

export default {
  fetchHomeContent,
};
