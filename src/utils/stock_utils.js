import { FILE_SERVER_BASE_URL } from '@/configs.js'

const assetTypes = {
  '01': '위험자산',
  '02': '안전자산',
  '03': '위험자산',
  '04': '위험자산',
  '05': '안전자산',
  '06': '안전자산'
}

const countryToCurrencyMap = {
  미국: 'USD',
  한국: 'KRW',
  국내: 'KRW',
  일본: 'JPY',
  인도: 'INR',
  USD: 'USD',
  KRW: 'KRW',
  JPY: 'JPY',
  INR: 'INR'
}
export const getAssetType = (assetClassCd) => assetTypes[assetClassCd]
export const getAssetClass = (_class, country) =>
  _class === '현금' ? `현금(${currencyFromCountry(country)})` : country + _class

const currencyFromCountry = (country) =>
  country in countryToCurrencyMap ? countryToCurrencyMap[country] : 'N/A'

export const imgBaseUrl = 'src/assets/icons/'

const defaultColor = '#798599'
const defaultLogo = 'default-logo.svg'
export const StockUtil = {
  makeUrl: (filename) => `${FILE_SERVER_BASE_URL}/api/billionaire/file/${filename || defaultLogo}`,
  makeColor: (color) => color || defaultColor
}
