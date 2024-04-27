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
            kisCd: 'KR7316140003',
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
            kisCd: 'KR7316140003',
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
            kisCd: 'NASAAPL',
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
            ticker: 'BRK.B',
            quantity: 1,
            kisCd: 'NYEBRK/B',
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
            kisCd: 'KR7316140003',
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

export const generate_search_result = async () => {
  return [
    {
      kisCd: 'KR7000660001',
      ticker: '000660',
      exchCd: 'KOSPI',
      stockNameKor: 'SK하이닉스',
      stockNameEng: null,
      stockCurrency: 'KRW',
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '01',
      assetCountryName: '국내',
      stockBgColorHex: null,
      stockIconUrl: null,
      secTypeCd: 'ST',
      price: 166000,
      CREATED_AT: '2024-04-21T08:55:57.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:57.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    },
    {
      kisCd: 'KR7005380001',
      ticker: '005380',
      exchCd: 'KOSPI',
      stockNameKor: '현대차',
      stockNameEng: null,
      stockCurrency: 'KRW',
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '01',
      assetCountryName: '국내',
      stockBgColorHex: null,
      stockIconUrl: null,
      secTypeCd: 'ST',
      price: 124000,
      CREATED_AT: '2024-04-21T08:55:57.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:57.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    },
    {
      kisCd: 'KR7005930003',
      ticker: '005930',
      exchCd: 'KOSPI',
      stockNameKor: '삼성전자',
      stockNameEng: null,
      stockCurrency: 'KRW',
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '01',
      assetCountryName: '국내',
      stockBgColorHex: null,
      stockIconUrl: null,
      secTypeCd: 'ST',
      price: 75400,
      CREATED_AT: '2024-04-21T08:55:57.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:57.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    },
    {
      kisCd: 'KR7105560007',
      ticker: '105560',
      exchCd: 'KOSPI',
      stockNameKor: 'KB금융',
      stockNameEng: null,
      stockCurrency: 'KRW',
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '01',
      assetCountryName: '국내',
      stockBgColorHex: null,
      stockIconUrl: null,
      price: 64200,
      secTypeCd: 'ST',
      CREATED_AT: '2024-04-21T08:55:57.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:57.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    },
    {
      kisCd: 'NASAAPL',
      ticker: 'AAPL',
      exchCd: 'NAS',
      stockNameKor: '애플',
      stockNameEng: 'APPLE INC',
      stockCurrency: 'USD',
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '02',
      assetCountryName: '미국',
      stockBgColorHex: '#394A52',
      stockIconUrl: 'nasdaq_aapl.png',
      secTypeCd: '2',
      price: 201.1,
      CREATED_AT: '2024-04-21T08:55:59.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:59.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    },
    {
      kisCd: 'NYSBRK/B',
      ticker: 'BRK.B',
      exchCd: 'NYS',
      stockNameKor: '버크셔 해서웨이 B',
      stockNameEng: 'BERKSHIRE HATHAWAY INC',
      stockCurrency: 'USD',
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '02',
      assetCountryName: '미국',
      stockBgColorHex: '#262A93',
      stockIconUrl: 'nyse_brk.png',
      secTypeCd: '2',
      price: 400.54,
      CREATED_AT: '2024-04-21T08:55:59.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:59.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    },
    {
      kisCd: 'NYSLLY',
      ticker: 'LLY',
      exchCd: 'NYS',
      stockNameKor: '일라이 릴리',
      stockNameEng: 'ELI LILLY AND COMPANY',
      stockCurrency: 'USD',
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '02',
      assetCountryName: '미국',
      stockBgColorHex: null,
      stockIconUrl: null,
      secTypeCd: '2',
      price: 730.87,
      CREATED_AT: '2024-04-21T08:55:59.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:59.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    },
    {
      kisCd: 'NASMETA',
      ticker: 'META',
      exchCd: 'NAS',
      stockNameKor: '메타 플랫폼스(페이스북)',
      stockNameEng: 'META PLATFORMS INC',
      stockCurrency: 'USD',
      price: 483.99,
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '02',
      assetCountryName: '미국',
      stockBgColorHex: null,
      stockIconUrl: null,
      secTypeCd: '2',
      CREATED_AT: '2024-04-21T08:55:59.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:59.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    },
    {
      kisCd: 'NASMSFT',
      ticker: 'MSFT',
      exchCd: 'NAS',
      stockNameKor: '마이크로소프트',
      stockNameEng: 'MICROSOFT CORP',
      stockCurrency: 'USD',
      assetClassCd: '01',
      assetClassName: '주식',
      assetCountryCd: '02',
      assetCountryName: '미국',
      stockBgColorHex: '#000047',
      stockIconUrl: 'nasdaq_msft.png',
      price: 400.96,
      secTypeCd: '2',
      CREATED_AT: '2024-04-21T08:55:59.000Z',
      CREATED_BY: 'KIS_CRAWLER',
      MODIFIED_AT: '2024-04-21T08:55:59.000Z',
      MODIFIED_BY: 'KIS_CRAWLER'
    }
  ]
}

export const generate_common_code = async () => {
  return {
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
}
