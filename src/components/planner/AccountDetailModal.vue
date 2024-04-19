<script setup>
import { nextTick } from 'vue'
import { onMounted, watch } from 'vue'
import { ref, reactive } from 'vue'
const props = defineProps({
  edited: Boolean,
  account: Object
})

const emits = defineEmits(['closeModal', 'submit'])

const rules = {
  name: [
    (value) => {
      if (value?.length >= 2) return true
      return '계좌명은 최소한 2글자 이상이어야 합니다.'
    }
  ],
  issuer: [
    (value) => {
      if (value?.length >= 1) return true
      return '기관명을 입력해주세요'
    }
  ],
  amount: [
    (value) => {
      if (!value) return '예산을 입력해주세요.'
      if (value < 0) return '예산은 0보다 작을 수 없습니다.'
      if (value.toString().includes('e')) return '일반 표기법으로 숫자를 입력해주세요.'
      return true
    }
  ]
}
function formatNumber(numStr) {
  let value = numStr?.replace(/[^\d.]/g, '')
  value = Number(value)
  if (isNaN(value)) {
    return 0
  }
  return value.toLocaleString('ko-KR')
}
function formatNumberAndSet(e) {
  if (!e.target) return
  formData.amount = formatNumber(e?.target.value)

  // let cursorPosition =
  //   e.target.value.length -
  //   (
  //     e.target.value
  //       .slice(e.target.value.length - e.target.selectionEnd, e.target.value.length)
  //       .match(/\D/g) || []
  //   ).length
  // nextTick(() => {
  //   e.target.setSelectionRange(cursorPosition, cursorPosition)
  // })
}

const formData = reactive({
  accountNo: ref(),
  accountName: ref(),
  accountIssuer: ref(),
  currency: ref(),
  iconUrl: ref(),
  bgColorHex: ref(),
  amount: ref()
})
function resetFormData() {
  formData.accountNo = props.account?.accountNo
  formData.accountName = props.account?.accountName
  formData.accountIssuer = props.account?.accountIssuer
  formData.iconUrl = props.account?.iconUrl
  formData.bgColorHex = props.account?.bgColorHex
  formData.currency = props.account?.currency
  formData.amount = formatNumber(props.account?.amount.toString())
}

async function submit(event) {
  const results = await event
  if (results.valid === false) return
  formData.amount = Number(formData.amount.replaceAll(',', ''))

  emits('submit', {
    accountNo: formData.accountNo,
    accountName: formData.accountName,
    accountIssuer: formData.accountIssuer,
    iconUrl: formData.iconUrl,
    currency: formData.currency,
    bgColorHex: formData.bgColorHex,
    amount: formData.amount
  })
}

onMounted(() => {
  resetFormData()
})
watch(
  () => props.account,
  () => resetFormData()
)
</script>
<template>
  <v-dialog max-width="600">
    <v-form validate-on="submit" @submit.prevent="submit">
      <v-card prepend-icon="mdi-account" title="계좌 설정">
        <v-card-text>
          <!--          계좌명 기관명 예산 통화 아이콘 색  -->
          <v-text-field
            label="계좌명"
            v-model="formData.accountName"
            type="text"
            :rules="rules.name"
          />
          <v-text-field
            label="기관명"
            v-model="formData.accountIssuer"
            :rules="rules.issuer"
            type="text"
          />
          <v-text-field
            label="예산"
            v-model="formData.amount"
            :rules="rules.amount"
            prefix="₩"
            @input="formatNumberAndSet"
          />

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="emits('closeModal')"></v-btn>

          <v-btn color="primary" text="Save" type="submit" variant="tonal"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
