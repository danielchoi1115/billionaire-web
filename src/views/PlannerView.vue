<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import {
  PlannerTitle,
  PlannerSummaryBarChart,
  PlannerSummaryAccounts,
  PlannerTab,
  PlanAccounts,
  PortfolioTreemap
} from '@/components'

import AccountDetailModal from '@/components/plan/AccountDetailModal.vue'
import PortfolioDoughnutChart from '@/components/charts/PortfolioDoughnutChart.vue'
import { PlanApi } from '@/services'
import { generate_plan_mst } from '@/utils/dummy_data_generator'

const planMst = ref()
import { storeToRefs } from 'pinia'
import { useStockStore, usePlanStore } from '@/stores'

const stockStore = useStockStore()
const planStore = usePlanStore()

const { totalBudgetAmount } = storeToRefs(stockStore)

onMounted(async () => {
  // let res = await PlanApi.getOnePlanMst(1)
  // planMst.value = res.data
  await planStore.setPlanNo(1)
  await planStore.refresh()
  await stockStore.refresh()
})

const weights = computed(() =>
  planMst.value.accounts?.reduce((acc, cur) => {
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
    <PortfolioTreemap />
    <PlanAccounts />
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
