<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { Formatter, HttpStatus } from '@/utils'
import { StockItemAvatar } from '@/components'
import { PortfolioApi, StockApi } from '@/services'
import { usePortfolioStore, useUserStore } from '@/stores'
import { useToast } from 'vue-toastification'
import TextFieldTitle from '@/components/stocks/TextFieldTitle.vue'
import fileApi from '@/services/fileApi.js'
import { storeToRefs } from 'pinia'
import AvatarEditorDialog from '@/components/commons/AvatarEditorDialog.vue'

const props = defineProps({
  modelValue: Boolean,
  edited: Boolean,
  account: Object,
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
  Object.assign(editedAccount.value, {})
  emits('update:modelValue', e)
}

const editedAccount = ref({})

function resetEditedAccount() {
  if (!props.account?.accNo) return

  Object.assign(editedAccount.value, props.account)
}

watch(
  () => props.account,
  async () => {
    await loadAccount()
    resetEditedAccount()
  }
)

async function onSubmit() {
  const userNo = userStore.getUserNo()
  if (!userNo) {
    console.error('StockDetailModal: You must be logged in, userNo not found. userNo: ', userNo)
    toast.error('You must be logged in')
    return
  }
  editedAccount.value.modifiedBy = userNo
  submitLoading.value = true
  let data = {
    portfolioNo: portfolioData.value.portfolioNo,
    accNo: editedAccount.value.accNo,
    budgetAmount: editedAccount.value.budgetAmount
  }
  let res = await PortfolioApi.updateAccount(data)
  submitLoading.value = false
  if (res.status === HttpStatus.OK) {
    await props.onAfterSubmit()
  } else {
    console.error('Could not update resource')
    toast.error('Failed to update stock')
  }
}

async function loadAccount() {
  loading.account = true
  // let stockRes = await StockApi.getByTicker(ticker)
  loading.account = false
  //
  // if (stockRes.status === 200) {
  //   loadedStock.value = stockRes.data
  // } else {
  //   console.error('fn:loadStock,  Failed to load Stock.')
  // }
}

function onAvatarClicked() {
  show.avatar = true
}

function onAvatarSubmit(val) {
  editedAccount.value.accBgColorHex = val.bgColorHex
  editedAccount.value.accIconUrl = val.iconUrl
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
              :color="editedAccount.accBgColorHex"
              :icon-url="editedAccount.accIconUrl"
              :size="52"
              :showEdit="true"
              :onEditClicked="onAvatarClicked"
            />

            <div>
              <div class="">
                <span class="mr-2">{{ account.accName }}</span>
                <!-- <span class="text-neutral-500 text-sm">{{ account.accIssuer }}</span> -->
              </div>
              <div class="text-sm text-neutral-400 font-normal">
                {{ account.accIssuer }}
              </div>
            </div>
          </div>
          <!--          </v-skeleton-loader>-->
        </div>
      </template>
      <v-card-text class="bg-white mx-2 rounded px-4 overflow-y-auto">
        <div class="flex gap-4 my-4">
          <div class="grow">
            <TextFieldTitle title="계좌이름" />
            <v-text-field
              v-model="editedAccount.accName"
              type="text"
              variant="outlined"
              density="comfortable"
              hide-details
              readonly
            />
          </div>
          <div class="grow">
            <TextFieldTitle title="기관명" />
            <v-text-field
              v-model="editedAccount.accIssuer"
              type="text"
              variant="outlined"
              density="comfortable"
              hide-details
              readonly
            />
          </div>
        </div>
        <div class="my-4">
          <TextFieldTitle title="예산" />
          <v-text-field
            v-model="editedAccount.budgetAmount"
            type="number"
            variant="outlined"
            density="comfortable"
            prefix="₩"
            :hint="Formatter.readableMoney(editedAccount.budgetAmount)"
            persistent-hint
            hide-spin-buttons
          />
        </div>
      </v-card-text>

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
        <v-btn @click="() => handleModalClose(false)" class="grow-[1]" height="48"> 취소 </v-btn>
      </template>
    </v-card>
    <AvatarEditorDialog
      :model-value="show.avatar"
      :icon-url="editedAccount.accIconUrl"
      :color="editedAccount.accBgColorHex"
      @update:model-value="(e) => (show.avatar = e)"
      @submit="onAvatarSubmit"
    />
  </v-dialog>
</template>
