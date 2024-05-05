<script setup>
import { StockItemAvatar } from '@/components'

import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { StockApi } from '@/services'
import { HttpStatus, imgBaseUrl, StockUtil } from '@/utils/index.js'
import { useCommonStore, useUserStore } from '@/stores'
import { useToast } from 'vue-toastification'
import TextFieldTitle from '@/components/stocks/TextFieldTitle.vue'
import fileApi from '@/services/fileApi.js'
import AvatarEditorDialog from '@/components/commons/AvatarEditorDialog.vue'

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
const emit = defineEmits(['update:modelValue'])
const edited = ref(false)
const editedStock = ref({})
const toast = useToast()
const stockLoading = ref(false)
const submitLoading = ref(false)
const loadedStock = ref({})

watch(
  () => props.modelValue,
  async (newVal, oldVal) => {
    if (oldVal && !newVal) return
    await loadStock(props.ticker)
    resetStockInfo()
  }
)

function resetStockInfo() {
  Object.assign(editedStock.value, loadedStock.value)
  select.assetClass = {
    code: loadedStock.value.assetClassCd,
    name: loadedStock.value.assetClassName
  }
  select.assetCountry = {
    code: loadedStock.value.assetCountryCd,
    name: loadedStock.value.assetCountryName
  }
  select.currency = {
    code: loadedStock.value.stockCurrency,
    name: commonStore.getCurrency(loadedStock.value.stockCurrency)
  }
}

async function loadStock(ticker) {
  stockLoading.value = true
  let stockRes = await StockApi.getByTicker(ticker)
  stockLoading.value = false

  if (stockRes.status === 200) {
    loadedStock.value = stockRes.data
  } else {
    console.error('fn:loadStock,  Failed to load Stock.')
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
  editedStock.value.stockCurrency = select.currency.code
  editedStock.value.assetCountryCd = select.assetCountry.code
  const userNo = userStore.getUserNo()
  if (!userNo) {
    console.error('StockDetailModal: You must be logged in, userNo not found. userNo: ', userNo)
    toast.error('You must be logged in')
    return
  }
  editedStock.value.modifiedBy = userNo
  submitLoading.value = true
  let res = await StockApi.update(editedStock.value)
  submitLoading.value = false
  if (res.status === HttpStatus.OK) {
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
const show = reactive({
  avatar: false
})
function onAvatarClicked() {
  select.avatarColor = loadedStock.value.stockBgColorHex
  show.avatar = true
}

function formatSubtitle(ticker, engName) {
  return ticker + (engName ? ' - ' + engName : '')
}

function onAvatarSubmit(val) {
  editedStock.value.stockBgColorHex = val.bgColorHex
  editedStock.value.stockIconUrl = val.iconUrl
  show.avatar = false
}
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="handleModalClose"
    transition="tab-transition"
    max-width="800"
  >
    <v-card color="#f2f2f2">
      <template v-slot:append>
        <v-btn
          @click="() => handleModalClose(false)"
          icon="mdi-close"
          variant="plain"
          density="comfortable"
        />
      </template>
      <template v-slot:title>
        <div class="flex mb-4 justify-between w-full">
          <!--          <v-skeleton-loader-->
          <!--            color="transparent"-->
          <!--            :loading="stockLoading"-->
          <!--            class="mx-auto w-full"-->
          <!--            type="avatar, sentences"-->
          <!--          >-->
          <div class="flex items-center gap-4">
            <StockItemAvatar
              :color="editedStock.stockBgColorHex"
              :icon-url="editedStock.stockIconUrl"
              :size="52"
              :showEdit="true"
              :onEditClicked="onAvatarClicked"
            />

            <div>
              <div class="">
                <span class="mr-2">{{ loadedStock.stockNameKor }}</span>
                <span class="text-neutral-500 text-sm">{{ loadedStock.stockNameEng }}</span>
              </div>
              <div class="text-sm text-neutral-400 font-normal">
                {{ loadedStock.ticker }}
              </div>
            </div>
          </div>
          <!--          </v-skeleton-loader>-->
        </div>
      </template>

      <template v-slot:default>
        <v-card-text class="bg-white mx-2 rounded h-[70dvh] px-4 overflow-y-auto">
          <div class="">
            <!--            <v-text-field-->
            <!--              variant="outlined"-->
            <!--              v-model="editedStock.ticker"-->
            <!--              label="ticker"-->
            <!--              density="comfortable"-->
            <!--              readonly-->
            <!--              hide-details-->
            <!--            />-->
            <div class="my-4">
              <TextFieldTitle title="한글명" />
              <v-text-field
                variant="outlined"
                v-model="editedStock.stockNameKor"
                density="comfortable"
                hide-details
              />
            </div>
            <div class="my-4">
              <TextFieldTitle title="영문명" />
              <v-text-field
                bg-color="white"
                variant="outlined"
                v-model="editedStock.stockNameEng"
                density="comfortable"
                hide-details
              />
            </div>
            <v-divider :thickness="1" class="border-neutral-200 border-opacity-100 rounded mx-2" />

            <div class="flex gap-4 my-4">
              <div class="grow">
                <TextFieldTitle title="국가" />
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
                  density="comfortable"
                  hide-details
                  :list-props="{ maxHeight: '30vh' }"
                />
              </div>
              <div class="grow">
                <TextFieldTitle title="자산유형" />
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
                  density="comfortable"
                  hide-details
                  :list-props="{ maxHeight: '30vh' }"
                />
              </div>
              <div class="grow">
                <TextFieldTitle title="통화" />
                <v-select
                  v-model="select.currency"
                  :items="commonStore.currency()"
                  item-title="name"
                  item-value="code"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  :list-props="{ maxHeight: '30vh' }"
                />
              </div>
            </div>

            <div class="flex gap-4 my-4">
              <div class="grow">
                <TextFieldTitle title="KIS 표준코드" />
                <v-text-field
                  variant="outlined"
                  v-model="editedStock.kisCd"
                  density="comfortable"
                  hide-details
                />
              </div>
              <div class="grow">
                <TextFieldTitle title="KIS 자산타입코드" />
                <v-text-field
                  variant="outlined"
                  v-model="editedStock.secTypeCd"
                  density="comfortable"
                  hide-details
                />
              </div>
            </div>
            <v-divider :thickness="1" class="border-neutral-200 border-opacity-100 rounded mx-2" />

            <v-checkbox v-model="edited" label="edited"></v-checkbox>
          </div>
        </v-card-text>
      </template>

      <template v-slot:actions>
        <div class="flex gap-2 w-full">
          <v-btn
            @click="onSubmit"
            :loading="submitLoading"
            class="grow"
            height="48"
            color="blue"
            variant="flat"
          >
            변경사항 저장
          </v-btn>
          <v-btn @click="() => handleModalClose(false)" class="grow" height="48"> 취소 </v-btn>
        </div>
      </template>
    </v-card>
    <AvatarEditorDialog
      :model-value="show.avatar"
      :icon-url="editedStock.stockIconUrl"
      :color="editedStock.stockBgColorHex"
      @update:model-value="(e) => (show.avatar = e)"
      @submit="onAvatarSubmit"
    />
  </v-dialog>
</template>
