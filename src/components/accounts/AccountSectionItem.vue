<script setup>
import { StockItem } from '@/components'
import { computed } from 'vue'
import { calculateStockValueKRW } from '@/utils'
import { stockPrices } from '@/stores/stocks.js'

const props = defineProps({
  account: Object
})

function calculateTotalStockPrice(account) {
  console.log(
    'total',
    account?.stocks.reduce((acc, cur) => acc + calculateStockValueKRW(cur), 0)
  )
  return account?.stocks.reduce((acc, cur) => acc + calculateStockValueKRW(cur), 0)
}

const totalStockPrice = computed(() => calculateTotalStockPrice(props.account))

const weights = computed(() =>
  props.account.stocks?.reduce((acc, cur) => {
    acc[cur.ticker] =
      Math.round((calculateStockValueKRW(cur) / totalStockPrice.value) * 10000) / 100
    return acc
  }, {})
)
const sortedStocks = computed(() =>
  props.account.stocks?.sort((a, b) => calculateStockValueKRW(b) - calculateStockValueKRW(a))
)
</script>
<template>
  <dl>
    <dt class="flex align-baseline justify-between">
      <div class="text-lg font-bold ml-1">
        <span>{{ account.accName }}</span>
      </div>
      <div class="text-sm text-neutral-500">
        <span class="text-xs">원</span>
      </div>
    </dt>
    <dd>
      <StockItem
        v-for="(stock, i) in sortedStocks"
        :key="i"
        :stock="stock"
        :weight="weights[stock?.ticker]"
        @update:quantity="(arg) => Object.assign(stock, arg)"
      />
    </dd>
  </dl>
</template>
