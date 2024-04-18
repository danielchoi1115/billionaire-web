<script setup>
import { formatNumberWithComma } from '@/utils'

const props = defineProps({
  modelValue: Object
})
</script>

<template>
  <section class="title">
    <div class="text-sm text-neutral-500">이번 달 예산</div>
    <div class="text-3xl font-bold">
      <span>{{ formatNumberWithComma(props.modelValue?.totalBudget) }}</span>
      <span>원</span>
    </div>
  </section>
</template>
