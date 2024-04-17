<template>
  <Pie v-if="loaded" :options="chartOptions" :data="chartData"> Chart couldn't be loaded. </Pie>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import { ref, onMounted } from 'vue'

const loaded = ref(true)

const chartData = ref({
  labels: [
    'Basic Materials',
    'Consumer Cyclical',
    'Financial Services',
    'Real Estate',
    'Consumer Defensive',
    'Healthcare',
    'Utilities',
    'Communication Services',
    'Energy',
    'Industrials',
    'Technology'
  ],
  datasets: [
    {
      backgroundColor: [
        '#FF4A4A',
        '#FFAC4A',
        '#FFE9C9',
        '#F9C87C',
        '#F97432',
        '#7a7979',
        '#FFCC00',
        '#FF9900',
        '#86370e',
        '#FFFF66',
        '#ed9e67'
      ],
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  legend: { display: false }
})
</script>
