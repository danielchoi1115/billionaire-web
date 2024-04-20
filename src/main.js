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
  LinearScale,
  Colors
} from 'chart.js'

import { TreemapController, TreemapElement } from 'chartjs-chart-treemap'
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
  Colors,
  TreemapController,
  TreemapElement
)
const app = createApp(App)

app.use(router)

app.use(vuetify)
app.mount('#app')
