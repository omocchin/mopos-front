// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
  ],
  css: [
    '~/assets/css/common.scss'
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL
    }
  },
  googleFonts: {
    families: {
      'Roboto': true,
      'Noto+Sans': true
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
    devProxy: {
      '/proxy/example': {
        target: '0.0.0.0:3001/api/',
        prependPath: true,
        changeOrigin: true,
      },
    }
  },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
})
