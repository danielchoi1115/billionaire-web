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
  }
}
// 금액을 한글 표현으로 변환하는 함수

export { Formatter }
