<script setup>
defineProps({
  size: { type: Number, default: 24 },
  fill: { type: String, default: 'none' },
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
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
</template>

<style scoped></style>
