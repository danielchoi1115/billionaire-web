<script setup>
import { calculateStockValueKRW } from '@/utils'
import { nextTick } from 'vue'
import { watch, ref } from 'vue'
import StockItemAvatar from '@/components/stocks/StockItemAvatar.vue'
import StockItemColumn from '@/components/stocks/StockItemColumn.vue'
const props = defineProps({
  stock: Object,
  weight: Number
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
  if (!escapePressed.value && e.target.value.trim().length > 0 && !isNaN(Number(e.target.value))) {
    let newStock = Object.assign({}, props.stock)
    newStock.quantity = e.target.value
    emits('update:quantity', newStock)
  }
  nextTick(() => {
    escapePressed.value = false
    quantitySelected.value = false
  })
}
</script>
<template>
  <div class="px-2 my-2 transition-colors rounded-lg">
    <div class="py-3 transition-transform flex items-center">
      <v-row class="w-full">
        <StockItemAvatar :color="stock.stockBgColorHex" :icon-url="stock.stockIconUrl" />
        <StockItemColumn>
          <template v-slot:title>
            {{ stock.stockNameKor }}
          </template>
          <template v-slot:subtitle>
            {{ stock.ticker }}
          </template>
        </StockItemColumn>
        <StockItemColumn cols="3">
          <template v-slot:title> {{ calculateStockValueKRW(stock).toLocaleString() }}원 </template>
          <template v-slot:subtitle>{{ props.weight }}%</template>
        </StockItemColumn>
        <v-col cols="2" class="flex flex-col justify-center items-center">
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
              variant="outlined"
              density="compact"
              hide-details
              style="width: 80px"
              :placeholder="stock.quantity.toString()"
              :persistent-placeholder="true"
              @keydown.enter="submitQuantity"
              @keydown.escape="resetQuantity"
              @blur="submitQuantity"
              suffix="주"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
