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
  },
  nitro: {
    devProxy: {
      '/api/**': {
        target: 'http://localhost:3008/api/**',
        changeOrigin: true,
        prependPath: true,
      },
    },
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:3008/api/**'
      }
    }
  }
})
