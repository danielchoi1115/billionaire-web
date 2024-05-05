<script setup>
import {
  AccountDetailModal,
  AccountSectionItem,
  StockDetailModal,
  StockMultiPickerModal
} from '@/components'
import { ref, reactive, watch } from 'vue'
import { usePortfolioStore } from '@/stores'
import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'

import { useToast } from 'vue-toastification'

const portfolioStore = usePortfolioStore()
const { portfolioData } = storeToRefs(portfolioStore)

const toast = useToast()
const selectedAccount = ref({})

const submitLoading = ref(false)

const stockMultiPickerModalRef = ref(null)

const selectedTicker = ref('')
const autoSort = ref(true)

const modal = reactive({
  stockDetail: ref(false),
  stockAdd: ref(false),
  accountDetail: ref(false)
})
const selected = reactive({
  ticker: '',
  account: {}
})
const currentAccountNo = ref()

function onAddClick(account) {
  selectedAccount.value = account
  modal.stockAdd = true
  nextTick(() => {
    stockMultiPickerModalRef.value.searchTextFieldRef.focus()
  })
}

async function onStockAdded(stockMap) {
  submitLoading.value = true
  let tickers = []
  stockMap.forEach((k, v) => tickers.push(v))

  await portfolioStore.insertPortfolioStocks(selectedAccount.value, tickers)

  toast.success('추가되었습니다.', {
    timeout: 2000
  })
  submitLoading.value = false
  modal.stockAdd = false
  stockMultiPickerModalRef.value.clearAllInput()
}

function onStockClick(stock) {
  selectedTicker.value = stock.ticker
  modal.stockDetail = true
}

function onAccountEditClick() {
  modal.accountDetail = true
}

function handleAccountDetailModal(val) {
  modal.accountDetail = val
}
async function onUpdateStock() {
  submitLoading.value = true
  await portfolioStore.refresh()
  submitLoading.value = false
  modal.stockDetail = false
  toast.success('변경사항이 저장되었습니다.')
}
async function onUpdateAccount() {
  submitLoading.value = true
  await portfolioStore.refresh()
  submitLoading.value = false
  modal.accountDetail = false
  toast.success('변경사항이 저장되었습니다.')
}

watch(
  () => portfolioData.value,
  (newVal, oldVal) => {
    if (!newVal?.portfolioNo) return
    if (newVal?.portfolioNo !== oldVal?.portfolioNo) {
      currentAccountNo.value = newVal.accounts[0]?.accNo
    }
  }
)
</script>

<template>
  <v-tabs v-model="currentAccountNo">
    <v-tab
      v-for="(account, i) in portfolioData?.accounts"
      :key="account.accNo"
      :value="account.accNo"
    >
      {{ account.accName }}
    </v-tab>
    <div class="flex grow justify-end items-center" v-if="portfolioData?.accounts">
      <v-btn
        @click="autoSort = !autoSort"
        text="자동정렬"
        :color="autoSort ? 'black' : '#737373'"
        prepend-icon="mdi-sort-variant"
        :variant="autoSort ? 'tonal' : 'text'"
        size="small"
      />
    </div>
  </v-tabs>
  <v-window v-model="currentAccountNo" class="h-[1500px]">
    <v-window-item
      v-for="(account, i) in portfolioData?.accounts"
      :key="account.accNo"
      :value="account.accNo"
    >
      <AccountSectionItem
        :plan="portfolioStore.isPlan()"
        :account="account"
        :onAddClick="onAddClick"
        :onStockClick="onStockClick"
        :autoSort="autoSort"
        :onAccountEditClick="onAccountEditClick"
      />
    </v-window-item>
  </v-window>

  <StockMultiPickerModal
    ref="stockMultiPickerModalRef"
    v-model="modal.stockAdd"
    @submit="onStockAdded"
    :loading="submitLoading"
  >
    <template v-slot:title> 주식 추가하기 </template>
    <template v-slot:subtitle> Portfolio for {{ selectedAccount.accName }} </template>
  </StockMultiPickerModal>

  <StockDetailModal
    v-model="modal.stockDetail"
    @update:modelValue="modal.stockDetail = false"
    :ticker="selectedTicker"
    :onAfterSubmit="onUpdateStock"
  />
  <AccountDetailModal
    v-model="modal.accountDetail"
    @update:modelValue="handleAccountDetailModal"
    :accountNo="currentAccountNo"
    :onAfterSubmit="onUpdateAccount"
  />
</template>
