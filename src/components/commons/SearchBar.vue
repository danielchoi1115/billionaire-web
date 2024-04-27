<script setup>
import { ref } from 'vue'

const props = defineProps({
  searchHandler: Function
})

const searchInput = ref('')
const searchLoading = ref(false)

let timeout
function onInput() {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    if (searchInput.value.trim().length === 0) {
      return
    }
    searchLoading.value = true
    await props.searchHandler(searchInput.value)
    searchLoading.value = false
  }, 300)
}
</script>
<template>
  <v-text-field
    :loading="searchLoading"
    v-model="searchInput"
    prepend-inner-icon="mdi-magnify"
    label="'애플'을 검색해보세요"
    variant="outlined"
    hide-details
    single-line
    clearable
    @input="onInput"
  />
</template>
