import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generate_plan_mst } from '@/utils/dummy_data_generator'
import { calculateStockValueKRW, getAssetType } from '@/utils'

export const usePlanStore = defineStore('plan', () => {
  const data = ref({})
  const isLoading = ref(false)

  const fetchPlan = async () => {
    isLoading.value = true
    try {
      const res = await generate_plan_mst()
      data.value = res
      console.log('generate_plan_mst API 호출 완료!')
      console.log(res)
    } catch (error) {
      console.log('generate_plan_mst API 호출 실패...')
    } finally {
      isLoading.value = false
    }
  }

  const refresh = () => {
    if (isLoading.value) return
    fetchPlan()
  }
  const updateStockQuantity = (account, stock) => {
    console.log(data.value.planNo, account.accNo, stock.ticker, Number(stock.quantity))
  }
  const planSummary = computed(() => {
    if (!data.value.accounts) return []
    let temp = []
    data.value.accounts.forEach((account) => {
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
    data.value.accounts?.reduce((acc, cur) => acc + cur.budgetAmount, 0)
  )
  const summary = () => planSummary
  const accounts = () => data.value?.accounts
  return { isLoading, refresh, summary, totalBudgetAmount, accounts, updateStockQuantity }
})
