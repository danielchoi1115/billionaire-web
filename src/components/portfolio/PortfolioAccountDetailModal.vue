<script setup>
import { onMounted, watch } from 'vue'
import { ref, reactive } from 'vue'
import { Formatter } from '@/utils'
const props = defineProps({
  modelValue: Boolean,
  edited: Boolean,
  account: Object
})

const emits = defineEmits(['update:modelValue', 'closeModal', 'submit'])

const handleModalClose = (val) => {
  emits('update:modelValue', val)
}
const editedAccount = ref({})

function resetEditedAccount() {
  Object.assign(editedAccount.value, props.account)
}
watch(
  () => props.account,
  () => resetEditedAccount()
)
</script>
<template>
  <v-dialog max-width="600" :model-value="modelValue" @update:model-value="handleModalClose">
    <v-card color="#f2f2f2">
      <template v-slot:append>
        <v-btn @click="handleModalClose" icon="mdi-close" variant="plain" density="comfortable" />
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
      <v-card-text>
        <!--          계좌명 기관명 예산 통화 아이콘 색  -->
        <v-text-field label="계좌명" v-model="editedAccount.accName" type="text" />
        <v-text-field label="기관명" v-model="editedAccount.accIssuer" type="text" />
        <v-text-field
          label="예산"
          v-model="editedAccount.budgetAmount"
          :prefix="editedAccount.currency === 'USD' ? '$' : '₩'"
          :hint="Formatter.readableMoney(editedAccount.budgetAmount)"
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
  </v-dialog>
</template>
