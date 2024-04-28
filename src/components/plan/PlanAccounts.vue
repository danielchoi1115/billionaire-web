<script setup>
import { AccountSectionItem, StockDetailModal, StockMultiPickerModal } from '@/components'
import { ref } from 'vue'
import { usePlanStore } from '@/stores'
import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'

import { useToast } from 'vue-toastification'
const planStore = usePlanStore()
const { planData } = storeToRefs(planStore)
const pickerModalOpen = ref(false)
const toast = useToast()
const selectedAccount = ref({})

const submitLoading = ref(false)

const stockMultiPickerModalRef = ref(null)

const selectedTicker = ref({})
const autoSort = ref(true)
const detailModalOpen = ref(false)

function onAddClick(account) {
  selectedAccount.value = account
  pickerModalOpen.value = true
  nextTick(() => {
    stockMultiPickerModalRef.value.searchTextFieldRef.focus()
  })
}

async function onChangeQuantity(stockMap) {
  submitLoading.value = true
  let tickers = []
  stockMap.forEach((k, v) => tickers.push(v))

  await planStore.insertStocks(selectedAccount.value, tickers)

  toast.success('추가되었습니다.', {
    timeout: 2000
  })
  submitLoading.value = false
  pickerModalOpen.value = false
  stockMultiPickerModalRef.value.clearAllInput()
}

function onStockClick(stock) {
  console.log('onStockClick', stock.ticker)
  selectedTicker.value = stock.ticker
  detailModalOpen.value = true
}

async function onUpdateStock() {
  submitLoading.value = true
  await planStore.refresh()
  submitLoading.value = false
  detailModalOpen.value = false
  toast.success('변경사항이 저장되었습니다.')
}
</script>

<template>
  <v-switch v-model="autoSort" color="primary" label="자동정렬" hide-details />
  <AccountSectionItem
    v-for="(account, i) in planData?.accounts"
    :key="i"
    :account="account"
    :onAddClick="onAddClick"
    :onStockClick="onStockClick"
    :autoSort="autoSort"
  />

  <StockMultiPickerModal
    ref="stockMultiPickerModalRef"
    v-model="pickerModalOpen"
    @submit="onChangeQuantity"
    :loading="submitLoading"
  >
    <template v-slot:title> 주식 추가하기 </template>
    <template v-slot:subtitle> Portfolio for {{ selectedAccount.accName }} </template>
  </StockMultiPickerModal>

  <StockDetailModal
    v-model="detailModalOpen"
    :ticker="selectedTicker"
    :onAfterSubmit="onUpdateStock"
  />
</template>
