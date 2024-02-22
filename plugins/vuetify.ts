import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F8F0E5',
    primary: '#EADBC8',
    secondary: 'DAC0A3',
    accent: '#102C57',
    backred: '#D55454',
    clearyellow: '#E6AE45',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    clockin: '#4bb0db',
    clockout: '#ff8081',
  },
}

const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    primary: '#282828',
    secondary: '#3f3f3f',
    accent: '#f4988b',
    accentBlue: '#157FEF',
    backred: '#D55454',
    clearyellow: '#E6AE45',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    clockin: '#4bb0db',
    clockout: '#ff8081',
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
        myCustomDarkTheme
      },
    },
  })
  app.vueApp.use(vuetify)
})