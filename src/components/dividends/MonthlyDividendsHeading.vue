<script setup>

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
      {{ data.totalDividends.toLocaleString('ko-KR') }}
      <span class="text-xs">원</span>
    </div>
  </dt>
</template>
