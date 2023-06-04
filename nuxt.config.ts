// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "nuxt-quasar-ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  quasar: {
    plugins: ["Notify"],
    extras: {
      fontIcons: ["material-icons"],
    },
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  ssr: false,
})
