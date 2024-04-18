<script setup>
import { formatNumberWithComma, toKRW, toUSD } from '@/utils'
const props = defineProps({
  dividend: Object
})
const emit = defineEmits(['openDividendDetailModal'])
const imgBaseUrl = 'src/assets/company-logos/'
</script>
<template>
  <div
    @click="$emit('openDividendDetailModal')"
    class="list-item-wrapper px-2 my-2 active:bg-neutral-200 active:bg-opacity-70 transition-colors rounded-lg cursor-default select-none"
  >
    <div class="list-item-inner-wrapper py-3 flex items-center transition-transform">
      <v-avatar :color="dividend.bgColorHex" size="40" class="mr-4">
        <figure class="w-8 h-8">
          <img :src="imgBaseUrl + dividend.iconUrl" alt="아바타 이미지" class="rounded-full" />
        </figure>
      </v-avatar>
      <div class="flex flex-col justify-center">
        <div class="text-lg font-semibold text-neutral-700 flex gap-1 leading-6">
          <span>${{ formatNumberWithComma(toUSD(dividend.amount, dividend.currency)) }}</span>
          <span>({{ formatNumberWithComma(toKRW(dividend.amount, dividend.currency)) }}원)</span>
        </div>
        <div class="text-sm">
          {{ dividend.stockName }}
          <span v-if="dividend.market !== 'KRX'">({{ dividend.ticker }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.list-item-wrapper:active .list-item-inner-wrapper {
  transform: scale(0.97);
}
</style>
