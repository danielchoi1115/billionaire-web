<script setup>
import { onUpdated } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  modelValue: Object
})
const editing = ref(false)
const totalBudgetTextField = ref(null)
onUpdated(() => {
  if (editing.value) {
    const focusedElement = document.activeElement
    console.log('focused', focusedElement)
    console.log(totalBudgetTextField.value)
    totalBudgetTextField.value.focus()
  }
})
</script>

<template>
  <section class="title">
    <div class="text-sm text-neutral-500">이번 달 예산</div>
    <div class="text-3xl font-bold" v-if="!editing" @click="editing = true">
      <span>{{ props.modelValue?.totalBudget.toLocaleString('ko-KR') }}</span>
      <span>원</span>
    </div>
    <div class="text-3xl font-bold" v-if="editing">
      <v-text-field
        ref="totalBudgetTextField"
        @keydown.escape="editing = false"
        @blur="editing = false"
        suffix="원"
        class="text-3xl font-bold"
        variant="outlined"
      >
      </v-text-field>
    </div>
  </section>
</template>
