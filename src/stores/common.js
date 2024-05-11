import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const dataMap = {
    assetClass: {
      '01': '주식',
      '02': '채권',
      '03': '원자재',
      '04': '부동산',
      '05': '금',
      '06': '현금'
    },
    assetCountry: {
      '01': '국내',
      '02': '미국',
      '03': '일본',
      '04': '인도'
    },
    currency: {
      KRW: 'KRW (₩)',
      USD: 'USD ($)',
      JPY: 'JPY (¥)',
      INR: 'INR (₹)'
    }
  }
  const data = {
    assetClass: [
      { code: '01', name: '주식' },
      { code: '02', name: '채권' },
      { code: '03', name: '원자재' },
      { code: '04', name: '부동산' },
      { code: '05', name: '금' },
      { code: '06', name: '현금' }
    ],
    assetCountry: [
      { code: '01', name: '국내' },
      { code: '02', name: '미국' },
      { code: '03', name: '일본' },
      { code: '04', name: '인도' }
    ],
    currency: [
      { code: 'KRW', name: 'KRW (₩)' },
      { code: 'USD', name: 'USD ($)' },
      { code: 'JPY', name: 'JPY (¥)' },
      { code: 'INR', name: 'INR (₹)' }
    ]
  }

  const assetCountry = () => data.assetCountry
  const assetClass = () => data.assetClass
  const currency = () => data.currency

  const getAssetCountry = (cd) => dataMap.assetCountry[cd]
  const getAssetClass = (cd) => dataMap.assetClass[cd]
  const getCurrency = (cd) => dataMap.currency[cd]

  return {
    assetClass,
    assetCountry,
    currency,
    getAssetCountry,
    getAssetClass,
    getCurrency
  }
})
