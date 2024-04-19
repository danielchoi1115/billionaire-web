<script setup>
import { StockItem } from '@/components'
import { computed } from 'vue'
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
        v-for="(stock, i) in account.stocks"
        :key="i"
        :stock="stock"
        :weight="weights[stock?.ticker]"
      />
    </dd>
  </dl>
</template>
