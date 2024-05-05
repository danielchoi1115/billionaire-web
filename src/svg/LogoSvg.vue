<script setup>
defineProps({
  size: { type: Number, default: 24 },
  fill: { type: String, default: '#6cd3ea' },
  stroke: { type: String, default: '#9CA3AF' },
  strokeWidth: { type: Number, default: 1.5 }
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size * 1.13"
    viewBox="0 0 88 100"
    fill="none"
  >
    <g :fill="fill" fill-rule="evenodd">
      <path d="M55.7 35.59A32.22 32.22 0 0 1 56.84 100H0V35.59z" opacity=".9" />
      <path d="M55.7 0a32.22 32.22 0 1 1 1.14 64.43H0V0z" opacity=".7" />
      <path
        d="M55.7 35.59A32.14 32.14 0 0 1 82.57 50 32.24 32.24 0 0 1 55.7 64.45H0V35.59z"
        opacity=".58"
      />
    </g>
  </svg>
</template>

<style scoped></style>
