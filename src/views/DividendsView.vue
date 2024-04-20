<script setup>
import { ref, reactive } from 'vue'
import { MyDividendsHistory, MyDividendsChart, MyDividendsSummary } from '@/components'

const dividendsData = reactive({
  headers: reactive([
    { title: '주식', align: 'start', key: 'stockName' },
    { title: '지급일', key: 'paymentDate' },
    { title: '계좌', key: 'accoundName' },
    { title: '금액', key: 'amount' },
    { title: '통화', key: 'currency' }
  ]),
  metadata: reactive({
    year: ref(2024)
  }),
  dividends: reactive([
    {
      month: '2월',
      totalDividends: 4200,
      currency: 'KRW',
      history: [
        {
          stockName: 'TIGER 미국배당다우존스',
          market: 'KRX',
          ticker: '316140',
          paymentDate: '2024-02-02',
          displayDate: '2.2',
          accountId: '1',
          accoundName: 'ISA',
          amount: 1400,
          currency: 'KRW',
          iconUrl: 'moneybag.png',
          bgColorHex: '#F18321'
        },
        {
          stockName: '우리금융지주',
          market: 'KRX',
          ticker: '316140',
          paymentDate: '2024-02-06',
          displayDate: '2.6',
          accountId: '1',
          accoundName: 'ISA',
          amount: 2800,
          currency: 'KRW',
          iconUrl: 'krx-316140.png',
          bgColorHex: '#B0D8F1'
        }
      ]
    },
    {
      month: '3월',
      totalDividends: 9100,
      currency: 'KRW',
      history: [
        {
          stockName: 'Vanguard Intermediate-Term Corperatre Bond',
          market: 'NASDAQ',
          ticker: 'VCIT',
          paymentDate: '2024-03-01',
          displayDate: '3.1',
          accountId: '1',
          accoundName: '일반',
          amount: 2.5,
          currency: 'USD',
          iconUrl: 'moneybag.png',
          bgColorHex: '#96151D'
        },
        {
          stockName: 'TIGER 미국배당다우존스',
          market: 'KRX',
          ticker: '316140',
          paymentDate: '2024-03-02',
          displayDate: '3.2',
          accountId: '1',
          accoundName: 'ISA',
          amount: 2800,
          currency: 'KRW',
          iconUrl: 'moneybag.png',
          bgColorHex: '#F18321'
        },
        {
          stockName: '우리금융지주',
          market: 'KRX',
          ticker: '316140',
          paymentDate: '2024-03-06',
          displayDate: '3.6',
          accountId: '1',
          accoundName: 'ISA',
          amount: 2800,
          currency: 'KRW',
          iconUrl: 'krx-316140.png',
          bgColorHex: '#B0D8F1'
        }
      ]
    }
  ])
})
</script>
<template>
  <div class="dividends px-6 max-w-[720px] my-0 mx-auto">
    <div class="wrapper">
      <MyDividendsSummary v-model="dividendsData" />
      <MyDividendsChart :data="dividendsData.dividends" />
      <MyDividendsHistory v-model="dividendsData" />
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
