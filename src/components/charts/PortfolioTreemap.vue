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
    height: 200,
    type: 'treemap',
    sparkline: {
      enabled: true
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 250,
      animateGradually: {
        enabled: true,
        delay: 300
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
  plotOptions: {
    treemap: {
      dataLabels: {
        format: 'scale'
      }
    }
  },
  grid: {
    padding: {
      bottom: 30
    }
  },
  xaxis: {
    show: false,
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
  dataLabels: {
    enabled: true,
    formatter: function (value, b) {
      if (weightMap.value[value] < 0.05) {
        return ['', value]
      }
      return ['', value, Math.round(weightMap.value[value] * 100) + '%']
    },
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#000000']
    },
    offsetY: -14,
    background: {
      enabled: true,
      foreColor: '#fff',
      borderWidth: 0
    }
  }
}

onMounted(() => {})
</script>
<template>
  <div id="chart" class="h-[300px]">
    <apexchart
      v-if="portfolioStore.hasData()"
      type="treemap"
      height="300"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
  </div>
</template>
