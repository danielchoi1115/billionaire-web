<script setup>
import { ref, onBeforeMount, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { StocksLayout } from '@/layouts'
import { SearchBar, StockSearchResult, StockDetailModal } from '@/components'
import { StockApi, FileApi } from '@/services'

const router = useRouter()
const route = useRoute()
const searchResult = ref([])
onMounted(async () => {})

async function onSearch() {
  loading.value = true
  setTimeout(async () => {
    searchResult.value = await StockApi.search(keyword.value)
    loading.value = false
  }, 500)
}

onBeforeMount(() => {
  initData()
})
function initData() {}

const keyword = ref('')
const loading = ref(false)

const selectedStock = ref({})
const detailModalOpen = ref(false)

function openModal(stock) {
  nextTick(() => {
    // Object.assign(selectedStock.value, stock)
    selectedStock.value = stock
    detailModalOpen.value = true
  })
}
</script>

<template>
  <main>
    <StocksLayout>
      <template v-slot:searchBar>
        <SearchBar v-model="keyword" :loading="loading" @search="onSearch" />
      </template>
      <template v-slot:stockList>
        <StockSearchResult :stocks="searchResult" :onClick="openModal" />
      </template>
    </StocksLayout>

    <StockDetailModal v-model="detailModalOpen" :stock="selectedStock" />
  </main>
</template>
