import { useStockStore } from '@/stores/stock.js'
import { storeToRefs } from 'pinia'

const usdToKrwRate = 1384

const convertCurrency = (amount, currencyFrom, currencyTo) => {
  if (currencyFrom === currencyTo) {
    return amount
  } else if (currencyTo === 'USD') {
    return Math.round((amount / usdToKrwRate) * 100) / 100
  } else {
    return Math.round(amount * usdToKrwRate)
  }
}

const toKRW = (amount, currencyFrom) => {
  return convertCurrency(amount, currencyFrom, 'KRW')
}

const toUSD = (amount, currencyFrom) => {
  return convertCurrency(amount, currencyFrom, 'USD')
}

function calculateStockValueKRW(stock) {
  const store = useStockStore()

  if (!stock) return 0
  let price = store.getPrice(stock.ticker)
  return toKRW(price, stock.stockCurrency) * stock.quantity
}

export { toKRW, toUSD, calculateStockValueKRW }
