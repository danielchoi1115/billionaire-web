<script setup>
import { toUSD, toKRW } from '@/utils'
import { nextTick } from 'vue'
import { watch, ref } from 'vue'
const props = defineProps({
  stock: Object,
  weight: Number
})
const quantity = ref(props.stock.quantity)
const quantitySelected = ref(false)
const imgBaseUrl = 'src/assets/company-logos/'

const quantityTextField = ref(null)
watch(quantitySelected, (val) => {
  if (val) {
    nextTick(() => {
      quantityTextField.value?.focus()
    })
  }
})
</script>
<template>
  <div class="px-2 my-2 transition-colors rounded-lg">
    <div class="py-3 transition-transform flex items-center">
      <v-row>
        <v-col cols="1" class="flex items-end mr-4">
          <v-avatar :color="stock.bgColorHex" size="40">
            <figure class="w-8 h-8">
              <img :src="imgBaseUrl + stock.iconUrl" alt="아바타 이미지" class="rounded-full" />
            </figure>
          </v-avatar>
        </v-col>
        <v-col cols="6" class="flex flex-col justify-end">
          <div class="text-lg font-semibold text-neutral-700 flex gap-1 leading-6">
            <!-- <span>{{ toKRW(stock.price, stock.currency)?.toLocaleString('ko-KR') }}원</span>
          <span>(${{ toUSD(stock.price, stock.currency)?.toLocaleString('ko-KR') }})</span> -->
            {{ stock.displayName }}
          </div>
          <div class="text-sm text-neutral-500">
            <!-- {{ stock.displayName }} -->
            <span v-if="stock.market !== 'KRX1'">{{ stock.ticker }}</span>
          </div>
        </v-col>
        <v-col class="flex flex-col justify-end">
          <div class="text-lg font-semibold text-neutral-700 flex gap-1 leading-6">
            {{ props.weight }}%
          </div>
          <div class="text-sm text-neutral-500">
            {{ toKRW(stock.price, stock.currency)?.toLocaleString('ko-KR') }}원
          </div>
        </v-col>
        <v-col cols="2" class="flex flex-col justify-center">
          <v-btn
            v-if="!quantitySelected"
            :ripple="false"
            variant="text"
            type="button"
            @click="quantitySelected = true"
          >
            <div class="text-lg font-semibold text-neutral-700 flex gap-1 leading-6">
              {{ stock.quantity }}주
            </div>
          </v-btn>
          <div v-if="quantitySelected">
            <v-text-field
              ref="quantityTextField"
              variant="outlined"
              density="compact"
              hide-details
              v-model="quantity"
              @keydown.escape="quantitySelected = false"
              @blur="quantitySelected = false"
            >
            </v-text-field>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
