import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { CurrencyApi } from '@/services'
import { HttpStatus } from '@/utils'

export const useCurrencyStore = defineStore('stock', () => {
  const currencyData = reactive({
    KRWUSD: 0
  })
  const updateCurrency = async () => {
    for (const code in currencyData) {
      let res = await CurrencyApi.get({ code })
      if (res.status === HttpStatus.OK) {
        currencyData[code] = res.data.lastPrice
      }
    }
  }
  return {
    currencyData,
    updateCurrency
  }
})
