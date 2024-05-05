<script setup>
defineProps({
  size: { type: Number, default: 24 },
  fill: { type: String, default: '#9CA3AF' },
  stroke: { type: String, default: '#9CA3AF' },
  strokeWidth: { type: Number, default: 1.5 }
})
</script>

<template>
  <svg
    :style="{ height: size + 'px', width: size + 'px' }"
    :fill="fill"
    :stroke-width="strokeWidth"
    :stroke="stroke"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</template>
