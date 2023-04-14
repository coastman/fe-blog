// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  css: [
    '@/assets/styles/app.less'
  ],

  modules: ['nuxt-swiper'],

  swiper: {
    // Swiper options
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['navigation', 'pagination', 'autoplay', 'effect-creative'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: ['@import "@/assets/styles/variables.less";', '@import "@/assets/styles/mixins.less";'].join('')
        }
      }
    }
  },

  nitro: {
    devProxy: {
      '/api/**': {
        target: 'http://localhost:3008/api/**',
        changeOrigin: true,
        prependPath: true,
      }
    },
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:3008/api/**'
      }
    }
  }
})
