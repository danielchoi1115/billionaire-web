<script setup>
import { ref, onBeforeMount, nextTick, onMounted } from 'vue'
import { StocksLayout } from '@/layouts'
import { SearchBar, StockSearchResult, StockDetailModal, BillionaireTitle } from '@/components'
import { StockApi } from '@/services'
import { useToast } from 'vue-toastification'

const searchResult = ref([])
onMounted(async () => {})
const lastSearchInput = ref('')

const handleSearchInput = async (searchInput) => {
  lastSearchInput.value = searchInput
  await search()
}
const search = async () => {
  searchResult.value = await StockApi.keywordSearch(lastSearchInput.value)
}
onBeforeMount(() => {
  initData()
})
function initData() {}

const selectedTicker = ref('')
const detailModalOpen = ref(false)
const toast = useToast()
function openModal(stock) {
  nextTick(() => {
    // Object.assign(selectedStock.value, stock)
    selectedTicker.value = stock.ticker
    detailModalOpen.value = true
  })
}
function onUpdateStock() {
  search()
  detailModalOpen.value = false
  toast.success('변경사항이 저장되었습니다.')
}
</script>

<template>
  <main>
    <StocksLayout>
      <template v-slot:title>
        <BillionaireTitle title="주식검색" />
      </template>
      <template v-slot:searchBar>
        <SearchBar :searchHandler="handleSearchInput" />
      </template>
      <template v-slot:stockList>
        <StockSearchResult :stocks="searchResult" :onClick="openModal" />
      </template>
    </StocksLayout>

    <StockDetailModal
      v-model="detailModalOpen"
      :ticker="selectedTicker"
      :onAfterSubmit="onUpdateStock"
    />
  </main>
</template>
