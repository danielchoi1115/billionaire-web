import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vuetify } from './common.js'

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
  LinearScale
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
  LinearScale
)
const app = createApp(App)

app.use(router)

app.use(vuetify)
app.mount('#app')
