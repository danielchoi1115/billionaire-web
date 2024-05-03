<!-- https://chartjs-chart-treemap.pages.dev/samples/labelsFontsAndColors.html -->
<script setup>
import { onMounted, ref, computed } from 'vue'
import { usePortfolioStore } from '@/stores'
import { storeToRefs } from 'pinia'

const portfolioStore = usePortfolioStore()
const { portfolioSummary } = storeToRefs(portfolioStore)
// const series = computed(() => {
//   const safe = {
//     name: '안전자산',
//     data: []
//   }
//   const danger = {
//     name: '위험자산',
//     data: []
//   }
//   if (portfolioSummary) {
//     portfolioSummary.value.forEach((obj) => {
//       let data = { x: obj.assetClass, y: obj.value }
//       if (obj.assetType === '위험자산') {
//         danger.data.push(data)
//       } else safe.data.push(data)
//     })
//     console.log(JSON.stringify([danger, safe]))
//     return [danger, safe]
//   }
//   return []
// })
const chartData = computed(() => {
  const serise = [
    {
      name: '위험자산',
      data: []
    },
    {
      name: '안전자산',
      data: []
    }
  ]
  portfolioSummary.value.forEach((p) => {
    const chartDataItem = { x: p.assetClass, y: p.value }
    if (p.assetType === '위험자산') {
      serise[0].data.push(chartDataItem)
    } else {
      serise[1].data.push(chartDataItem)
    }
  })
  return serise
})
// const series = [
//   {
//     name: '위험자산',
//     data: [
//       { x: '국내주식', y: 1029731 },
//       { x: '미국주식', y: 404128 }
//     ]
//   },
//   {
//     name: '안전자산',
//     data: [
//       { x: '현금(KRW)', y: 780900 },
//       { x: '현금(USD)', y: 215241 }
//     ]
//   }
// ]

const weightMap = computed(() =>
  portfolioSummary.value.reduce((acc, cur) => {
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
    },
    toolbar: {
      show: false
    }
  },
  xaxis: {
    show: true,
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
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
    <apexchart
      v-if="portfolioStore.hasData()"
      type="treemap"
      height="350"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
  </div>
</template>
