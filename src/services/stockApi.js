import ApiClient from '@/services/api'
import { generate_search_result } from '@/utils/dummy_data_generator'

function filterStock(stocks, keyword) {
  return stocks.filter((s) => {
    keyword = keyword.toLowerCase()

    return (
      s.ticker.toLowerCase().startsWith(keyword) || s.stockNameKor.toLowerCase().includes(keyword)
    )
  })
}

const StockApi = {
  keywordSearch: async (keyword) => {
    if (!keyword) return []
    let res = await ApiClient.get(`/stocks`, { params: { keyword } })
    return res.data.slice(0, 10)
  },
  tickerSearch: async (tickers) => {
    if (!tickers || tickers.isEmpty()) return []
    return await ApiClient.get(`/stocks`, { params: { tickers } })
  },
  getByTicker: async (ticker) => {
    if (!ticker) return {}
    return await ApiClient.get(`/stocks/${ticker}`)
  },
  update: async (stock) => {
    if (!stock || !stock.ticker) return {}
    return await ApiClient.patch(`/stocks/${stock.ticker}`, stock)
  }
}
export default StockApi
