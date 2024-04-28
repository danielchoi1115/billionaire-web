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
  },
  hideContent: {
    type: Boolean,
    default: false
  },
  colorSubtitle: {
    type: String,
    default: 'text-neutral-500'
  }
})
</script>
<template>
  <v-col :cols="cols" class="flex flex-col" :class="'justify-' + justify">
    <div
      v-if="!hideContent"
      class="text-base font-semibold flex gap-1 leading-6 select-none"
      :class="textColor"
    >
      <slot name="title"></slot>
    </div>
    <div v-if="!hideContent" class="text-sm select-none" :class="colorSubtitle">
      <slot name="subtitle"></slot>
    </div>
  </v-col>
</template>
