import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vuetify } from './common.js'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import {
  Chart,
  PieController,
  ArcElement,
  BarElement,
  TimeScale,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  Colors
} from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.register(
  PieController,
  ArcElement,
  BarElement,
  TimeScale,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  Colors
)
const app = createApp(App)
const pinia = createPinia()

const toastOptions = {
  // You can set your default options here
}
app.use(router).use(pinia).use(vuetify).use(VueApexCharts).use(Toast, toastOptions).mount('#app')
