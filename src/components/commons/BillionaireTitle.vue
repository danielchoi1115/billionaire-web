<script setup>
defineProps({
  text: String
})
</script>
<template>
  <div class="text-xl text-neutral-800 font-semibold">
    {{ text }}
  </div>
</template>
