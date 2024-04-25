import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { generate_common_code } from '@/utils/dummy_data_generator.js'

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
      KRW: '원화 (₩)',
      USD: '달러 ($)'
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
      { code: 'KRW', name: '원화 (₩)' },
      { code: 'USD', name: '달러 ($)' }
    ]
  }
  // const isLoading = ref(false)
  //
  // const hasData = () => data.value != null
  // const fetchCommonCode = async () => {
  //   isLoading.value = true
  //   try {
  //     const res = await generate_common_code()
  //     console.log('generate_plan_mst API 호출 완료!')
  //     console.log(res)
  //     return res
  //   } catch (error) {
  //     console.log('generate_plan_mst API 호출 실패...')
  //   } finally {
  //     isLoading.value = false
  //   }
  // }
  //
  // const refresh = async () => {
  //   if (isLoading.value) return
  //   data.value = await fetchCommonCode()
  // }
  const assetCountry = () => data.assetCountry
  const assetClass = () => data.assetClass
  const currency = () => data.currency

  const getAssetCountry = (cd) => dataMap.assetCountry[cd]
  const getAssetClass = (cd) => dataMap.assetClass[cd]
  const getCurrency = (cd) => dataMap.currency[cd]

  return { assetClass, assetCountry, currency, getAssetCountry, getAssetClass, getCurrency }
})
