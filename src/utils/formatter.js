const units = ['', '만 ', '억 ', '조 ', '경 ']
const unit = 10000

const Formatter = {
  readableMoney: (number) => {
    if (!number) return
    let result = ''
    let idx = 0
    while (number > 0) {
      let temp = number % unit
      if (temp > 0) {
        result = String(temp) + units[idx] + result
      }
      number = Math.floor(number / unit)
      idx++
    }
    return (result === '' ? '0' : result).trim() + '원'
  },
  formatDateYYYYM: (dateStr) => {
    let date = new Date(dateStr)

    if (!(date instanceof Date && !isNaN(date))) return date.toString()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // getMonth()는 0부터 시작하므로 1을 더합니다.
    return year + '년 ' + month + '월'
  }
}
// 금액을 한글 표현으로 변환하는 함수

export { Formatter }
