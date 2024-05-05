<script setup>
import {
  BillionaireTitle,
  PortfolioAccounts,
  PortfolioTreemap,
  PortfolioSelector,
  PortfolioValue
} from '@/components'
import { onBeforeUnmount } from 'vue'
import { usePortfolioStore } from '@/stores/index.js'

const portfolioStore = usePortfolioStore()

onBeforeUnmount(() => {
  portfolioStore.resetData()
})
</script>

<template>
  <div class="px-3 max-w-[720px] my-0 mx-auto">
    <BillionaireTitle title="나의 포트폴리오" />
    <PortfolioSelector />
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
