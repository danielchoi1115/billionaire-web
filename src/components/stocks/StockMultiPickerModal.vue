<script setup>
import { watch } from 'vue'
import { ref } from 'vue'
import { StockApi } from '@/services'

const props = defineProps({
  modelValue: Boolean,
  onSubmit: Function
})
const items = ref([
  {
    src: 'backgrounds/bg.jpg'
  },
  {
    src: 'backgrounds/md.jpg'
  },
  {
    src: 'backgrounds/bg-2.jpg'
  },
  {
    src: 'backgrounds/md2.jpg'
  }
])
const emits = defineEmits(['submit', 'update:modelValue'])

function handleModalClose(e) {
  emits('update:modelValue', e)

  selected.value.clear()
  searchInput.value = ''
  searchResult.value = []
}

const searchInput = ref('')
const searchResult = ref([])

const selected = ref(new Set([]))
const toggle = (ticker) => {
  if (isSelected(ticker)) {
    selected.value.delete(ticker)
  } else {
    selected.value.add(ticker)
  }
}
const isSelected = (ticker) => selected.value.has(ticker)

const loading = ref(false)

let timeout

const handleSearchInput = () => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    if (searchInput.value.trim().length === 0) {
      return
    }

    loading.value = true
    searchResult.value = await StockApi.search(searchInput.value)
    console.log(searchInput.value, searchResult.value)
    loading.value = false
  }, 300)
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="handleModalClose"
    transition="tab-transition"
    max-width="720"
  >
    <v-card>
      <div class="p-2">
        <slot name="title"></slot>
        {{ selected }}
        <v-text-field
          :loading="loading"
          v-model="searchInput"
          prepend-inner-icon="mdi-magnify"
          label="'애플'을 검색해보세요"
          variant="outlined"
          hide-details
          single-line
          clearable
          @input="handleSearchInput"
        />
        <div class="h-[200px]">
          <v-row>
            <v-col v-for="stock in searchResult" :key="stock.ticker" cols="12" md="6">
              <div>
                <div @click="toggle(stock.ticker)">
                  {{ stock.ticker }}: {{ stock.stockNameKor }}
                  <v-btn :icon="isSelected(stock.ticker) ? 'mdi-heart' : 'mdi-heart-outline'" />
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <v-btn color="blue" @click="onSubmit(selected)" block>추가하기</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
