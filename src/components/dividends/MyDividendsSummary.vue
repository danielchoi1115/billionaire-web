<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: Object
})

const innerProp = ref(props.modelValue)

function calculateYearlyDividends() {
  let yearlyDividends = innerProp.value?.dividends
    .map((d) => d.totalDividends)
    .reduce((acc, cur) => acc + cur, 0)
  return `${yearlyDividends.toLocaleString('ko-KR')}원`
}
</script>

<template>
  <div class="mb-12">
    <div>{{ innerProp.metadata.year }}년</div>
    <div class="text-3xl font-bold">{{ calculateYearlyDividends() }}</div>
  </div>
</template>
