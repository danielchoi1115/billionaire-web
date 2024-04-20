<script setup>
import { StockItem } from '@/components'
import { computed } from 'vue'
import { calculateStockValueKRW } from '@/utils'
const props = defineProps({
  account: Object
})

const totalStockPrice = computed(() =>
  props.account.stocks?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
)
const weights = computed(() =>
  props.account.stocks?.reduce((acc, cur) => {
    acc[cur.ticker] = Math.round(((cur.price * cur.quantity) / totalStockPrice.value) * 10000) / 100
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
        <span>{{ account.accountName }}</span>
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
