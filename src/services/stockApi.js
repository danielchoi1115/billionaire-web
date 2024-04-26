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
  search: async (keyword) => {
    if (!keyword) return []
    let res = await ApiClient.get(`/stocks`, { params: { keyword } })
    return res.data.slice(0, 10)
  },
  update: async (stock) => {
    if (!stock || !stock.ticker) return {}
    return await ApiClient.put(`/stocks/${stock.ticker}`, stock)
  }
}
export default StockApi
