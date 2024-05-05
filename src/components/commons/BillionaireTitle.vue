<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>
<template>
  <div v-if="subtitle" class="text-sm text-neutral-700 font-medium">{{ subtitle }}</div>
  <div v-if="title" class="text-xl text-neutral-800 font-semibold mb-2">
    {{ title }}
  </div>

  <slot name="selector"></slot>
</template>
