<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { BillionaireTitle, PortfolioAccounts, PortfolioTreemap } from '@/components'

const portfolioMst = ref()
import { storeToRefs } from 'pinia'
import { useStockStore, usePortfolioStore, useUserStore } from '@/stores'

const stockStore = useStockStore()
const portfolioStore = usePortfolioStore()
const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
const { totalBudgetAmount } = storeToRefs(stockStore)

onMounted(async () => {
  userStore.setPlanYn('Y')
  await userStore.loadPortfolioList()

  await portfolioStore.setPortfolioNo(1)
  await portfolioStore.refresh()
})

const weights = computed(() =>
  portfolioMst.value.accounts?.reduce((acc, cur) => {
    acc[cur.account.accNo] = (cur.budgetAmount / totalBudgetAmount.value) * 100
    return acc
  }, {})
)

const accountDetailOpen = ref(false)

const selectedAccount = ref()

const accountEdited = ref(false)

function openAccountDetailModal(val) {
  selectedAccount.value = val
  accountDetailOpen.value = true
}
function closeAccountDetailModal() {
  accountDetailOpen.value = false
  accountEdited.value = false
}

function saveChanges(newAccount) {
  //
}
</script>

<template>
  <div class="px-3 max-w-[720px] my-0 mx-auto">
    <BillionaireTitle text="이달의 구매계획" />
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
