// Función genérica para manejar errores
const handleApiError = (error) => {
  console.error("API Error:", error?.data?.message || error.message);
  throw error?.data || new Error("An error occurred");
};

// Función para traer contenido de una página específica
export const fetchPageContent = async () => {
  try {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBase;
    
    const data = await $fetch(`${apiBaseUrl}/api/about-page`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data?.data || null; // Devuelve el contenido de la página
  } catch (error) {
    handleApiError(error);
  }
};

export default {
  fetchPageContent,
};
