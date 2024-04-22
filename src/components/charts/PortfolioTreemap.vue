<!-- https://chartjs-chart-treemap.pages.dev/samples/labelsFontsAndColors.html -->
<script setup>
import { Chart } from 'chart.js'
import { onMounted, ref, computed } from 'vue'
import { color } from 'chart.js/helpers'
import { usePlanStore } from '@/stores'
const planStore = usePlanStore()

const series = computed(() => {
  const safe = {
    name: '안전자산',
    data: []
  }
  const danger = {
    name: '위험자산',
    data: []
  }
  if (planStore.summary().value) {
    planStore.summary().value.forEach((obj) => {
      let data = { x: obj.assetClass, y: obj.value }
      if (obj.assetType === '위험자산') {
        danger.data.push(data)
      } else safe.data.push(data)
    })
  }
  return [danger, safe]
})

const weightMap = computed(() =>
  planStore.summary().value?.reduce((acc, cur) => {
    acc[cur.assetClass] = cur.weight
    return acc
  }, {})
)
const chartOptions = {
  legend: {
    show: true
  },
  chart: {
    height: 350,
    type: 'treemap',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  title: {
    text: 'Multi-dimensional Treemap',
    align: 'center'
  },
  dataLabels: {
    formatter: function (value, b) {
      return [value, Math.round(weightMap.value[value] * 100) + '%']
    },
    style: {
      fontSize: '12px',
      fontWeight: 'bold'
    },
    background: {
      enabled: true,
      foreColor: '#fff',
      borderRadius: 2,
      padding: 4,
      opacity: 0.9,
      borderWidth: 1,
      borderColor: '#fff'
    }
  }
}

onMounted(() => {})
</script>
<template>
  <div id="chart">
    {{ weightMap }}
    <apexchart type="treemap" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
