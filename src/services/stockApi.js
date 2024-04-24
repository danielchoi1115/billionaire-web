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
    console.log('keyword: ', keyword)
    if (!keyword) return []
    let stocks = await generate_search_result()
    return filterStock(stocks, keyword)
  },
  update: async (stock) => {
    if (!stock || !stock.ticker) return {}
    return await ApiClient.put(`/stocks/${stock.ticker}`, stock)
  }
}
export default StockApi
