<script setup>
import { onUpdated } from 'vue'
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
function createChartData(planSummary) {
  let labels = []
  let datasets = []

  planSummary.accounts.forEach((a, i) => {
    labels.push(a.accountName)
    let dataset = {
      label: a.accountName,
      data: [props.weights[a.accountNo] > 0.1 ? props.weights[a.accountNo] : 0],
      backgroundColor: a.bgColorHex + 'bb'
    }
    if (i === 0) {
      dataset.borderSkipped = 'right'
    } else if (i !== planSummary.accounts?.length - 1) {
      dataset.borderSkipped = true
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
