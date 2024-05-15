function convertStockPrice(stock, currencyTo) {
  if (!stock) return 0
  // no conversion
  if (stock.stockCurrency === currencyTo) return stock.price
  // USD to KRW
  if (currencyTo === 'USD') return stock.price / stock.krwUsd
  // KRW to USD
  if (currencyTo === 'KRW') return Math.round(stock.price * stock.krwUsd)

  return 0
}
function calculateStockValue(stock, currencyTo = 'KRW') {
  // 환율을 적용한 주식의 총 가격을 계산 (갯수 포함) default: KRW
  return convertStockPrice(stock, currencyTo) * stock.quantity
}

function accountValueKRW(account) {
  if (!account || account.length === 0) return 0
  return account.stocks?.reduce((acc, stock) => acc + calculateStockValue(stock, 'KRW'), 0)
}

export { calculateStockValue, accountValueKRW, convertStockPrice }
