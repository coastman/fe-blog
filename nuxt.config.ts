// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/styles/normalize.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: ['@import "@/styles/variables.less";', '@import "@/styles/mixins.less";'].join('')
        }
      }
    }
  }
})
