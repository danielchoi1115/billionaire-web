<script setup>
import { Doughnut } from 'vue-chartjs'
import { computed } from 'vue'
import { calculateStockValueKRW, toKRW } from '@/utils'
import { useStockStore } from '@/stores/stock.js'
import { storeToRefs } from 'pinia'

const store = useStockStore()

const { priceMap } = storeToRefs(store)

const props = defineProps({
  accounts: Array
})

// const totalValueKRW = computed(() =>
//   props.accounts.reduce(
//     (acc, obj) => obj.stocks?.reduce((acc2, obj2) => acc2 + calculateStockValueKRW(obj2), 0),
//     0
//   )
// )
//

const totalValueKRW = computed(() => props.accounts.reduce((acc, obj) => acc + obj.budgetAmount, 0))

const chartData = computed(() => {})
let accountData = props.accounts.map((accounts) =>
  accounts.stocks?.reduce(
    (acc, stk) => {
      acc[stk.assetTypeName] += calculateStockValueKRW(stk)
      return acc
    },
    { 안전자산: 0, 위험자산: 0 }
  )
)
let summary = [0, 0]
accountData.forEach((item) => {
  if (item) {
    summary[0] += item['위험자산'] || 0
    summary[1] += item['안전자산'] || 0
  }
})
// return {
//   labels: ['위험자산', '안전자산'],
//   datasets: [
//     {
//       labels: ['위험자산', '안전자산'],
//       backgroundColor: ['#d96d20', '#3d80d9'],
//       data: summary,
//       weights: summary.map((a) => a / totalValueKRW.value)
//     }
//   ]
// }

const options = {
  responsive: true,
  maintainAspectRatio: false,
  clip: false,
  plugins: {
    legend: { display: false },
    datalabels: {
      formatter: (value, ctx) => {
        return [
          ctx.dataset.labels[ctx.dataIndex],
          `${Math.round(ctx.dataset.weights[ctx.dataIndex] * 100)}%`
        ]
      },
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(58,58,58,0.7)', // 여기에 원하는 배경색을 설정하세요.
      borderRadius: 5,
      labels: {
        type: {
          align: 'top',
          anchor: 'center',
          font: {
            size: 12,
            weight: 'bold'
          },
          formatter: (value, ctx) => {
            return [ctx.dataset.labels[ctx.dataIndex]]
          }
        },
        index: {
          align: 'bottom',
          anchor: 'center',
          font: {
            size: 16,
            weight: 'bold'
          },
          formatter: (value, ctx) => {
            return `${Math.round(ctx.dataset.weights[ctx.dataIndex] * 100)}%`
          },
          offset: -2
        }
      }
    }
  }
}
</script>

<template>
  {{ totalValueKRW }}
  <div class="h-[200px] flex justify-center">
    <!-- <Doughnut :data="chartData" :options="options" /> -->
  </div>
</template>
