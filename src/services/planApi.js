import ApiClient from '@/services/api'

async function getOnePlanMst(planSeq) {
  return await ApiClient.get(`/plans/${planSeq}`)
}
export default {
  getOnePlanMst
}
