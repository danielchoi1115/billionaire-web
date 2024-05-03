import { UserApi } from '@/services'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userData = ref({
    userNo: '000000',
    portfolios: []
  })
  const planYn = ref(null)

  const setPlanYn = (val) => (planYn.value = val)

  const loadPortfolioList = async () => {
    userData.value.portfolios = await UserApi.getAllPortfolio(userData.value.userNo, planYn.value)
  }
  const getUser = () => userData.value
  const getUserNo = () => userData.value?.userNo

  return { getUser, getUserNo, setPlanYn, loadPortfolioList, userData }
})
