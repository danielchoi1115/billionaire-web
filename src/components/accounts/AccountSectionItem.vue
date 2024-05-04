<script setup>
import { StockAddButton, StockItem, StockMultiPickerModal } from '@/components'
import { ref, computed, reactive, watch, nextTick } from 'vue'
import { calculateStockValueKRW, Formatter, getAssetType } from '@/utils'
import { storeToRefs } from 'pinia'
import { useStockStore, usePortfolioStore } from '@/stores'
import { useToast } from 'vue-toastification'
import { PortfolioApi } from '@/services/index.js'
import { HttpStatus } from '@/utils/index.js'

const props = defineProps({
  account: Object,
  plan: Boolean,
  onAddClick: Function,
  onStockClick: Function,
  autoSort: Boolean,
  onAccountEditClick: Function
})

const emits = defineEmits(['update:account'])

const portfolioStore = usePortfolioStore()
const { portfolioData } = storeToRefs(portfolioStore)
const toast = useToast()
const accountEditMode = ref(false)
const selected = ref(new Set())
const budgetAmountSelected = ref(false)
const budgetAmountTextField = ref(null)
const budgetAmountEdited = ref()
const escapePressed = ref(false)
const loading = reactive({
  delete: false
})

const totalStockPrice = computed(() => calculateTotalStockPrice(props.account))
const weights = computed(() =>
  props.account.stocks?.reduce((acc, cur) => {
    acc[cur.ticker] = weightFrom(calculateStockValueKRW(cur), props.account.budgetAmount)
    return acc
  }, {})
)
const sortedStocks = computed(() => {
  if (!props.autoSort) {
    return props.account.stocks
  }
  return [...props.account.stocks]?.sort(
    (a, b) => calculateStockValueKRW(b) - calculateStockValueKRW(a)
  )
})

function calculateTotalStockPrice(account) {
  return account?.stocks.reduce((acc, cur) => acc + calculateStockValueKRW(cur), 0)
}

const handleStockClick = (event, stock) => {
  if (!accountEditMode.value) {
    if (event.target.getAttribute('type') === 'stockitem-wrapper') {
      props.onStockClick(stock)
    }
    return
  }

  if (isSelected(stock.ticker)) {
    deselect(stock.ticker)
  } else {
    selected.value.add(stock.ticker)
  }
}

const isSelected = (ticker) => selected.value.has(ticker)

const deselect = (ticker) => {
  selected.value.delete(ticker)
}

const setStockEditMode = (val) => (accountEditMode.value = val)
const discardStockSelections = () => {
  selected.value = new Set()
  setStockEditMode(false)
}

const onDeletePortfolioStock = async () => {
  loading.delete = true
  let result = await portfolioStore.deletePortfolioStocks(props.account, Array.from(selected.value))
  if (result) {
    toast.success('성공적으로 삭제했습니다.', {
      timeout: 2000
    })
    await portfolioStore.refresh()
  } else {
    toast.success('삭제에 실패하였습니다.', {
      timeout: 2000
    })
  }
  loading.delete = false
  accountEditMode.value = false
}

function weightFrom(numerator, denominator) {
  return Math.round((numerator / denominator) * 10000) / 100
}

const updateQuantity = (oldObj, newObj) => {
  const result = portfolioStore.updatePortfolioStock(props.account, newObj)
  if (result) {
    Object.assign(oldObj, newObj)
  } else {
    console.error('Could not update Quantity for stock', oldObj)
  }
}
function addClicked() {
  if (accountEditMode.value) {
    return
  }
  props.onAddClick(props.account)
}

watch(budgetAmountSelected, (val) => {
  if (val) {
    nextTick(() => {
      budgetAmountTextField.value?.focus()
    })
  }
})

function resetBudgetAmount() {
  escapePressed.value = true
  budgetAmountSelected.value = false
  budgetAmountEdited.value = null
}

async function submitBudgetAmount() {
  if (!escapePressed.value && budgetAmountEdited.value && budgetAmountEdited.value >= 0) {
    let data = {
      portfolioNo: portfolioData.value.portfolioNo,
      accNo: props.account.accNo,
      budgetAmount: Math.round(budgetAmountEdited.value)
    }
    const result = await PortfolioApi.updatePortfolioAccount(data)
    if (result.status === HttpStatus.OK) {
      await portfolioStore.refresh()
      budgetAmountEdited.value = null
    } else {
      console.error('Failed to update Budget Amount.', result)
    }
  }
  escapePressed.value = false
  budgetAmountSelected.value = false
}
</script>
<template>
  <dl class="my-4">
    <dt class="flex align-baseline justify-between mb-4 w-full">
      <div class="flex justify-between items-start w-full overflow-visible">
        <div v-if="props.plan" class="h-14">
          <v-btn v-if="!budgetAmountSelected" @click="budgetAmountSelected = true" variant="text">
            <span class="text-lg font-semibold" density="compact">
              {{ account.budgetAmount?.toLocaleString() }}원
            </span>
          </v-btn>
          <div v-if="budgetAmountSelected">
            <v-text-field
              ref="budgetAmountTextField"
              v-model="budgetAmountEdited"
              variant="outlined"
              density="compact"
              type="number"
              hide-spin-buttons
              style="width: 150px"
              :placeholder="account.budgetAmount?.toLocaleString()"
              :persistent-placeholder="true"
              @keydown.enter="$event.target.blur()"
              @keydown.escape="resetBudgetAmount"
              @blur="submitBudgetAmount"
              suffix="원"
              :hint="Formatter.readableMoney(budgetAmountEdited)"
              persistent-hint
            />
          </div>
        </div>
        <div v-if="!accountEditMode">
          <v-btn variant="plain" @click="onAccountEditClick"> 계좌수정</v-btn>
          <v-btn @click="setStockEditMode(true)" variant="plain"> 주식삭제 </v-btn>
        </div>
        <div v-if="accountEditMode">
          <v-btn
            width="80"
            class="mr-2"
            variant="tonal"
            color="grey-9"
            @click="discardStockSelections"
          >
            취소
          </v-btn>
          <v-btn
            width="80"
            variant="flat"
            color="red"
            @click="onDeletePortfolioStock"
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
        @click="(e) => handleStockClick(e, stock)"
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
