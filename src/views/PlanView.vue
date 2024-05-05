<script setup>
import { onBeforeUnmount } from 'vue'
import {
  BillionaireTitle,
  PortfolioAccounts,
  PortfolioSelector,
  PortfolioTreemap,
  PortfolioValue
} from '@/components'

import { usePortfolioStore } from '@/stores'

const portfolioStore = usePortfolioStore()

onBeforeUnmount(() => {
  portfolioStore.resetData()
})
</script>

<template>
  <div>
    <BillionaireTitle title="이달의 구매계획" />
    <PortfolioSelector plan />
    <PortfolioTreemap />
    <PortfolioValue />
    <PortfolioAccounts />
  </div>
</template>
