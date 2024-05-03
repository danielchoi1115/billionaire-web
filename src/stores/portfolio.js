import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generate_plan_mst } from '@/utils/dummy_data_generator'
import { calculateStockValueKRW, getAssetType, getAssetClass, HttpStatus } from '@/utils'
import { PortfolioApi } from '@/services'
import { useToast } from 'vue-toastification'

export const usePortfolioStore = defineStore('plan', () => {
  const portfolioData = ref(null)
  const isLoading = ref(false)
  const portfolioNo = ref(null)
  const toast = useToast()
  const hasData = () => portfolioData.value != null
  const setportfolioNo = (val) => (portfolioNo.value = val)
  const fetchPlan = async () => {
    const res = await PortfolioApi.getOnePortfolioMst(portfolioNo.value)
    if (res.status === HttpStatus.OK) {
      return res
    } else {
      console.log('fetchPlan API 호출 실패...')
      return []
    }
  }

  const refresh = async () => {
    if (isLoading.value) return
    if (!portfolioNo.value) {
      console.error('portfolioNo must be set to refresh portfolioStore')
      return
    }
    isLoading.value = true
    let res = await fetchPlan()
    portfolioData.value = res.data
    isLoading.value = false
  }

  const updatePlanStock = async (account, stock) => {
    const d = {
      portfolioNo: portfolioData.value.portfolioNo,
      accNo: account.accNo,
      ticker: stock.ticker,
      quantity: Number(stock.quantity)
    }
    console.debug('updatePlanStock call API', d)
    const res = await PortfolioApi.updateStock(d)
    return res.status === HttpStatus.OK
  }

  // Plan 계좌에 주식 추가
  const insertStocks = async (account, tickers) => {
    console.debug('insertStocks: ', account)
    console.debug('insertStocks tickers: ', tickers)

    const promises = tickers.map(async (t) => {
      const res = await PortfolioApi.insertStock(portfolioData.value.portfolioNo, account.accNo, {
        ticker: t,
        quantity: 1
      })
      console.log('Plan Stock inserted!', res.data)
    })
    await Promise.all(promises)
    await refresh()
  }

  const deleteStocks = async (account, tickers) => {
    let d = {
      portfolioNo: portfolioData.value.portfolioNo,
      accNo: account.accNo,
      params: {
        tickers: tickers.join(',')
      }
    }
    let res = await PortfolioApi.deleteStocks(d)
    return res.status === HttpStatus.OK
  }

  const portfolioSummary = computed(() => {
    if (!portfolioData.value || !portfolioData.value.accounts) return []
    let temp = []
    portfolioData.value.accounts.forEach((account) => {
      let totalValue = 0
      account.stocks.forEach((stock) => {
        let assetClass = getAssetClass(stock.assetClassName, stock.assetCountryName)
        let assetType = getAssetType(stock.assetClassCd)
        let value = calculateStockValueKRW(stock)
        totalValue += value
        upsertSummaryData(temp, assetClass, assetType, value)
      })
      upsertSummaryData(
        temp,
        getAssetClass('현금', account.accCurrency),
        '안전자산',
        account.budgetAmount - totalValue
      )
    })
    temp.forEach((d) => {
      d.weight = d.value / totalBudgetAmount.value
    })
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

  const totalBudgetAmount = computed(() =>
    portfolioData.value.accounts?.reduce((acc, cur) => acc + cur.budgetAmount, 0)
  )

  return {
    isLoading,
    refresh,
    portfolioSummary,
    totalBudgetAmount,
    portfolioData,
    updatePlanStock,
    hasData,
    insertStocks,
    deleteStocks,
    setportfolioNo
  }
})
