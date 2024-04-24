<script setup>
import { StockApi } from '@/services'
import { onMounted } from 'vue'
import { ref } from 'vue'

const history = ref([])
onMounted(async () => {
  history.value = await StockApi.getSearchHistory()
})
</script>

<template>
  <v-chip v-if="chip" class="ma-2" closable @click:close="chip = false"> Closable </v-chip>
</template>
