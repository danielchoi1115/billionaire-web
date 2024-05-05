<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import {
  BillionaireTitle,
  PortfolioAccounts,
  PortfolioSelector,
  PortfolioTreemap,
  PortfolioValue
} from '@/components'

import { usePortfolioStore, useUserStore } from '@/stores'

const portfolioStore = usePortfolioStore()

onBeforeUnmount(() => {
  portfolioStore.resetData()
})
</script>

<template>
  <div class="px-3 max-w-[720px] my-0 mx-auto">
    <BillionaireTitle title="이달의 구매계획" />
    <PortfolioSelector plan />
    <PortfolioValue />
    <PortfolioTreemap />
    <PortfolioAccounts />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
