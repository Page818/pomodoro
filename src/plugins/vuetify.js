/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'starryNight',
    themes: {
      starryNight: {
        dark: true,
        colors: {
          background: '#0b1d3a',
          surface: '#112a46',
          primary: '#f4c430',
          secondary: '#70a1d7',
          error: '#ff5c5c',
          info: '#86d3f4',
          success: '#2ed573',
          warning: '#ffa502',
        },
      },
    },
  },
})
