<script setup>
import { onUpdated } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  modelValue: Array,
  weights: Object
})
const emit = defineEmits(['update:modelValue', 'click:accountItem'])

const accounts = ref(props.modelValue)
const iconBaseUrl = 'src/assets/icons/'

onUpdated(() => {
  accounts.value.sort((a, b) => b.amount - a.amount)
})
</script>
<template>
  <div class="account">
    <div v-for="(account, i) in accounts" :key="i" class="">
      <div
        @click="emit('click:accountItem', account)"
        class="list-item-wrapper px-2 my-2 active:bg-neutral-200 active:bg-opacity-70 transition-colors rounded-lg cursor-default select-none"
      >
        <div
          class="list-item-inner-wrapper py-3 flex items-center justify-between transition-transform"
        >
          <section class="flex items-center">
            <v-avatar :color="account.bgColorHex + '80'" size="40" class="mr-4">
              <figure
                class="w-6 h-6 rounded-full p-[6px]"
                :style="{ backgroundColor: account.bgColorHex }"
              >
                <img :src="iconBaseUrl + account.iconUrl" alt="아바타 이미지" />
              </figure>
            </v-avatar>
            <div class="flex flex-col justify-center">
              <div class="text-lg font-semibold text-neutral-700 flex gap-1 leading-6">
                <span>{{ account.accountName }}</span>
              </div>
              <div class="text-sm text-neutral-500">{{ account.accountIssuer }}</div>
            </div>
          </section>
          <section>
            <div class="flex flex-col items-end">
              <div class="text-lg font-semibold text-neutral-700 flex gap-1 leading-6">
                <span>{{ account.amount.toLocaleString('ko-KR') }}원</span>
              </div>
              <div class="text-sm text-neutral-500">{{ weights[account.accountNo] }}%</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
