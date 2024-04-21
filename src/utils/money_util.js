import { stockPrices } from '@/stores/stocks.js'

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
  if (!stock || !stockPrices[stock.ticker]?.price) return 0
  return toKRW(stockPrices[stock.ticker]?.price, stock.stockCurrency) * stock.quantity
}

export { toKRW, toUSD, calculateStockValueKRW }
