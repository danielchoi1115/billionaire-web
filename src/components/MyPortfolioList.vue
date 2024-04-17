<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: Array
})
const accounts = ref(props.modelValue)
</script>

<template>
  <v-avatar>
    <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
  </v-avatar>
</template>
