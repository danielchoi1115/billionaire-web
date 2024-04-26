<script setup>
import { AccountSectionItem, StockMultiPickerModal } from '@/components'
import { ref } from 'vue'
import { usePlanStore } from '@/stores'
import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'

import { useToast } from 'vue-toastification'
const planStore = usePlanStore()
const { planData } = storeToRefs(planStore)
const pickerModalOpen = ref(false)
const toast = useToast()
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

async function onSubmit(stockMap) {
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
</script>

<template>
  <AccountSectionItem
    v-for="(account, i) in planData?.accounts"
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
