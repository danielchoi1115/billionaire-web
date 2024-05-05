<script setup>
import { usePortfolioStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { accountValueKRW, NumberUtil } from '@/utils'
import AccountItem from '@/components/accounts/AccountItem.vue'
import { computed } from 'vue'

const portfolioStore = usePortfolioStore()
const { portfolioData } = storeToRefs(portfolioStore)
const portfolioValue = computed(() => {
  if (portfolioStore.isPlan()) {
    let totalBudget = 0
    portfolioData.value?.accounts?.forEach((account) => {
      totalBudget += account.budgetAmount
    })
    return totalBudget
  } else {
    return portfolioStore.getPortfolioValueKRW()
  }
})
function makePlanData() {
  let values = {}

  portfolioData.value?.accounts?.forEach((account) => {
    values[account.accNo] = {
      value: account.budgetAmount?.toLocaleString(),
      weight: NumberUtil.weightFrom(account.budgetAmount, portfolioValue.value)
    }
  })
  return values
}
function makePortfolioData() {
  let values = {}
  portfolioData.value?.accounts?.forEach((account) => {
    let accValue = accountValueKRW(account)
    values[account.accNo] = {
      value: accValue?.toLocaleString(),
      weight: NumberUtil.weightFrom(accValue, portfolioValue.value)
    }
  })
  return values
}

const accountValues = computed(() => {
  if (portfolioStore.isPlan()) {
    return makePlanData()
  } else {
    return makePortfolioData()
  }
})
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel elevation="0">
      <template v-slot:title>
        <div class="text-xl font-bold">총 {{ portfolioValue?.toLocaleString() }}원</div>
      </template>
      <template v-slot:text>
        <AccountItem
          v-for="account in portfolioData.accounts"
          :key="account.accNo"
          :account="account"
          :data="accountValues[account.accNo]"
        />
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
