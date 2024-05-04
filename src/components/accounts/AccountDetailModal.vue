<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { Formatter, HttpStatus } from '@/utils/index.js'
import {
  AccountDetailModalLayout,
  AvatarEditorDialog,
  EditTextField,
  StockItemAvatar,
  TextFieldTitle
} from '@/components/index.js'
import { AccApi, PortfolioApi, StockApi } from '@/services/index.js'
import { usePortfolioStore, useUserStore } from '@/stores/index.js'
import { useToast } from 'vue-toastification'

import fileApi from '@/services/fileApi.js'
import { storeToRefs } from 'pinia'

const props = defineProps({
  modelValue: Boolean,
  edited: Boolean,
  accountNo: Number,
  onAfterSubmit: {
    type: Function,
    default: () => {}
  }
})

const emits = defineEmits(['update:modelValue', 'closeModal', 'submit'])
const userStore = useUserStore()
const toast = useToast()
const submitLoading = ref(false)
const stockIconUrlLists = ref([])
const portfolioStore = usePortfolioStore()
const { portfolioData } = storeToRefs(portfolioStore)

const loading = reactive({
  account: false,
  submit: false
})
const show = reactive({
  avatar: false
})
function handleModalClose(e) {
  // if (edited.value) {
  //   alert('수정했지롱')
  //   return
  // }
  Object.assign(accounts.edited, {})
  emits('update:modelValue', e)
}

const accounts = reactive({
  loaded: {},
  edited: {}
})

function resetEditedAccount() {
  if (!accounts.loaded?.accNo) return

  Object.assign(accounts.edited, accounts.loaded)
}

watch(
  () => props.accountNo,
  async () => {
    await loadAccount()
  }
)

async function onSubmit() {
  const userNo = userStore.getUserNo()
  if (!userNo) {
    console.error('AccountDetailModal: You must be logged in, userNo not found. userNo: ', userNo)
    toast.error('You must be logged in')
    return
  }
  accounts.edited.modifiedBy = userNo
  submitLoading.value = true

  let res = await AccApi.updateAccMstWithAccNo(accounts.edited)

  submitLoading.value = false
  if (res.status === HttpStatus.OK) {
    await props.onAfterSubmit()
    await loadAccount()
  } else {
    console.error('Could not update resource')
    toast.error('Failed to update stock')
  }
}

async function loadAccount() {
  loading.account = true
  // let stockRes = await StockApi.getByTicker(ticker)
  let data = {
    accNo: props.accountNo
  }
  let accRes = await AccApi.getAccMstWithAccNo(data)
  loading.account = false

  if (accRes.status === 200) {
    accounts.loaded = accRes.data
    resetEditedAccount()
  } else {
    console.error('AccountDetailModal, fn:loadAccount,  Failed to load Stock.')
    toast.error(`Account 로드 실패. accNo: ${data.accNo}`)
  }
}

function onAvatarClicked() {
  show.avatar = true
}

function onAvatarSubmit(val) {
  accounts.edited.accBgColorHex = val.bgColorHex
  accounts.edited.accIconUrl = val.iconUrl
}
</script>
<template>
  <v-dialog max-width="600" :model-value="modelValue" @update:model-value="handleModalClose">
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
          <div class="flex items-center gap-4">
            <StockItemAvatar
              :color="accounts.edited.accBgColorHex"
              :icon-url="accounts.edited.accIconUrl"
              :size="52"
              :showEdit="true"
              :onEditClicked="onAvatarClicked"
            />

            <div>
              <div class="">
                <span class="mr-2">{{ accounts.loaded.accName }}</span>
                <!-- <span class="text-neutral-500 text-sm">{{ account.accIssuer }}</span> -->
              </div>
              <div class="text-sm text-neutral-400 font-normal">
                {{ accounts.loaded.accIssuer }}
              </div>
            </div>
          </div>
          <!--          </v-skeleton-loader>-->
        </div>
      </template>
      <v-card-text class="bg-white mx-2 rounded px-4 overflow-y-auto">
        <!--        <v-divider :thickness="1" class="border-neutral-200 border-opacity-100 rounded mx-2" />-->

        <AccountDetailModalLayout>
          <template v-slot:userNo>
            <EditTextField title="소유주 번호" v-model="accounts.edited.userNo" readonly />
          </template>
          <template v-slot:accNo>
            <EditTextField title="계좌 순번" v-model="accounts.edited.accNo" readonly />
          </template>
          <template v-slot:accName>
            <EditTextField title="계좌 이름" v-model="accounts.edited.accName" />
          </template>
          <template v-slot:accIssuer>
            <EditTextField title="기관명" v-model="accounts.edited.accIssuer" />
          </template>
          <template v-slot:accCurrency>
            <EditTextField title="통화" v-model="accounts.edited.accCurrency"
          /></template>
        </AccountDetailModalLayout>

        <!--        <div class="my-4">-->
        <!--          <TextFieldTitle title="예산" />-->
        <!--          <v-text-field-->
        <!--            v-model="accounts.edited.budgetAmount"-->
        <!--            type="number"-->
        <!--            variant="outlined"-->
        <!--            density="comfortable"-->
        <!--            prefix="₩"-->
        <!--            :hint="Formatter.readableMoney(accounts.edited.budgetAmount)"-->
        <!--            persistent-hint-->
        <!--            hide-spin-buttons-->
        <!--          />-->
        <!--        </div>-->
      </v-card-text>

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
      :icon-url="accounts.edited.accIconUrl"
      :color="accounts.edited.accBgColorHex"
      @update:model-value="(e) => (show.avatar = e)"
      @submit="onAvatarSubmit"
    />
  </v-dialog>
</template>
