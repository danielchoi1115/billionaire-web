<script setup>
import { ref } from 'vue'
import { StockApi } from '@/services'
import { StockItem } from '@/components'

const props = defineProps({
  modelValue: Boolean,
  onSubmit: Function,
  title: String,
  loading: Boolean,
  callChildMethod: Function
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
  clearAllInput()
}
function clearAllInput() {
  selected.value.clear()
  searchInput.value = ''
  searchResult.value = []
}
const searchInput = ref('')
const searchResult = ref([])

const selected = ref(new Map())
const toggle = (stock) => {
  if (isSelected(stock.ticker)) {
    deselect(stock.ticker)
  } else {
    selected.value.set(stock.ticker, stock.stockNameKor)
  }
}
const isSelected = (ticker) => selected.value.has(ticker)

const deselect = (ticker) => {
  selected.value.delete(ticker)
}
const searchLoading = ref(false)

let timeout

const handleSearchInput = () => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    if (searchInput.value.trim().length === 0) {
      return
    }
    searchLoading.value = true
    searchResult.value = await StockApi.keywordSearch(searchInput.value)
    searchLoading.value = false
  }, 300)
}
const searchTextFieldRef = ref(null)

defineExpose({ clearAllInput, searchTextFieldRef })
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="handleModalClose"
    transition="tab-transition"
    max-width="720"
  >
    <v-card>
      <template v-slot:title><slot name="title"></slot></template>
      <template v-slot:subtitle><slot name="subtitle"></slot></template>
      <v-card-text>
        <div>
          <v-text-field
            ref="searchTextFieldRef"
            :loading="searchLoading"
            v-model="searchInput"
            prepend-inner-icon="mdi-magnify"
            label="'애플'을 검색해보세요"
            variant="outlined"
            hide-details
            single-line
            clearable
            density="comfortable"
            @input="handleSearchInput"
          />
          <div class="my-2 h-8">
            <v-chip
              v-for="s in selected"
              :key="s[0]"
              variant="tonal"
              color="primary"
              closable
              @click:close="deselect(s[0])"
            >
              {{ s[1] }}
            </v-chip>
          </div>
          <div class="overflow-y-auto overflow-x-hidden h-[40dvh]">
            <StockItem
              v-for="(stock, i) in searchResult"
              :key="i"
              :stock="stock"
              type="default"
              @click="toggle(stock)"
              :selected="isSelected(stock.ticker)"
            />
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-slide-y-transition>
          <v-btn
            v-if="selected.size > 0"
            variant="flat"
            :disabled="searchLoading || loading"
            color="blue"
            @click="onSubmit(selected)"
            block
            :loading="loading"
            size="large"
          >
            <span>{{ selected.size }}개 추가하기</span>
          </v-btn>
        </v-slide-y-transition>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
