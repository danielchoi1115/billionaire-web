<script setup>
import StockItem from './StockItem.vue'

const props = defineProps({
  stocks: Array,
  notFound: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function,
    default: () => {}
  }
})
</script>

<template>
  <div v-if="!notFound">
    <StockItem
      v-for="(stock, i) in stocks"
      :key="i"
      :stock="stock"
      type="default"
      @click="onClick(stock)"
    />
  </div>
  <div v-else>
    <span class="text-2xl">검색 결과가 없습니다.</span>
  </div>
</template>
