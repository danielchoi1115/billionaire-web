<script setup>
import { usePortfolioStore } from '@/stores/index.js'

const portfolioStore = usePortfolioStore()
</script>

<template>
  <div class="text-2xl font-bold my-2">
    총 {{ portfolioStore.getPortfolioValueKRW()?.toLocaleString() }}원
  </div>
</template>
