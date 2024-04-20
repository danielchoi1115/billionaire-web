<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Bar } from 'vue-chartjs'

const props = defineProps({
  data: Array
})
const chartData = ref()
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  borderRadius: {
    topLeft: 5,
    topRight: 5
  },
  barThickness: 25,
  layout: {
    padding: {
      top: 20
    }
  },
  scales: {
    y: {
      display: false,
      grid: {
        display: false
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      position: 'nearest'
    },
    legend: { display: false },
    datalabels: {
      formatter: (value) => {
        return value > 0 ? value.toLocaleString() : ''
      },
      clamp: true,
      align: 'end',
      anchor: 'end',
      display: 'auto',
      offset: -4
    }
  }
}

function createChartData(data) {
  let tickers = []
  let values = []

  for (let i = 1; i < 13; i++) {
    let month = `${i}월`
    tickers.push(month)
    const hasDividendsOnMonth = data?.find((item) => item.month === month)
    if (hasDividendsOnMonth) {
      values.push(hasDividendsOnMonth.totalDividends)
    } else {
      values.push(0)
    }
  }
  return {
    labels: tickers,
    datasets: [
      {
        data: values,
        names: tickers
      }
    ]
  }
}

const loaded = ref(false)

onMounted(() => {
  chartData.value = createChartData(props.data)
  nextTick(() => (loaded.value = true))
})
</script>
<template>
  <div class="h-[130px] flex justify-center">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>
