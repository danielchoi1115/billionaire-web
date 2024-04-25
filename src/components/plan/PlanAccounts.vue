<script setup>
import { AccountSectionItem, StockMultiPickerModal } from '@/components'
import { ref } from 'vue'
import { usePlanStore } from '@/stores'
import { nextTick } from 'vue'
const planStore = usePlanStore()

const pickerModalOpen = ref(false)

function onAddClick(account) {
  selectedAccount.value = account
  pickerModalOpen.value = true
  nextTick(() => {
    stockMultiPickerModalRef.value.searchTextFieldRef.focus()
  })
}
const selectedAccount = ref({})

const submitLoading = ref(false)

const stockMultiPickerModalRef = ref(null)

function onSubmit(stockMap) {
  submitLoading.value = true
  let tickers = []
  stockMap.forEach((k, v) => tickers.push(v))
  planStore.insertStocks(selectedAccount.value, tickers)

  setTimeout(() => {
    submitLoading.value = false
    pickerModalOpen.value = false
    stockMultiPickerModalRef.value.clearAllInput()
  }, 1000)
}
</script>

<template>
  <AccountSectionItem
    v-for="(account, i) in planStore.accounts()"
    :key="i"
    :account="account"
    :onAddClick="onAddClick"
  />

  <StockMultiPickerModal
    ref="stockMultiPickerModalRef"
    v-model="pickerModalOpen"
    @submit="onSubmit"
    :loading="submitLoading"
  >
    <template v-slot:title> 주식 추가하기 </template>
    <template v-slot:subtitle> Portfolio for {{ selectedAccount.accName }} </template>
  </StockMultiPickerModal>
</template>
