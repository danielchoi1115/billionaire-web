import ApiClient from '@/services/api'
import { generate_search_result } from '@/utils/dummy_data_generator'
const StockApi = {
  search: async (keyword) => {
    console.log('keyword: ', keyword)
    if (!keyword) return []
    return await generate_search_result()
  },
  update: async (stock) => {
    if (!stock || !stock.ticker) return {}
    return await ApiClient.put(`/stocks/${stock.ticker}`, stock)
  }
}
export default StockApi
