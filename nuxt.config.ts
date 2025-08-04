// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Mundo Eléctrico", // Título predeterminado
      meta: [
        {
          name: "descripción",
          content: "Sitio web oficial de Mundo Eléctrico",
        },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    strapiApiToken: process.env.NUXT_STRAPI_TOKEN, // Private
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || "http://localhost:1337/api",
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  build: {
    transpile: ["flowbite-vue"],
  },
});
