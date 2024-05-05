<script setup>
import {
  BillionaireTitle,
  PortfolioAccounts,
  PortfolioSelector,
  PortfolioTreemap,
  PortfolioValue
} from '@/components'
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
