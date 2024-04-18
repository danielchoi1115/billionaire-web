<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Bar } from 'vue-chartjs'

const props = defineProps({
  modelValue: Object
})
const chartData = ref()
const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  clip: false,
  maintainAspectRatio: false,
  borderRadius: {
    topLeft: 20,
    bottomLeft: 20,
    topRight: 20,
    bottomRight: 20
  },
  layout: {
    padding: {
      top: 14
    }
  },
  barThickness: 20,
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
      data: [a.weight],
      backgroundColor: a.bgColorHex + '90'
    }
    if (i === 0) {
      dataset.borderSkipped = 'right'
    } else if (i !== planSummary.accounts.length - 1) {
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
</script>

<template>
  <div class="flex justify-center my-4 h-8">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>
