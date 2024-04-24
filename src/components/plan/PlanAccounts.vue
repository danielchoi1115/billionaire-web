<script setup>
import { AccountSectionItem, StockMultiPickerModal } from '@/components'
import { ref } from 'vue'
import { usePlanStore } from '@/stores'
const planStore = usePlanStore()

const pickerModalOpen = ref(false)

function onAddClick(account) {
  selectedAccount.value = account
  pickerModalOpen.value = true
}
const selectedAccount = ref(null)

function onSubmit(a) {
  console.log(selectedAccount.value)
  console.log(a)
}
</script>

<template>
  <AccountSectionItem
    v-for="(account, i) in planStore.accounts()"
    :key="i"
    :account="account"
    :onAddClick="onAddClick"
  />

  <StockMultiPickerModal v-model="pickerModalOpen" @submit="onSubmit">
    <template v-slot:title>
      <div>타이틀이다</div>
    </template>
  </StockMultiPickerModal>
</template>
