import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

const Colors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  primary: '#89043b',
  'primary-darken-1': '#3700B3',
  secondary: '#03DAC6',
  'secondary-darken-1': '#018786',
  error: '#B00020',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
  'grey-0': '#f8f9fa',
  'grey-1': '#f1f3f5',
  'grey-2': '#e9ecef',
  'grey-3': '#dee2e6',
  'grey-4': '#ced4da',
  'grey-5': '#adb5bd',
  'grey-6': '#868e96',
  'grey-7': '#495057',
  'grey-8': '#343a40',
  'grey-9': '#212529'
}

const myCustomLightTheme = {
  dark: false,
  colors: Colors
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme
    }
  },
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  }
})

export { vuetify }
