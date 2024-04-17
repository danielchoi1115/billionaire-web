const formatNumberWithComma = (val) => {
  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export { formatNumberWithComma }
