import { UserApi } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HttpStatus } from '@/utils/index.js'
import { usePortfolioStore } from '@/stores/portfolio.js'

export const useUserStore = defineStore('user', () => {
  const userData = ref({
    userNo: '000000',
    portfolios: []
  })
  const loadPortfolioList = async () => {
    const portfolioStore = usePortfolioStore()
    let res = await UserApi.getAllPortfolio(userData.value.userNo, portfolioStore.getPlanYn())
    if (res.status === HttpStatus.OK) {
      userData.value.portfolios = res.data
    }
  }
  const getUser = () => userData.value
  const getUserNo = () => userData.value?.userNo

  return { getUser, getUserNo, loadPortfolioList, userData }
})
