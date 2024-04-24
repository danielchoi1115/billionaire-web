<script setup>
import { StockAddButton, StockItem, StockMultiPickerModal } from '@/components'
import { computed } from 'vue'
import { calculateStockValueKRW, getAssetType } from '@/utils'
import { storeToRefs } from 'pinia'
import { useStockStore, usePlanStore } from '@/stores'

const planStore = usePlanStore()

const props = defineProps({
  account: Object,
  onAddClick: Function
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
  <dl class="my-4">
    <dt class="flex align-baseline justify-between mb-4">
      <div class="text-xl font-bold ml-1">
        <span>{{ account.accName }}</span>
      </div>
      <!-- <div class="text-sm text-neutral-700">{{ account.budgetAmount?.toLocaleString() }}원</div> -->
    </dt>
    <dd class="bg-[#f8faf7] px-2 py-2 rounded-md">
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
      <StockAddButton @click="onAddClick(account)" />
    </dd>
  </dl>
</template>
