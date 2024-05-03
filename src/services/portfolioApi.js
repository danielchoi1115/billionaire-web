import ApiClient from '@/services/api'

const PortfolioApi = {
  getOnePortfolioMst: async (portfolioNo) => {
    return await ApiClient.get(`/portfolios/${portfolioNo}`)
  },
  insertStock: async (portfolioNo, accNo, data) => {
    return await ApiClient.post(`/portfolios/${portfolioNo}/accounts/${accNo}/stocks`, data)
  },
  updateStock: async (data) => {
    return await ApiClient.patch(
      `/portfolios/${data.portfolioNo}/accounts/${data.accNo}/stocks/${data.ticker}`,
      data
    )
  },
  deleteStocks: async (config) => {
    return await ApiClient.delete(
      `/portfolios/${config.portfolioNo}/accounts/${config.accNo}/stocks`,
      config
    )
  }
}

export default PortfolioApi
