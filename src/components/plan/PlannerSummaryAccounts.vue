<script setup>
import { computed } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  modelValue: Array,
  weights: Object
})
const emit = defineEmits(['update:modelValue', 'click:accItem'])

const planAccDtl = ref(props.modelValue)

const iconBaseUrl = 'src/assets/icons/'

const sortedPlanAccDtl = computed(() =>
  planAccDtl.value?.sort((a, b) => b?.budgetAmount - a?.budgetAmount)
)
</script>
<template>
  <div class="account">
    <div v-for="(acc, i) in sortedPlanAccDtl" :key="i" class="">
      <div class="px-2 my-2 rounded-lg cursor-default select-none">
        <div class="py-3 flex items-center justify-between transition-transform">
          <section class="flex items-center">
            <v-avatar :color="acc?.accMst.accBgColorHex + '80'" size="40" class="mr-4">
              <figure
                class="w-6 h-6 rounded-full p-[6px]"
                :style="{ backgroundColor: acc?.accMst.accBgColorHex }"
              >
                <img :src="iconBaseUrl + acc?.accMst.accIconUrl" alt="아바타 이미지" />
              </figure>
            </v-avatar>
            <div class="flex flex-col justify-center">
              <div class="text-lg font-semibold text-neutral-700 flex gap-1 leading-6">
                <span>{{ acc?.accMst.accName }}</span>
              </div>
              <div class="text-sm text-neutral-500">{{ acc?.accMst.accIssuer }}</div>
            </div>
          </section>
          <section>
            <div class="flex flex-col items-end">
              <div class="text-lg font-semibold text-neutral-700 flex gap-1 leading-6">
                <span>{{ acc.budgetAmount?.toLocaleString() }}원</span>
              </div>
              <div class="text-sm text-neutral-500">
                {{ Math.round(weights[acc?.accMst.accNo] * 100) / 100 }}%
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
