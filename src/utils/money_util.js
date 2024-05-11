import { useCurrencyStore } from '@/stores/currency.js'
import { storeToRefs } from 'pinia'

const convertCurrency = (amount, currencyFrom, currencyTo) => {
  const currencyStore = useCurrencyStore()
  const { currencyData } = storeToRefs(currencyStore)
  if (currencyFrom === currencyTo) {
    return amount
  } else if (currencyTo === 'USD') {
    return Math.round((amount / currencyData.value.KRWUSD) * 100) / 100
  } else {
    return Math.round(amount * currencyData.value.KRWUSD)
  }
}

const toKRW = (amount, currencyFrom) => {
  return convertCurrency(amount, currencyFrom, 'KRW')
}

const toUSD = (amount, currencyFrom) => {
  return convertCurrency(amount, currencyFrom, 'USD')
}

function calculateStockValueKRW(stock) {
  if (!stock) return 0
  return toKRW(stock.price, stock.stockCurrency) * stock.quantity
}
function accountValueKRW(account) {
  if (!account || account.length === 0) return 0
  return account.stocks?.reduce((acc, cur) => acc + calculateStockValueKRW(cur), 0)
}

export { toKRW, toUSD, calculateStockValueKRW, accountValueKRW }
