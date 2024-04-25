<script setup>
import { StockAddButton, StockItem, StockMultiPickerModal } from '@/components'
import { ref, computed, reactive } from 'vue'
import { calculateStockValueKRW, getAssetType } from '@/utils'
import { storeToRefs } from 'pinia'
import { useStockStore, usePlanStore } from '@/stores'
import { useToast } from 'vue-toastification'

// https://github.com/Maronato/vue-toastification
const planStore = usePlanStore()
const toast = useToast()
const props = defineProps({
  account: Object,
  onAddClick: Function
})

const totalStockPrice = computed(() => calculateTotalStockPrice(props.account))

const weights = computed(() =>
  props.account.stocks?.reduce((acc, cur) => {
    acc[cur.ticker] = weightFrom(calculateStockValueKRW(cur), props.account.budgetAmount)
    return acc
  }, {})
)
const sortedStocks = computed(() =>
  [...props.account.stocks]?.sort((a, b) => calculateStockValueKRW(b) - calculateStockValueKRW(a))
)

function calculateTotalStockPrice(account) {
  return account?.stocks.reduce((acc, cur) => acc + calculateStockValueKRW(cur), 0)
}
const selected = ref(new Set())
const toggleOnEditMode = (ticker) => {
  if (!accountEditMode.value) return
  if (isSelected(ticker)) {
    deselect(ticker)
  } else {
    selected.value.add(ticker)
  }
}
const isSelected = (ticker) => selected.value.has(ticker)

const deselect = (ticker) => {
  selected.value.delete(ticker)
}
const accountEditMode = ref(false)
const newBudget = ref()
const setAccountEditMode = (val) => (accountEditMode.value = val)
const saveAccountChanges = () => {}
const discardAccountChanges = () => {
  selected.value = new Set()
  setAccountEditMode(false)
}
const loading = reactive({
  delete: false
})
const onDeletePlanStock = async (stock) => {
  console.log('onDelete', stock)
  loading.delete = true
  await planStore.deleteStocks(props.account, Array.from(selected.value))
  setTimeout(() => {
    loading.delete = false
    accountEditMode.value = false
    toast.success('삭제되었습니다', {
      timeout: 2000
    })
  }, 1000)
}

function weightFrom(numerator, denominator) {
  return Math.round((numerator / denominator) * 10000) / 100
}

const updateQuantity = (oldObj, newObj) => {
  Object.assign(oldObj, newObj)
  planStore.updatePlanStock(props.account, newObj)
}
function addClicked() {
  if (accountEditMode.value) {
    return
  }
  props.onAddClick(props.account)
}
</script>
<template>
  <dl class="my-4">
    <dt class="flex align-baseline justify-between mb-4 w-full">
      <div class="flex justify-between items-center w-full">
        <span class="text-xl font-bold mr-1">{{ account.accName }}</span>

        <div v-if="!accountEditMode">
          <v-btn
            @click="setAccountEditMode(true)"
            class="account-title"
            :ripple="false"
            variant="plain"
          >
            <template v-slot:append>
              <v-icon class="text-[#696868]" icon="mdi-pencil" />
            </template>
            수정하기
          </v-btn>
        </div>
        <div v-if="accountEditMode">
          <v-btn
            width="80"
            class="mr-2"
            variant="tonal"
            color="grey-9"
            @click="discardAccountChanges"
          >
            취소
          </v-btn>
          <v-btn
            width="80"
            variant="flat"
            color="red"
            @click="onDeletePlanStock"
            :disabled="selected.size === 0"
            :loading="loading.delete"
          >
            삭제
          </v-btn>
        </div>
      </div>
      <!-- <div class="text-sm text-neutral-700">{{ account.budgetAmount?.toLocaleString() }}원</div> -->
    </dt>
    <dd class="bg-[#f8faf7] px-2 py-2 rounded-md">
      <StockItem
        v-for="(stock, i) in sortedStocks"
        :key="i"
        :stock="stock"
        :weight="weights[stock?.ticker]"
        @update:quantity="(arg) => updateQuantity(stock, arg)"
        :accountEditMode="accountEditMode"
        @click="toggleOnEditMode(stock.ticker)"
        :selected="isSelected(stock.ticker)"
      />
      <StockItem
        :deposit="true"
        :account="account"
        :accountEditMode="accountEditMode"
        :deposit-amount="account.budgetAmount - totalStockPrice"
        :weight="weightFrom(account.budgetAmount - totalStockPrice, account.budgetAmount)"
      />
      <StockAddButton :disabled="accountEditMode" @click="addClicked" />
    </dd>
  </dl>
</template>

<style scoped>
.account-title > i {
  color: rgb(233 233 233);
}
.account-title:hover .v-btn__content > i {
  color: rgb(148, 148, 148);
}
</style>
