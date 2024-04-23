<script setup>
import { StocksLayout } from '@/layouts'
import { ref, onBeforeMount } from 'vue'
import { SearchBar, StockSearchResult } from '@/components'
import { StockApi } from '@/services'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const searchResult = ref([])
onMounted(async () => {
  // searchResult.value = await StockApi.search()
  if (route.query.keyword) {
    search()
  }
})

async function onSearch() {
  router.push({ path: '/stocks', query: { keyword: keyword.value } })
  search()
}

async function search() {
  loading.value = true
  setTimeout(async () => {
    console.log(route.query)
    searchResult.value = await StockApi.search(route.query.keyword)
    loading.value = false
  }, 2000)
}
onBeforeMount(() => {
  initData()
})
function initData() {}

const keyword = ref('')
const loading = ref(false)
</script>

<template>
  <main>
    <StocksLayout>
      <template v-slot:searchBar>
        <SearchBar v-model="keyword" :loading="loading" @search="onSearch" />
      </template>
      <template v-slot:stockList>
        <StockSearchResult :stocks="searchResult" />
      </template>
    </StocksLayout>
  </main>
</template>
