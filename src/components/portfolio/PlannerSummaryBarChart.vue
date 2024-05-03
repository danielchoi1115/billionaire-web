<script setup>
import { watch } from 'vue'
import { ref, onMounted, nextTick } from 'vue'
import { Bar } from 'vue-chartjs'

const props = defineProps({
  modelValue: Object,
  weights: Object
})
const chartData = ref()
const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  clip: false,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 11
    }
  },
  barThickness: 24,
  scales: {
    y: {
      stacked: true,
      display: false,
      grid: {
        display: false
      }
    },
    x: {
      stacked: true,
      display: false,
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    },
    datalabels: {
      display: false
    }
  }
}
function createChartData(portfolioMst) {
  let labels = []
  let datasets = []

  portfolioMst?.planAccDtl.forEach((a, i) => {
    labels.push(a.accMst.accName)
    let dataset = {
      label: a.accMst.accName,
      data: [props.weights[a.accMst.accNo] > 0.1 ? props.weights[a.accMst.accNo] : 0],
      backgroundColor: a.accMst.accBgColorHex + 'bb'
    }
    datasets.push(dataset)
  })
  return {
    labels: labels,
    datasets: datasets
  }
}

const loaded = ref(false)

onMounted(() => {
  chartData.value = createChartData(props.modelValue)
  nextTick(() => (loaded.value = true))
})

watch(
  () => props.weights,
  (newVal) => {
    chartData.value = createChartData(props.modelValue)
  }
)
</script>

<template>
  <div class="flex justify-center my-4 h-[25px] rounded-lg overflow-hidden mx-2">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>
