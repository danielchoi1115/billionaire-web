<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  edited: Boolean,
  account: Object
})
const emits = defineEmits(['update:closeModal'])

// const currencyItems = [
//   { currency: 'KRW', currencyName: '원화(₩)', symbol: '₩' },
//   { currency: 'USD', currencyName: '달러($)', symbol: '$' }
// ]
// const currencySelect = ref()
// watch(
//   () => props.account,
//   (newVal) => {
//     currencySelect.value = currencyItems.find((c) => c.currency === newVal.currency)
//   }
// )
</script>
<template>
  <v-dialog max-width="600">
    <v-card prepend-icon="mdi-account" title="User Profile">
      {{ account }}
      <v-card-text>
        <!--          계좌명 기관명 예산 통화 아이콘 색  -->
        <v-text-field label="계좌명" :model-value="props.account.accountName" type="text" />
        <v-text-field label="기관명" :model-value="props.account.accountIssuer" type="text" />
        <!--        <v-select-->
        <!--          v-model="currencySelect"-->
        <!--          label="통화"-->
        <!--          item-title="currencyName"-->
        <!--          item-value="currency"-->
        <!--          :items="currencyItems"-->
        <!--          return-object-->
        <!--          single-line-->
        <!--        />-->
        <v-text-field label="예산" :model-value="props.account.amount" prefix="₩" type="number" />

        <small class="text-caption text-medium-emphasis">*indicates required field</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" variant="plain" @click="emits('update:closeModal')"></v-btn>

        <v-btn
          color="primary"
          text="Save"
          variant="tonal"
          @click="emits('update:closeModal')"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
