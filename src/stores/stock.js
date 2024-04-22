import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

async function getStockPrices() {
  return stockPrices
}

export const useStockStore = defineStore('stock', () => {
  const data = ref()
  const isLoading = ref(false)

  const fetchStockPrices = async () => {
    isLoading.value = true
    try {
      const res = await getStockPrices()
      data.value = res
      console.log('getStockPrices API 호출 완료!')
    } catch (error) {
      console.log('getStockPrices API 호출 실패...')
    } finally {
      isLoading.value = false
    }
  }
  const refresh = () => {
    if (isLoading.value) return
    fetchStockPrices()
  }
  const priceMap = computed(() => {
    let tempMap = {}
    data.value?.forEach((stock) => {
      tempMap[stock.ticker] = stock
    })
    return tempMap
  })
  const getPrice = (ticker) => {
    if (!ticker) return 0
    return priceMap.value[ticker]?.price
  }

  return { isLoading, refresh, priceMap, getPrice }
})

const stockPrices = [
  {
    ticker: 'AAPL',
    tradeTimestamp: '2024-04-21T00:50:00.000+00:00',
    price: 146,
    volume: 9600
  },
  {
    ticker: '458730',
    tradeTimestamp: '2024-04-19T06:30:00.000+00:00',
    price: 11150,
    volume: 1069443
  },
  {
    ticker: '316140',
    tradeTimestamp: '2024-04-19T06:30:00.000+00:00',
    price: 13540,
    volume: 2059911
  },
  {
    ticker: 'BRK/B',
    tradeTimestamp: '2024-04-19T20:00:00.000+00:00',
    price: 405.08,
    volume: 3999913
  },
  {
    ticker: 'MSFT',
    tradeTimestamp: '2024-04-21T00:52:00.000+00:00',
    price: 312,
    volume: 8000
  }
]

const stockPricesMap = {
  AAPL: {
    ticker: 'AAPL',
    tradeTimestamp: '2024-04-21T00:50:00.000+00:00',
    price: 146,
    volume: 9600
  },
  458730: {
    ticker: '458730',
    tradeTimestamp: '2024-04-19T06:30:00.000+00:00',
    price: 11150,
    volume: 1069443
  },
  316140: {
    ticker: '316140',
    tradeTimestamp: '2024-04-19T06:30:00.000+00:00',
    price: 13540,
    volume: 2059911
  },
  'BRK/B': {
    ticker: 'BRK/B',
    tradeTimestamp: '2024-04-19T20:00:00.000+00:00',
    price: 405.08,
    volume: 3999913
  },
  MSFT: {
    ticker: 'MSFT',
    tradeTimestamp: '2024-04-21T00:52:00.000+00:00',
    price: 312,
    volume: 8000
  }
}
