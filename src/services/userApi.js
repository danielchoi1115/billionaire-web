import ApiClient from '@/services/api'

const UserApi = {
  getAllPortfolio: async (userNo, planYn) => {
    let config = planYn ? { params: { planYn } } : {}
    return await ApiClient.get(`/users/${userNo}/portfolios`, config)
  }
}

export default UserApi
