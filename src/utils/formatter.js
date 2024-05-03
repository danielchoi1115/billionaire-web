const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g
const numberFormat = (value) => {
  return value.toString().replace(NUMBER_FORMAT_REGX, ',')
}

// 금액 단위 텍스트를 추가하는 함수
const setUnitText = (numbers) => {
  const unit = ['원', '만', '억', '조', '경']
  return numbers
    .map((number, index) =>
      number ? numberFormat(number) + unit[unit.length - 1 - index] : number
    )
    .filter((number) => !!number)
    .join(' ')
}

const Formatter = {
  readableMoney: (value) => {
    const numbers = [
      value % 100000000000000000000,
      value % 10000000000000000,
      value % 1000000000000,
      value % 100000000,
      value % 10000
    ]
    return setUnitText(numbers)
  }
}
// 금액을 한글 표현으로 변환하는 함수

export default Formatter
