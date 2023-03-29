// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/styles/app.less'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: ['@import "@/assets/styles/variables.less";', '@import "@/assets/styles/mixins.less";'].join('')
        }
      }
    }
  }
})
