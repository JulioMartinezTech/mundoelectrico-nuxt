import {ref} from 'vue';
import {fetchPageContent} from '@/api/services/contentService';

export const usePageContent = (slug) => {
    const pageContent = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const loadPageContent = async () => {
        try {
            loading.value = true;
            pageContent.value = await fetchPageContent(slug);
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

// Ejecuta la carga de contenido automáticamente
  loadPageContent();

    return {
        pageContent,
        loading,
        error,
        loadPageContent,
    };
};

