<script setup>
import { calculateStockValueKRW, toKRW, toUSD } from '@/utils'
import { nextTick } from 'vue'
import { watch, ref } from 'vue'
import StockItemAvatar from '@/components/stocks/StockItemAvatar.vue'
import StockItemColumn from '@/components/stocks/StockItemColumn.vue'
import { FileApi } from '@/services'
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
  depositAmount: Number,
  type: {
    type: String,
    validator: (value) => {
      return value === 'portfolio' || value === 'default'
    },
    default: 'portfolio'
  },
  selected: Boolean,
  accountEditMode: Boolean
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
  escapePressed.value = true
  quantitySelected.value = false
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
  escapePressed.value = false
  quantitySelected.value = false
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
function getAvatarColor() {
  if (props.deposit === true) return props.account.accBgColorHex
  return props.stock.stockBgColorHex
}
function getAvatarIcon() {
  if (props.deposit === true) return props.account.accIconUrl
  else return props.stock.stockIconUrl
}
</script>
<template>
  <div
    type="stockitem-wrapper"
    class="px-2 mb-1 transition-colors rounded-lg relative cursor-pointer"
    :class="{ 'bg-neutral-200': selected }"
  >
    <div class="clickable-wrapper__overlay absolute top-0 left-0 rounded-lg w-full h-full" />
    <div
      class="clickable-inner-wrapper py-2 flex items-center"
      :class="type === 'default' ? 'clickable-inner-wrapper' : ''"
    >
      <v-row class="w-full">
        <v-col cols="1" class="flex items-center mr-4">
          <StockItemAvatar
            :color="getAvatarColor()"
            :icon-url="getAvatarIcon()"
            :selected="selected"
          />
        </v-col>
        <StockItemColumn>
          <template v-slot:title>
            {{ deposit ? '예수금' : stock.stockNameKor }}
          </template>
          <template v-slot:subtitle>
            {{ deposit ? account.accCurrency : stock.ticker }}
          </template>
        </StockItemColumn>

        <v-col
          v-if="type === 'portfolio'"
          cols="2"
          class="flex flex-col justify-center items-center"
        >
          <div v-if="!deposit">
            <v-btn
              v-if="!quantitySelected"
              :ripple="false"
              variant="text"
              type="button"
              width="80"
              @click="quantitySelected = true"
              :disabled="accountEditMode"
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

        <StockItemColumn
          v-if="type === 'portfolio'"
          cols="3"
          class="items-end"
          :text-color="stockPriceColor(stock)"
        >
          <template v-slot:title> {{ makePriceString(stock) }} </template>
          <template v-slot:subtitle>{{ props.weight }}%</template>
        </StockItemColumn>

        <StockItemColumn v-if="type === 'default'" cols="3" class="items-end">
          <template v-slot:title>
            {{ toKRW(stock.price, stock.stockCurrency).toLocaleString() }}원
          </template>
          <template v-slot:subtitle>
            ${{ toUSD(stock.price, stock.stockCurrency).toLocaleString() }}
          </template>
        </StockItemColumn>
      </v-row>
    </div>
  </div>
</template>

<style>
.clickable-wrapper__overlay:active {
  background-color: rgba(229, 229, 229, 0.6);
}
.clickable-wrapper__overlay:active + .clickable-inner-wrapper {
  transform: scale(0.97);
}
.clickable-inner-wrapper {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 250ms;
}
</style>
