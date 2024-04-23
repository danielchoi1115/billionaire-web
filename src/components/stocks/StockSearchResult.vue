<script setup>
import { ref } from 'vue'
import StockItem from './StockItem.vue'
import { StockDetailModal } from '@/components'
import { nextTick } from 'vue'

const props = defineProps({
  stocks: Array,
  notFound: {
    type: Boolean,
    default: false
  }
})

const selectedStock = ref({})
const detailModal = ref(false)

function openModal(stock) {
  nextTick(() => {
    // Object.assign(selectedStock.value, stock)
    selectedStock.value = stock
    detailModal.value = true
  })
}
</script>
<!-- #f3f5f6 -->
<template>
  <div v-if="!notFound">
    <StockItem
      v-for="(stock, i) in stocks"
      :key="i"
      :stock="stock"
      type="default"
      @click="openModal(stock)"
    />
    <StockDetailModal v-model="detailModal" :stock="selectedStock" />
  </div>
  <div v-else>
    <span class="text-2xl">검색 결과가 없습니다.</span>
  </div>
</template>
