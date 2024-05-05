<script setup>
import TextFieldTitle from '@/components/stocks/TextFieldTitle.vue'

defineProps({
  title: String,
  modelValue: [Object, String, Number],
  readonly: Boolean
})
const emits = defineEmits(['update:modelValue'])

const onUpdate = (val) => emits('update:modelValue', val)
</script>

<template>
  <TextFieldTitle :title="title" />
  <v-text-field
    :modelValue="modelValue"
    @update:modelValue="onUpdate"
    type="text"
    variant="outlined"
    density="comfortable"
    hide-details
    :readonly="readonly"
  />
</template>
