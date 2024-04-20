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
  if (!stock || !stock.price) return 0
  return toKRW(stock.price, stock.currency) * stock.quantity
}
export { toKRW, toUSD, calculateStockValueKRW }
