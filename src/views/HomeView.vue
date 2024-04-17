<script setup>
import { ref, onBeforeMount } from 'vue'
import { StockAccount, MyPortfolioChart, MyPortfolioList } from '@/components'
import HomeLayout from '@/layouts/HomeLayout.vue'

const accounts = ref()
onBeforeMount(() => {
  initData()
})
function initData() {
  let temp = [
    {
      accountName: 'ISA',
      balance: 100,
      portfolioValue: 1300,
      currency: 'USD',
      stocks: [
        {
          index: 1,
          portfolioId: '1',
          company: 'Apple Inc.',
          ticker: 'AAPL',
          lastPriceKRW: 345000,
          lastPriceUSD: 250,
          quantity: 2,
          color: '#FF4A4A'
        },
        {
          index: 2,
          portfolioId: '2',
          company: 'Berkshire Hathaway Inc Class B',
          ticker: 'BRK.B',
          lastPriceKRW: 552000,
          lastPriceUSD: 400,
          quantity: 2,
          color: '#F9C87C'
        }
      ]
    },
    {
      accountName: '일반',
      balance: 1000,
      portfolioValue: 340000,
      currency: 'KRW',
      stocks: [
        {
          index: 1,
          portfolioId: '3',
          company: '삼성전자',
          ticker: '삼성전자',
          lastPriceKRW: 90000,
          lastPriceUSD: 65.217,
          quantity: 2,
          color: '#F97432'
        },
        {
          index: 2,
          portfolioId: '4',
          company: 'SK하이닉스',
          ticker: 'SK하이닉스',
          lastPriceKRW: 160000,
          lastPriceUSD: 115.6,
          quantity: 1,
          color: '#7a7979'
        }
      ]
    }
  ]
  let totalValueKRW = temp.map((account) =>
    account.stocks.reduce((acc, cur) => acc + cur.lastPriceKRW * cur.quantity, 0)
  )
  temp.forEach((account, idx) => {
    account.stocks.forEach((stock) => {
      stock.weight = Math.round(((stock.lastPriceKRW * stock.quantity) / totalValueKRW[idx]) * 100)
      stock.totalPriceKRW = stock.lastPriceKRW * stock.quantity
      stock.totalPriceUSD = stock.lastPriceUSD * stock.quantity
    })
  })

  accounts.value = temp
}
</script>

<template>
  <main>
    <HomeLayout>
      <template v-slot:accounts>
        <StockAccount v-model="accounts" />
      </template>
      <template v-slot:charts>
        <MyPortfolioChart v-model="accounts" />
      </template>
      <!-- <template v-slot:chart-list>
        <MyPortfolioList v-model="accounts" />
      </template> -->
    </HomeLayout>
  </main>
</template>
