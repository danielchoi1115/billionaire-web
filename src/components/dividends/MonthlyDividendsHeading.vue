<script setup>
import { formatNumberWithComma } from '@/utils'

defineProps({
  data: Object
})
</script>
<template>
  <dt class="flex align-baseline justify-between">
    <div class="text-lg font-bold ml-1">
      <span>{{ data.month }}</span>
    </div>
    <div class="text-sm text-neutral-500">
      {{ formatNumberWithComma(data.totalDividends) }}
      <span class="text-xs">원</span>
    </div>
  </dt>
</template>
