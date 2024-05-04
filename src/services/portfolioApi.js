import ApiClient from '@/services/api'
import { AuditUtil } from '@/utils/audit_util.js'

const PortfolioApi = {
  getOnePortfolioMst: async (portfolioNo) => {
    return await ApiClient.get(`/portfolios/${portfolioNo}`)
  },
  getPortfolioAccount: async (data) => {
    return await ApiClient.get(`/portfolios/${data.portfolioNo}/accounts/${data.accNo}`)
  },
  updatePortfolioAccount: async (data) => {
    AuditUtil.setDefaultAudit(data)
    return await ApiClient.patch(`/portfolios/${data.portfolioNo}/accounts/${data.accNo}`, data)
  },
  insertPortfolioStock: async (portfolioNo, accNo, data) => {
    AuditUtil.setDefaultAudit(data, true)
    return await ApiClient.post(`/portfolios/${portfolioNo}/accounts/${accNo}/stocks`, data)
  },
  updatePortfolioStock: async (data) => {
    AuditUtil.setDefaultAudit(data)
    return await ApiClient.patch(
      `/portfolios/${data.portfolioNo}/accounts/${data.accNo}/stocks/${data.ticker}`,
      data
    )
  },
  deletePortfolioStocks: async (config) => {
    return await ApiClient.delete(
      `/portfolios/${config.portfolioNo}/accounts/${config.accNo}/stocks`,
      config
    )
  }
}

export default PortfolioApi
