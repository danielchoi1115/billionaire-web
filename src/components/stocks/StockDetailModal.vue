<script setup>
import { StockItemAvatar } from '@/components'

import { onMounted, reactive, ref, watch } from 'vue'
import { StockApi } from '@/services'
import { imgBaseUrl } from '@/utils/index.js'
import { useCommonStore } from '@/stores'

const props = defineProps({
  modelValue: Boolean,
  stock: Object
})
const commonStore = useCommonStore()

const emit = defineEmits(['update:modelValue', 'update:stock'])
const edited = ref(false)
const editedStock = ref({})
watch(
  () => props.stock,
  (newVal) => {
    Object.assign(editedStock.value, newVal)
    select.assetClass = { code: props.stock.assetClassCd, name: props.stock.assetClassName }
    select.assetCountry = { code: props.stock.assetCountryCd, name: props.stock.assetCountryName }
    select.currency = {
      code: props.stock.stockCurrency,
      name: commonStore.getCurrency(props.stock.stockCurrency)
    }
  }
)

function handleModalClose(e) {
  if (edited.value) {
    alert('수정했지롱')
    return
  }
  Object.assign(editedStock.value, props.stock)
  emit('update:modelValue', e)
}

async function update() {
  console.log('API Call', editedStock.value)
  let res = await StockApi.update(editedStock.value)
  if (res.status === 200) {
    Object.assign(props.stock, editedStock.value)
  } else {
    console.error('Could not update resource')
  }
}
function getAvatarColor() {
  if (props.deposit === true) return props.account.accBgColorHex
  return props.stock.stockBgColorHex || '#798599'
}
function getAvatarIcon() {
  if (props.deposit === true) return props.account.accIconUrl
  return props.stock.stockIconUrl || 'default-logo.png'
}
const select = reactive({
  assetClass: {},
  assetCountry: {},
  currency: {}
})
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="handleModalClose"
    transition="tab-transition"
    max-width="720"
  >
    <v-card>
      <template v-slot:title>
        <div class="flex items-center gap-4">
          <v-avatar :color="getAvatarColor()" size="52">
            <figure class="w-12 h-12 flex justify-center items-center">
              <img
                :src="imgBaseUrl + getAvatarIcon()"
                alt="아바타 이미지"
                class="object-contain w-auto h-6 object-center"
                draggable="false"
              />
            </figure>
          </v-avatar>
          <div>
            <div>
              <span class="mr-2">{{ stock.stockNameKor }}</span>
              <span class="text-neutral-500">{{ stock.stockNameEng }}</span>
            </div>
            <div class="text-sm text-neutral-400 font-normal">{{ stock.ticker }}</div>
          </div>
        </div>
      </template>
      <v-card-text>
        <v-list>
          <div class="">
            <v-text-field variant="outlined" v-model="editedStock.ticker" label="ticker" />
            <v-text-field variant="outlined" v-model="editedStock.kisCd" label="KisCd" />
            <v-text-field variant="outlined" v-model="editedStock.stockNameKor" label="한글명" />
            <v-text-field variant="outlined" v-model="editedStock.stockNameEng" label="영문명" />
            <v-text-field variant="outlined" v-model="editedStock.stockCurrency" label="통화" />

            <v-select
              v-model="select.assetClass"
              :items="commonStore.assetClass()"
              item-title="name"
              item-value="code"
              label="Select"
              persistent-hint
              return-object
              single-line
              variant="outlined"
            />
            <v-select
              v-model="select.assetCountry"
              :items="commonStore.assetCountry()"
              item-title="name"
              item-value="code"
              label="Select"
              persistent-hint
              return-object
              single-line
              variant="outlined"
            /><v-select
              v-model="select.currency"
              :items="commonStore.currency()"
              item-title="name"
              item-value="code"
              label="Select"
              persistent-hint
              return-object
              single-line
              variant="outlined"
            />
            <v-divider></v-divider>
            <!-- <v-list-subheader>User Controls</v-list-subheader> -->

            <v-text-field
              variant="outlined"
              v-model="editedStock.stockBgColorHex"
              label="stockBgColorHex"
            />
            <v-text-field
              variant="outlined"
              v-model="editedStock.stockIconUrl"
              label="stockIconUrl"
            />
            <v-text-field variant="outlined" v-model="editedStock.secTypeCd" label="secTypeCd" />

            <v-checkbox v-model="edited" label="edited"></v-checkbox>
          </div>
        </v-list>
      </v-card-text>
      <v-card-actions> <v-btn block @click="update">Save Ticker</v-btn> </v-card-actions>
    </v-card>
  </v-dialog>
</template>
