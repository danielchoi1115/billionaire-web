export const generate_plan_mst = () => {
  return {
    planNo: 1,
    userNo: '000000',
    planName: '테스트플랜',
    useYn: 'Y',
    accounts: [
      {
        accNo: 1,
        budgetAmount: 750000,
        userNo: 0,
        accName: 'ISA',
        accIssuer: '삼성증권',
        accCurrency: 'KRW',
        accBgColorHex: '#36a2eb',
        accIconUrl: 'won-white.png',
        stocks: [
          {
            planStockNo: 1,
            ticker: '316140',
            quantity: 5,
            stockCd: 'KR7316140003',
            exchCd: 'KOSPI',
            stockNameKor: '우리금융지주',
            stockCurrency: 'KRW',
            assetClassCd: '01',
            assetClassName: '주식',
            assetCountryCd: '01',
            assetCountryName: '국내',
            secTypeCd: 'ST',
            stockBgColorHex: '#B0D8F1',
            stockIconUrl: 'krx_316140.png'
          },
          {
            planStockNo: 2,
            ticker: '458730',
            quantity: 10,
            stockCd: 'KR7316140003',
            exchCd: 'KOSPI',
            stockNameKor: 'TIGER 미국배당다우존스',
            stockCurrency: 'KRW',
            assetClassCd: '01',
            assetClassName: '주식',
            assetCountryCd: '01',
            assetCountryName: '국내',
            secTypeCd: 'ST',
            stockBgColorHex: '#F18321',
            stockIconUrl: 'moneybag.png'
          }
        ]
      },
      {
        accNo: 2,
        budgetAmount: 1180000,
        userNo: '000000',
        accName: '일반',
        accIssuer: '삼성증권',
        accCurrency: 'USD',
        accBgColorHex: '#36a2eb',
        accIconUrl: 'won-white.png',
        stocks: [
          {
            planStockNo: 3,
            ticker: 'AAPL',
            quantity: 2,
            stockCd: 'NASAAPL',
            exchCd: 'NAS',
            stockNameKor: '애플',
            stockCurrency: 'USD',
            assetClassCd: '01',
            assetClassName: '주식',
            assetCountryCd: '02',
            assetCountryName: '미국',
            secTypeCd: 'ST',
            stockBgColorHex: '#394A52',
            stockIconUrl: 'nasdaq_aapl.png'
          },
          {
            planStockNo: 4,
            ticker: 'BRK/B',
            quantity: 1,
            stockCd: 'NYEBRK/B',
            exchCd: 'NYE',
            stockNameKor: '버크셔 해서웨이 B',
            stockCurrency: 'USD',
            assetClassCd: '01',
            assetClassName: '주식',
            assetCountryCd: '01',
            assetCountryName: '국내',
            secTypeCd: 'ST',
            stockBgColorHex: '#262A93',
            stockIconUrl: 'nyse_brk.png'
          }
        ]
      },
      {
        accNo: 3,
        budgetAmount: 500000,
        userNo: 0,
        accName: '연저펀',
        accIssuer: 'NH나무증권',
        accCurrency: 'KRW',
        accBgColorHex: '#36a2eb',
        accIconUrl: 'won-white.png',
        stocks: [
          {
            planStockNo: 5,
            ticker: '458730',
            quantity: 26,
            stockCd: 'KR7316140003',
            exchCd: 'KOSPI',
            stockNameKor: 'TIGER 미국배당다우존스',
            stockCurrency: 'KRW',
            assetClassCd: '01',
            assetClassName: '주식',
            assetCountryCd: '01',
            assetCountryName: '국내',
            secTypeCd: 'ST',
            stockBgColorHex: '#F18321',
            stockIconUrl: 'moneybag.png'
          }
        ]
      }
    ]
  }
}
