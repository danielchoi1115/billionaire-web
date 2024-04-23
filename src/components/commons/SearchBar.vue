<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  loading: Boolean
})

const keyword = ref(props.modelValue)

const emits = defineEmits(['search', 'update:modelValue'])

function submit() {
  if (keyword.value.trim().length === 0 || props.loading) return
  emits('search')
}

function onInput() {
  emits('update:modelValue', keyword.value)
}
</script>
<template>
  <v-text-field
    :loading="loading"
    v-model="keyword"
    prepend-inner-icon="mdi-magnify"
    label="'애플'을 검색해보세요"
    variant="outlined"
    hide-details
    single-line
    clearable
    @input="onInput"
    :disabled="loading"
    @click:append-inner="submit"
    @keydown.enter="submit"
  />
</template>
