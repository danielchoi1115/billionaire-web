import ApiClient from '@/services/api'
import { AuditUtil } from '@/utils/audit_util.js'

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
    AuditUtil.setDefaultAudit(stock)
    return await ApiClient.patch(`/stocks/${stock.ticker}`, stock)
  }
}
export default StockApi
