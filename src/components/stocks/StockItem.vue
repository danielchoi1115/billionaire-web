<script setup>
import { calculateStockValueKRW } from '@/utils'
import { nextTick } from 'vue'
import { watch, ref } from 'vue'
import StockItemAvatar from '@/components/stocks/StockItemAvatar.vue'
import StockItemColumn from '@/components/stocks/StockItemColumn.vue'
const props = defineProps({
  stock: {
    type: Object,
    default: () => ({})
  },
  weight: Number,
  deposit: {
    type: Boolean,
    default: false
  },
  account: Object,
  depositAmount: Number
})
const emits = defineEmits(['update:quantity'])

const quantitySelected = ref(false)

const quantityTextField = ref(null)
const escapePressed = ref(false)

watch(quantitySelected, (val) => {
  if (val) {
    nextTick(() => {
      quantityTextField.value?.focus()
    })
  }
})

function resetQuantity() {
  nextTick(() => {
    escapePressed.value = true
    quantitySelected.value = false
  })
}

function submitQuantity(e) {
  // escape 눌렀을 때 무시
  // 입력값이 없거나, 숫자가 아닐경우 무시
  // console.log(quantityTextField.value.valid)
  if (
    !escapePressed.value &&
    e.target.value.trim().length > 0 &&
    !isNaN(Number(e.target.value)) &&
    Number(e.target.value) >= 0
  ) {
    let newStock = Object.assign({}, props.stock)
    newStock.quantity = e.target.value
    emits('update:quantity', newStock)
  }
  nextTick(() => {
    escapePressed.value = false
    quantitySelected.value = false
  })
}
const rules = {
  nonNegative: (value) => Number(value) >= 0 || ''
}

function makePriceString(stock) {
  if (props.deposit) {
    if (props.depositAmount < 0) {
      return '(' + props.depositAmount.toLocaleString() + '원)'
    } else return props.depositAmount.toLocaleString() + '원'
  }
  if (stock.quantity < 0) {
    return '(' + calculateStockValueKRW(stock).toLocaleString() + '원)'
  }
  return calculateStockValueKRW(stock).toLocaleString() + '원'
}
function stockPriceColor(stock) {
  if ((props.deposit && props.depositAmount < 0) || stock.quantity < 0) return 'text-red-600'
  return 'text-neutral-700'
}
</script>
<template>
  <div class="px-2 my-2 transition-colors rounded-lg">
    <div class="py-3 transition-transform flex items-center">
      <v-row class="w-full">
        <StockItemAvatar
          :color="deposit ? account.accBgColorHex : stock.stockBgColorHex"
          :icon-url="deposit ? account.accIconUrl : stock.stockIconUrl"
        />
        <StockItemColumn>
          <template v-slot:title>
            {{ deposit ? '예수금' : stock.stockNameKor }}
          </template>
          <template v-slot:subtitle>
            {{ deposit ? account.accCurrency : stock.ticker }}
          </template>
        </StockItemColumn>

        <v-col cols="2" class="flex flex-col justify-center items-center">
          <div v-if="!deposit">
            <v-btn
              v-if="!quantitySelected"
              :ripple="false"
              variant="text"
              type="button"
              width="80"
              @click="quantitySelected = true"
            >
              <div class="text-base font-semibold text-neutral-700 flex gap-1 leading-6">
                {{ stock.quantity }}주
              </div>
            </v-btn>
            <div v-if="quantitySelected">
              <v-text-field
                ref="quantityTextField"
                :rules="[rules.nonNegative]"
                variant="outlined"
                density="compact"
                hide-details
                style="width: 80px"
                :placeholder="stock.quantity.toString()"
                :persistent-placeholder="true"
                @keydown.enter="$event.target.blur()"
                @keydown.escape="resetQuantity"
                @blur="submitQuantity"
                suffix="주"
              />
            </div>
          </div>
        </v-col>

        <StockItemColumn cols="3" class="items-end" :text-color="stockPriceColor(stock)">
          <template v-slot:title> {{ makePriceString(stock) }} </template>
          <template v-slot:subtitle>{{ props.weight }}%</template>
        </StockItemColumn>
      </v-row>
    </div>
  </div>
</template>
