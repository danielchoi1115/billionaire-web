<script setup>
defineProps({
  cols: String,
  justify: {
    type: String,
    default: 'center'
  },
  textColor: {
    type: String,
    default: 'text-neutral-700'
  }
})
</script>
<template>
  <v-col :cols="cols" class="flex flex-col" :class="'justify-' + justify">
    <div class="text-base font-semibold flex gap-1 leading-6" :class="textColor">
      <slot name="title"></slot>
    </div>
    <div class="text-sm text-neutral-500">
      <slot name="subtitle"></slot>
    </div>
  </v-col>
</template>
