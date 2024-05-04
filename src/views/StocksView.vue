<script setup>
import { ref, onBeforeMount, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { StocksLayout } from '@/layouts'
import { SearchBar, StockSearchResult, StockDetailModal, BillionaireTitle } from '@/components'
import { StockApi, FileApi } from '@/services'

const router = useRouter()
const route = useRoute()
const searchResult = ref([])
onMounted(async () => {})

const handleSearchInput = async (searchInput) => {
  searchResult.value = await StockApi.keywordSearch(searchInput)
}
onBeforeMount(() => {
  initData()
})
function initData() {}

const selectedTicker = ref('')
const detailModalOpen = ref(false)

function openModal(stock) {
  nextTick(() => {
    // Object.assign(selectedStock.value, stock)
    selectedTicker.value = stock.ticker
    detailModalOpen.value = true
  })
}
</script>

<template>
  <main>
    <StocksLayout>
      <template v-slot:title>
        <BillionaireTitle text="주식 검색" />
      </template>
      <template v-slot:searchBar>
        <SearchBar :searchHandler="handleSearchInput" />
      </template>
      <template v-slot:stockList>
        <StockSearchResult :stocks="searchResult" :onClick="openModal" />
      </template>
    </StocksLayout>

    <StockDetailModal v-model="detailModalOpen" :ticker="selectedTicker" />
  </main>
</template>
