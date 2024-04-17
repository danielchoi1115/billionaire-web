<script setup>
import { Pie } from 'vue-chartjs'
import { ref, onMounted, computed, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: Array
})
const accounts = ref(props.modelValue)

function createChartData(newVal) {
  const tickers = []
  newVal?.forEach((account) => {
    account?.stocks.forEach((stock) => {
      tickers.push(stock.ticker)
    })
  })
  const colors = []
  newVal?.forEach((account) => {
    account?.stocks.forEach((stock) => {
      colors.push(stock.color)
    })
  })
  const values = []
  newVal?.forEach((account) => {
    account?.stocks.forEach((stock) => {
      values.push(stock.lastPriceKRW * stock.quantity)
    })
  })
  let total = values.reduce((a, b) => a + b, 0)

  const weights = []
  newVal?.forEach((account) => {
    account?.stocks.forEach((stock) => {
      weights.push(
        Math.round(((stock.lastPriceKRW * stock.quantity) / total) * 100).toString() + '%'
      )
    })
  })
  return {
    labels: tickers,
    datasets: [
      {
        backgroundColor: colors,
        data: values,
        names: tickers,
        weights: weights
      }
    ]
  }
}

watch(accounts.value, (newVal) => {
  chartData.value = createChartData(newVal)
})

const chartData = ref({})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      enabled: true
    },
    legend: { display: true },
    datalabels: {
      formatter: (value, ctx) => {
        return parseInt(ctx.dataset.weights[ctx.dataIndex]) > 3
          ? ctx.dataset.names[ctx.dataIndex] + '\n(' + ctx.dataset.weights[ctx.dataIndex] + ')'
          : ''
      },
      clamp: true,
      align: 'start',
      anchor: 'end',
      display: 'auto',
      offset: 10
    }
  }
}

const loaded = ref(false)
onMounted(() => {
  chartData.value = createChartData(props.modelValue)
  nextTick(() => (loaded.value = true))
})
</script>

<template>
  <div>
    <h1>포트폴리오</h1>
    <Pie v-if="loaded" :options="chartOptions" :data="chartData"> Chart couldn't be loaded. </Pie>
  </div>
</template>
