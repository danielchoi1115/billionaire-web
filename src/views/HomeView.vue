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
  <div>
    <BillionaireTitle title="나의 포트폴리오" />
    <PortfolioSelector />
    <PortfolioTreemap />
    <PortfolioValue />
    <PortfolioAccounts />
  </div>
</template>

<style></style>
