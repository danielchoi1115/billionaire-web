<script setup>
import { ref, reactive } from 'vue'
import { PlannerTitle, PlannerSummaryBarChart, PlannerSummaryAccounts } from '@/components'
import AccountDetailModal from '@/components/planner/AccountDetailModal.vue'

const planSummary = reactive({
  totalBudget: ref(2620000),
  accounts: reactive([
    {
      accountNo: 1,
      accountName: 'ISA',
      currency: 'KRW',
      accountIssuer: '삼성증권',
      amount: 750000,
      bgColorHex: '#36a2eb',
      iconUrl: 'won-white.png'
    },
    {
      accountNo: 2,
      accountName: '일반',
      currency: 'USD',
      accountIssuer: '삼성증권',
      amount: 1180000,
      bgColorHex: '#ff6384',
      iconUrl: 'dollar-white.png'
    },
    {
      accountNo: 3,
      accountName: '원화',
      currency: 'KRW',
      accountIssuer: '토스뱅크',
      amount: 390000,
      bgColorHex: '#ff9f40',
      iconUrl: 'won-white.png'
    },
    {
      accountNo: 4,
      accountName: '달러',
      currency: 'USD',
      amount: 150000,
      accountIssuer: '토스뱅크',
      bgColorHex: '#c9cbcf',
      iconUrl: 'dollar-white.png'
    }
  ])
})

let totalAmount = planSummary.accounts.reduce((acc, cur) => acc + cur.amount, 0)
planSummary.accounts.forEach((a) => {
  a.weight = Math.round((a.amount / totalAmount) * 10000) / 100
})
const accountDetailOpen = ref(false)

const selectedAccount = ref()

const accountEdited = ref(false)

function openAccountDetailModal(val) {
  accountDetailOpen.value = true
  selectedAccount.value = val
}
function closeAccountDetailModal() {
  accountDetailOpen.value = false
  accountEdited.value = false
}
</script>

<template>
  <div class="px-6 max-w-[720px] my-0 mx-auto">
    <PlannerTitle v-model="planSummary" />
    <PlannerSummaryBarChart v-model="planSummary" />
    <PlannerSummaryAccounts
      v-model="planSummary.accounts"
      @click:accountItem="(val) => openAccountDetailModal(val)"
    />
    <AccountDetailModal
      v-model="accountDetailOpen"
      @update:closeModal="closeAccountDetailModal"
      :edited="accountEdited"
      :account="selectedAccount"
    />
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
