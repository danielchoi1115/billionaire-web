import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generate_plan_mst } from '@/utils/dummy_data_generator'
import { calculateStockValueKRW, getAssetType } from '@/utils'
import { PlanApi } from '@/services'

export const usePlanStore = defineStore('plan', () => {
  const planData = ref(null)
  const isLoading = ref(false)
  const planNo = ref(null)

  const hasData = () => planData.value != null
  const setPlanNo = (val) => (planNo.value = val)
  const fetchPlan = async () => {
    const res = await PlanApi.getOnePlanMst(planNo.value)
    if (res.status === 200) {
      console.log('fetchPlan API 호출 완료!')
      return res
    } else {
      console.log('fetchPlan API 호출 실패...')
      return []
    }
  }

  const refresh = async () => {
    console.log('refresh planStore')
    if (isLoading.value) return
    if (!planNo.value) {
      console.error('PlanNo must be set to refresh planStore')
      return
    }
    isLoading.value = true
    let res = await fetchPlan()
    console.log('PlanStore refresh data', res.data)
    planData.value = res.data
    isLoading.value = false
  }

  const updatePlanStock = async (account, stock) => {
    const d = {
      planNo: planData.value.planNo,
      accNo: account.accNo,
      ticker: stock.ticker,
      quantity: Number(stock.quantity)
    }
    console.debug('updatePlanStock call API', d)
    const res = await PlanApi.updateStock(d)
    return res.status === 200
  }

  // Plan 계좌에 주식 추가
  const insertStocks = async (account, tickers) => {
    console.debug('insertStocks: ', account)
    console.debug('insertStocks tickers: ', tickers)

    const promises = tickers.map(async (t) => {
      const res = await PlanApi.insertStock(planData.value.planNo, account.accNo, {
        ticker: t,
        quantity: 1
      })
      console.log('Plan Stock inserted!', res.data)
    })
    await Promise.all(promises)
    await refresh()
  }

  const deleteStocks = async (account, tickers) => {
    console.log('deleteStocks', account)
    console.log('deleteStocks tickers', tickers)
    account.stocks = account.stocks.filter((s) => !tickers.includes(s.ticker))
  }

  const planSummary = computed(() => {
    if (!planData.value || !planData.value.accounts) return []
    let temp = []
    planData.value.accounts.forEach((account) => {
      let totalValue = 0
      account.stocks.forEach((stock) => {
        let assetClass = stock.assetCountryName + stock.assetClassName
        let assetType = getAssetType(stock.assetClassCd)
        let value = calculateStockValueKRW(stock)
        totalValue += value
        upsertSummaryData(temp, assetClass, assetType, value)
      })
      upsertSummaryData(
        temp,
        `현금(${account.accCurrency})`,
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
    planData.value.accounts?.reduce((acc, cur) => acc + cur.budgetAmount, 0)
  )

  return {
    isLoading,
    refresh,
    planSummary,
    totalBudgetAmount,
    planData,
    updatePlanStock,
    hasData,
    insertStocks,
    deleteStocks,
    setPlanNo
  }
})
