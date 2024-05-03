<script setup>
import { onUpdated } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  modelValue: Object,
  totalBudgetAmount: Number
})
const editing = ref(false)
const totalBudgetTextField = ref(null)
onUpdated(() => {
  if (editing.value) {
    totalBudgetTextField.value.focus()
  }
})
</script>

<template>
  <section class="title">
    <div class="text-sm text-neutral-500">이번 달 예산</div>
    <div class="text-3xl font-bold" v-if="!editing">
      <span>{{ totalBudgetAmount.toLocaleString() }}</span>
      <span>원</span>
    </div>
  </section>
</template>
