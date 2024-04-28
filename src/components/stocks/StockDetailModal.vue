<script setup>
import { StockItemAvatar } from '@/components'

import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { StockApi } from '@/services'
import { imgBaseUrl } from '@/utils/index.js'
import { useCommonStore, useUserStore } from '@/stores'
import { useToast } from 'vue-toastification'

const props = defineProps({
  modelValue: Boolean,
  ticker: String,
  onAfterSubmit: {
    type: Function,
    default: () => {}
  }
})
const commonStore = useCommonStore()
const userStore = useUserStore()
const emit = defineEmits(['update:modelValue', 'update:stock'])
const edited = ref(false)
const editedStock = ref({})
const toast = useToast()
const stockLoading = ref(false)
const submitLoading = ref(false)
const loadedStock = ref({})

watch(
  () => props.ticker,
  async (newVal) => {
    let result = await loadStock(newVal)
    loadedStock.value = result
    Object.assign(editedStock.value, result)
    select.assetClass = { code: result.assetClassCd, name: result.assetClassName }
    select.assetCountry = { code: result.assetCountryCd, name: result.assetCountryName }
    select.currency = {
      code: result.stockCurrency,
      name: commonStore.getCurrency(result.stockCurrency)
    }
  }
)
async function loadStock(ticker) {
  stockLoading.value = true
  let res = await StockApi.getByTicker(ticker)
  stockLoading.value = false

  if (res.status === 200) {
    return res.data
  } else {
    console.error('fn:loadStock,  Failed to load Stock.')
    return {}
  }
}
function handleModalClose(e) {
  if (edited.value) {
    alert('수정했지롱')
    return
  }
  Object.assign(editedStock.value, {})
  emit('update:modelValue', e)
}

async function onSubmit() {
  if (!editedStock.value) return

  editedStock.value.assetClassCd = select.assetClass.code
  editedStock.value.currency = select.currency.code
  editedStock.value.assetCountryCd = select.assetCountry.code
  const userNo = userStore.getUserNo()
  if (!userNo) {
    console.error('StockDetailModal: You must be logged in, userNo not found. userNo: ', userNo)
    toast.error('You must be logged in')
    return
  }

  editedStock.value.modifiedBy = userNo
  console.log(this, `stock update API Call`, editedStock.value)

  let res = await StockApi.update(editedStock.value)
  if (res.status === 200) {
    // Object.assign(props.stock, editedStock.value)
    await props.onAfterSubmit(editedStock.value)
  } else {
    console.error('Could not update resource')
    toast.error('Failed to update stock')
  }
}

const select = reactive({
  assetClass: { code: '', name: '' },
  assetCountry: { code: '', name: '' },
  currency: { code: '', name: '' }
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
        <v-skeleton-loader :loading="stockLoading" class="mx-auto" type="avatar, sentences">
          <div class="flex items-center gap-4">
            <StockItemAvatar
              :color="loadedStock.stockBgColorHex"
              :icon-url="loadedStock.stockIconUrl"
              :size="52"
            />
            <div>
              <div>
                <span class="mr-2">{{ loadedStock.stockNameKor }}</span>
                <span class="text-neutral-500">{{ loadedStock.stockNameEng }}</span>
              </div>
              <div class="text-sm text-neutral-400 font-normal">{{ loadedStock.ticker }}</div>
            </div>
          </div>
        </v-skeleton-loader>
      </template>

      <v-card-text>
        <v-list>
          <div class="">
            <v-text-field variant="outlined" v-model="editedStock.ticker" label="ticker" />
            <v-text-field variant="outlined" v-model="editedStock.kisCd" label="KisCd" />
            <v-text-field variant="outlined" v-model="editedStock.stockNameKor" label="한글명" />
            <v-text-field variant="outlined" v-model="editedStock.stockNameEng" label="영문명" />

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
      <v-card-actions>
        <v-btn block @click="onSubmit" :loading="submitLoading">Save Ticker</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
