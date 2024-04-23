<script setup>
import { StockItem } from '@/components'
import { computed } from 'vue'
import { calculateStockValueKRW, getAssetType } from '@/utils'
import { storeToRefs } from 'pinia'
import { useStockStore, usePlanStore } from '@/stores'

const planStore = usePlanStore()

const props = defineProps({
  account: Object
})

function calculateTotalStockPrice(account) {
  return account?.stocks.reduce((acc, cur) => acc + calculateStockValueKRW(cur), 0)
}

const totalStockPrice = computed(() => calculateTotalStockPrice(props.account))

const weights = computed(() =>
  props.account.stocks?.reduce((acc, cur) => {
    acc[cur.ticker] = weightFrom(calculateStockValueKRW(cur), props.account.budgetAmount)
    return acc
  }, {})
)
const sortedStocks = computed(() =>
  [...props.account.stocks]?.sort((a, b) => calculateStockValueKRW(b) - calculateStockValueKRW(a))
)

function weightFrom(numerator, denominator) {
  return Math.round((numerator / denominator) * 10000) / 100
}

const updateQuantity = (oldObj, newObj) => {
  Object.assign(oldObj, newObj)
  planStore.updatePlanStock(props.account, newObj)
}
</script>
<template>
  <dl class="mb-8">
    <dt class="flex align-baseline justify-between">
      <div class="text-xl font-bold ml-1">
        <span>{{ account.accName }}</span>
      </div>
      <!-- <div class="text-sm text-neutral-700">{{ account.budgetAmount?.toLocaleString() }}원</div> -->
    </dt>
    <dd>
      <StockItem
        v-for="(stock, i) in sortedStocks"
        :key="i"
        :stock="stock"
        :weight="weights[stock?.ticker]"
        @update:quantity="(arg) => updateQuantity(stock, arg)"
      />
      <StockItem
        :deposit="true"
        :account="account"
        :deposit-amount="account.budgetAmount - totalStockPrice"
        :weight="weightFrom(account.budgetAmount - totalStockPrice, account.budgetAmount)"
      />
    </dd>
  </dl>
</template>
