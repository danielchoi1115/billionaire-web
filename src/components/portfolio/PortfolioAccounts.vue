<script setup>
import {
  PortfolioAccountDetailModal,
  AccountSectionItem,
  StockDetailModal,
  StockMultiPickerModal
} from '@/components'
import { ref, reactive } from 'vue'
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

  await portfolioStore.insertStocks(selectedAccount.value, tickers)

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

function onAccountClick(account) {
  modal.accountDetail = true
  selected.account = account
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
</script>

<template>
  <v-switch v-model="autoSort" color="primary" label="자동정렬" hide-details />

  <AccountSectionItem
    v-for="(account, i) in portfolioData?.accounts"
    :key="i"
    :account="account"
    :onAddClick="onAddClick"
    :onStockClick="onStockClick"
    :onAccountClick="(e) => onAccountClick(account)"
    :autoSort="autoSort"
  />

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
  <PortfolioAccountDetailModal
    v-model="modal.accountDetail"
    @update:modelValue="handleAccountDetailModal"
    :account="selected.account"
    :onAfterSubmit="onUpdateAccount"
  />
</template>
