// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "vercel", // <--- esto fuerza que Nuxt genere funciones serverless
  },
  devServer: {
    host: "0.0.0.0", // accesible desde LAN
    port: 3000,
  },
  app: {
    head: {
      title: "Mundo Eléctrico", // Título predeterminado
      meta: [
        {
          name: "descripción",
          content: "Sitio web oficial de Mundo Eléctrico",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    strapiApiToken: process.env.NUXT_STRAPI_TOKEN, // Private
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  build: {
    transpile: ["flowbite-vue"],
  },
});
