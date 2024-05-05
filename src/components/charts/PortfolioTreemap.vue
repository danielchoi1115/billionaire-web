<script setup>
import { onMounted, computed } from 'vue'
import { usePortfolioStore } from '@/stores'
import { storeToRefs } from 'pinia'

const portfolioStore = usePortfolioStore()
const { portfolioSummary } = storeToRefs(portfolioStore)
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
  tooltip: {
    enabled: true,
    y: {
      formatter: (f) => {
        return f.toLocaleString() + '원'
      }
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
    formatter: function (value) {
      if (weightMap.value[value] < 0.01) {
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
const showChart = computed(
  () => chartData.value[0]?.data.length > 0 || chartData.value[1]?.data.length > 0
)
</script>
<template>
  <div v-if="!showChart" class="h-[300px]">주식을 추가해 주세요.</div>
  <div v-else id="chart" class="h-[300px]">
    <apexchart
      v-if="portfolioStore.hasData()"
      type="treemap"
      height="300"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
  </div>
</template>
