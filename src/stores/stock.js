import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { StockApi } from '@/services'

export const useStockStore = defineStore('stock', () => {
  const stockData = ref([])
  const isLoading = ref(false)

  const fetchStockPricesByTickers = async (tickers) => {
    let res = StockApi.tickerSearch(tickers)
    if (res?.status === 200) {
      console.log(res)
      stockData.value = res.data
    }
  }

  const priceMap = computed(() => {
    let tempMap = {}
    stockData.value?.forEach((stock) => {
      tempMap[stock.ticker] = stock
    })
    return tempMap
  })
  const getPrice = (ticker) => {
    if (!ticker) return 0
    return priceMap.value[ticker]?.price
  }

  const updateStock = (stock) => {
    console.log(stock)
  }
  return { isLoading, fetchStockPricesByTickers, priceMap, getPrice, updateStock }
})
