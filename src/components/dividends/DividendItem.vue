<script setup>
import { toKRW, toUSD } from '@/utils'
import StockItemAvatar from '@/components/stocks/StockItemAvatar.vue'
import StockItemColumn from '@/components/stocks/StockItemColumn.vue'
const props = defineProps({
  dividend: Object
})
const emit = defineEmits(['openDividendItemModal'])
</script>
<template>
  <div
    @click="$emit('openDividendItemModal')"
    class="list-item-wrapper px-2 my-2 active:bg-neutral-200 active:bg-opacity-70 transition-colors rounded-lg cursor-default select-none"
  >
    <div class="list-item-inner-wrapper flex items-center transition-transform">
      <StockItemAvatar :color="dividend.bgColorHex" :icon-url="dividend.iconUrl" />
      <StockItemColumn color-subtitle="text-black">
        <template v-slot:title>
          <span>${{ toUSD(dividend.amount, dividend.currency).toLocaleString() }}</span>
          <span>({{ toKRW(dividend.amount, dividend.currency).toLocaleString() }}원)</span>
        </template>
        <template v-slot:subtitle>
          {{ dividend.stockName }}
          <span v-if="dividend.market !== 'KRX'">({{ dividend.ticker }})</span>
        </template>
      </StockItemColumn>
    </div>
  </div>
</template>

<style>
.list-item-wrapper:active .list-item-inner-wrapper {
  transform: scale(0.97);
}
</style>
