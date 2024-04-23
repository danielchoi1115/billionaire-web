import ApiClient from '@/services/api'

const PlanApi = {
  getOnePlanMst: async (planSeq) => {
    return await ApiClient.get(`/plans/${planSeq}`)
  }
}

export default PlanApi
