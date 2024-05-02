<script setup>
import { StockItemAvatar } from '@/components'

import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { StockApi } from '@/services'
import { imgBaseUrl, StockUtil } from '@/utils/index.js'
import { useCommonStore, useUserStore } from '@/stores'
import { useToast } from 'vue-toastification'
import TextFieldTitle from '@/components/stocks/TextFieldTitle.vue'
import fileApi from '@/services/fileApi.js'

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
const avatarColorPickerActivator = ref(false)
const avatarProfileUploaderActivator = ref(false)
const profileUploadFile = ref(null)
const stockIconUrlLists = ref([])

watch(
  () => props.modelValue,
  async (newVal, oldVal) => {
    if (oldVal && !newVal) return
    await loadStock(props.ticker)
    resetStockInfo()
    resetAvatar()
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
function resetAvatar() {
  select.bgColorHex = editedStock.value.stockBgColorHex
  select.iconUrl = editedStock.value.stockIconUrl
}

async function loadStock(ticker) {
  stockLoading.value = true
  let stockRes = await StockApi.getByTicker(ticker)
  let iconRes = await fileApi.getAll()
  stockLoading.value = false

  if (stockRes.status === 200) {
    loadedStock.value = stockRes.data
  } else {
    console.error('fn:loadStock,  Failed to load Stock.')
  }
  if (iconRes.status === 200) {
    stockIconUrlLists.value = iconRes.data?.files
  } else {
    console.error('fn:loadStock,  Failed to load Icons.')
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
  submitLoading.value = true
  let res = await StockApi.update(editedStock.value)
  submitLoading.value = false
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
  currency: { code: '', name: '' },
  avatarColor: ''
})

const avatarPickerDialogOpen = ref(false)
function onAvatarClicked() {
  select.avatarColor = loadedStock.stockBgColorHex
  avatarPickerDialogOpen.value = true
}

function handleAvatarDialogClosed(val) {
  if (!val) {
    avatarPickerDialogOpen.value = false
    resetAvatar()
  }
}

function formatSubtitle(ticker, engName) {
  return ticker + (engName ? ' - ' + engName : '')
}

function onAvatarSubmit() {
  editedStock.value.stockBgColorHex = select.bgColorHex
  editedStock.value.stockIconUrl = select.iconUrl
  avatarPickerDialogOpen.value = false
}
function iconOnClick(item) {
  select.iconUrl = item.value
  item.onClick()
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
        <v-btn @click="handleModalClose" icon="mdi-close" variant="plain" density="comfortable" />
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
        <v-card-text class="bg-white mx-2 rounded h-[60dvh] px-4 overflow-y-auto">
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

            <div class="flex gap-4 my-4">
              <div class="grow">
                <TextFieldTitle title="유형" />
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
                />
              </div>
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
                />
              </div>
            </div>

            <v-divider :thickness="1" class="border-neutral-200 border-opacity-100 rounded mx-2" />

            <v-checkbox v-model="edited" label="edited"></v-checkbox>
          </div>
        </v-card-text>
      </template>

      <template v-slot:actions>
        <v-btn
          @click="onSubmit"
          :loading="submitLoading"
          class="grow-[2]"
          height="48"
          color="blue"
          variant="flat"
        >
          변경사항 저장
        </v-btn>
        <v-btn @click="handleModalClose" class="grow-[1]" height="48"> 취소 </v-btn>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="avatarPickerDialogOpen"
    transition="tab-transition"
    max-width="480"
    @update:modelValue="handleAvatarDialogClosed"
  >
    <v-card color="#f2f2f2">
      <v-card-item class="bg-white mx-2 rounded mt-2">
        <div class="flex items-center justify-center">
          <StockItemAvatar
            :color="select.bgColorHex"
            :icon-url="select.iconUrl"
            :size="120"
            :clickable="false"
            :onEditClicked="onAvatarClicked"
          />
        </div>

        <div class="flex flex-col gap-4 my-4">
          <div>
            <TextFieldTitle title="주식 로고" />
            <div class="flex gap-2 mb-2">
              <v-autocomplete
                variant="outlined"
                v-model="select.iconUrl"
                density="comfortable"
                hide-details
                :items="stockIconUrlLists"
                item-value="iconUrl"
                no-data-text="결과를 찾을 수 없습니다."
                transition="fade-transition"
              >
                <template v-slot:item="{ props: item }">
                  <v-list-item v-bind="props" @click="iconOnClick(item)">
                    <template v-slot:prepend>
                      <StockItemAvatar :icon-url="item.value" color="#494A50" :clickable="false" />
                    </template>
                    <div class="ml-2">{{ item.value }}</div>
                  </v-list-item>
                </template>
              </v-autocomplete>
              <v-btn
                @click="avatarProfileUploaderActivator = !avatarProfileUploaderActivator"
                variant="tonal"
                size="sm"
              >
                <v-icon icon="mdi-upload" size="24" class="px-6" />
              </v-btn>
            </div>
            <v-expand-transition>
              <v-file-input
                v-if="avatarProfileUploaderActivator"
                v-model="profileUploadFile"
                label="클릭해서 로고 업로드하기"
                density="comfortable"
                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                counter
                show-size
                chips
                prepend-icon=""
                prepend-inner-icon="mdi-file-image"
                variant="outlined"
                single-line
                hide-details
              />
            </v-expand-transition>
          </div>
          <div>
            <TextFieldTitle title="주식 배경색" />
            <div class="flex gap-2">
              <v-text-field
                variant="outlined"
                v-model="select.bgColorHex"
                density="comfortable"
                hide-details
              />
              <v-menu
                v-model="avatarColorPickerActivator"
                :close-on-content-click="false"
                location="bottom right"
                offset="4"
              >
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps" variant="tonal" size="sm">
                    <v-icon icon="mdi-palette" size="24" class="px-6" />
                  </v-btn>
                </template>
                <v-color-picker v-model="select.bgColorHex" mode="hex" />
              </v-menu>
            </div>
          </div>
        </div>
        <!--          <v-color-picker v-model="select.bgColorHex" mode="hex" hide-inputs />-->
      </v-card-item>
      <template v-slot:actions>
        <v-btn
          @click="onAvatarSubmit"
          class="grow"
          color="blue"
          variant="flat"
          prepend-icon="mdi-check"
        >
          확인
        </v-btn>
        <v-btn @click="handleAvatarDialogClosed(false)" class="grow" prepend-icon="mdi-close"
          >취소
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
