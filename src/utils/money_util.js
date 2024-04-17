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

export { toKRW, toUSD }
