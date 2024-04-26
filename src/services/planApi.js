import ApiClient from '@/services/api'

const PlanApi = {
  getOnePlanMst: async (planSeq) => {
    return await ApiClient.get(`/plans/${planSeq}`)
  },
  insertStock: async (planNo, accNo, data) => {
    return await ApiClient.post(`/plans/${planNo}/accounts/${accNo}/stocks`, data)
  },
  updateStock: async (data) => {
    return await ApiClient.patch(
      `/plans/${data.planNo}/accounts/${data.accNo}/stocks/${data.ticker}`,
      data
    )
  }
}

export default PlanApi
