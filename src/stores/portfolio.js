import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import {
  calculateStockValueKRW,
  getAssetType,
  getAssetClass,
  HttpStatus,
  accountValueKRW
} from '@/utils'
import { PortfolioApi } from '@/services'
import { useToast } from 'vue-toastification'

export const usePortfolioStore = defineStore('plan', () => {
  const portfolioData = ref(null)
  const isLoading = ref(false)
  const portfolioConfig = reactive({
    portfolioNo: 0,
    planYn: ''
  })
  const setPlanYn = (val) => (portfolioConfig.planYn = val)
  const getPlanYn = () => portfolioConfig.planYn
  const isPlan = () => portfolioConfig.planYn === 'Y'

  const toast = useToast()
  const hasData = () => portfolioData != null
  const setPortfolioNo = (val) => (portfolioConfig.portfolioNo = val)
  const fetchPlan = async () => {
    const res = await PortfolioApi.getOnePortfolioMst(portfolioConfig.portfolioNo)
    if (res.status === HttpStatus.OK) {
      return res
    } else {
      console.error('fetchPlan API 호출 실패...')
      return []
    }
  }

  const refresh = async () => {
    if (isLoading.value) return
    if (!portfolioConfig.portfolioNo) {
      console.error('portfolioNo must be set to refresh portfolioStore')
      portfolioData.value = {}
      return
    }
    isLoading.value = true
    let res = await fetchPlan()

    if (res.status === HttpStatus.OK) {
      portfolioData.value = res.data
    } else {
      console.error('Failed to fetch portfolioData')
    }

    isLoading.value = false
  }

  const updatePortfolioStock = async (account, stock) => {
    const d = {
      portfolioNo: portfolioData.value.portfolioNo,
      accNo: account.accNo,
      ticker: stock.ticker,
      quantity: Number(stock.quantity)
    }
    const res = await PortfolioApi.updatePortfolioStock(d)
    return res.status === HttpStatus.OK
  }

  // Plan 계좌에 주식 추가
  const insertPortfolioStocks = async (account, tickers) => {
    const promises = tickers.map(async (t) => {
      const res = await PortfolioApi.insertPortfolioStock(
        portfolioData.value.portfolioNo,
        account.accNo,
        {
          ticker: t,
          quantity: 1
        }
      )
      if (res.status !== HttpStatus.CREATED) {
        console.error('Failed to insert Stock.', res)
      }
    })
    await Promise.all(promises)
    await refresh()
  }

  const deletePortfolioStocks = async (account, tickers) => {
    let d = {
      portfolioNo: portfolioData.value.portfolioNo,
      accNo: account.accNo,
      params: {
        tickers: tickers.join(',')
      }
    }
    let res = await PortfolioApi.deletePortfolioStocks(d)
    return res.status === HttpStatus.OK
  }
  const getPortfolioValueKRW = () => {
    let totalValue = 0
    portfolioData.value?.accounts?.forEach((acc) => (totalValue += accountValueKRW(acc)))
    return totalValue
  }
  const portfolioSummary = computed(() => {
    if (!portfolioData.value || !portfolioData.value.accounts) return []
    let temp = []
    let portfolioValue = getPortfolioValueKRW()

    portfolioData.value.accounts.forEach((account) => {
      let accValue = 0
      account.stocks.forEach((stock) => {
        let assetClass = getAssetClass(stock.assetClassName, stock.assetCountryName)
        let assetType = getAssetType(stock.assetClassCd)
        let value = calculateStockValueKRW(stock)
        upsertSummaryData(temp, assetClass, assetType, value)
      })
      if (isPlan()) {
        upsertSummaryData(
          temp,
          getAssetClass('현금', account.accCurrency),
          '안전자산',
          account.budgetAmount - accountValueKRW(account)
        )
      }
    })
    if (isPlan()) {
      temp.forEach((d) => {
        d.weight = d.value / totalBudgetAmount.value
      })
    } else {
      temp.forEach((d) => {
        d.weight = d.value / portfolioValue
      })
    }
    return temp
  })

  function upsertSummaryData(data, assetClass, assetType, value) {
    let target = null
    data.forEach((d) => {
      if (d.assetClass === assetClass) {
        target = d
      }
    })
    if (target) {
      target.value += value
    } else {
      data.push({
        assetClass: assetClass,
        assetType: assetType,
        value: value
      })
    }
  }
  function resetData() {
    portfolioData.value = null
  }
  const totalBudgetAmount = computed(() =>
    portfolioData.value.accounts?.reduce((acc, cur) => acc + cur.budgetAmount, 0)
  )

  return {
    isLoading,
    refresh,
    portfolioSummary,
    totalBudgetAmount,
    portfolioData,
    updatePortfolioStock,
    hasData,
    insertPortfolioStocks,
    deletePortfolioStocks,
    setPortfolioNo,
    setPlanYn,
    getPlanYn,
    isPlan,
    portfolioConfig,
    getPortfolioValueKRW,
    resetData
  }
})
