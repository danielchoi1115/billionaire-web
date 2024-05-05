<script setup>
import {
  BillionaireTitle,
  PortfolioAccounts,
  PortfolioTreemap,
  PortfolioSelector,
  PortfolioValue
} from '@/components'
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
