<script setup>
import { ref, reactive, computed, watch } from 'vue'
import {
  PlannerTitle,
  PlannerSummaryBarChart,
  PlannerSummaryAccounts,
  PlannerTab,
  AccountItem
} from '@/components'
import AccountDetailModal from '@/components/planner/AccountDetailModal.vue'

const planSummary = reactive({
  totalBudget: ref(2620000),
  accounts: reactive([
    {
      accountNo: 2,
      accountName: '일반',
      currency: 'USD',
      accountIssuer: '삼성증권',
      amount: 1180000,
      bgColorHex: '#ff6384',
      iconUrl: 'dollar-white.png',
      stocks: [
        {
          index: 1,
          stockName: 'Vanguard Intermediate-Term Corperatre Bond',
          ticker: 'VCIT',
          displayName: '뱅가드 미국 중기 회사채 ETF',
          price: 9.42,
          quantity: 5,
          currency: 'USD',
          market: 'NASDAQ',
          iconUrl: 'moneybag.png',
          bgColorHex: '#96151D'
        }
      ]
    },
    {
      accountNo: 1,
      accountName: 'ISA',
      currency: 'KRW',
      accountIssuer: '삼성증권',
      amount: 750000,
      bgColorHex: '#36a2eb',
      iconUrl: 'won-white.png',
      stocks: [
        {
          index: 1,
          stockName: '우리금융지주',
          displayName: '우리금융지주',
          ticker: '316140',
          price: 13000,
          currency: 'KRW',
          quantity: 25,
          iconUrl: 'krx-316140.png',
          bgColorHex: '#B0D8F1',
          market: 'KRX'
        },
        {
          index: 2,
          stockName: 'TIGER 미국배당다우존스',
          displayName: 'TIGER 미국배당다우존스',
          ticker: '458730',
          price: 16000,
          currency: 'KRW',
          quantity: 10,
          iconUrl: 'moneybag.png',
          bgColorHex: '#F18321',
          market: 'KRX'
        }
      ]
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
let totalAmount = computed(() => planSummary.accounts.reduce((acc, cur) => acc + cur.amount, 0))

const weights = computed(() =>
  planSummary.accounts.reduce((acc, cur) => {
    acc[cur.accountNo] = Math.round((cur.amount / totalAmount.value) * 10000) / 100
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
  let temp = planSummary.accounts.filter((a) => a.accountNo !== newAccount.accountNo)
  temp.push(reactive(newAccount))
  temp.sort((a, b) => b.amount - a.amount)
  Object.assign(planSummary.accounts, temp)
  closeAccountDetailModal()
}
</script>

<template>
  <div class="px-6 max-w-[720px] my-0 mx-auto">
    <PlannerTab>
      <template v-slot:byAsset>
        <AccountItem v-for="(account, i) in planSummary.accounts" :key="i" :account="account" />
      </template>
      <template v-slot:byAccount>
        <PlannerTitle v-model="planSummary" />
        <PlannerSummaryBarChart v-model="planSummary" :weights="weights" />
        <PlannerSummaryAccounts
          v-model="planSummary.accounts"
          :weights="weights"
          @click:accountItem="(val) => openAccountDetailModal(val)"
        />
        <AccountDetailModal
          v-model="accountDetailOpen"
          @closeModal="closeAccountDetailModal"
          @submit="saveChanges"
          :edited="accountEdited"
          :account="selectedAccount"
        />
      </template>
    </PlannerTab>
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
