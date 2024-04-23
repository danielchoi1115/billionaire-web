<script setup>
const imgBaseUrl = 'src/assets/icons/'

import { ref, watch } from 'vue'
import { StockApi } from '@/services'

const props = defineProps({
  modelValue: Boolean,
  stock: Object
})

const emit = defineEmits(['update:modelValue', 'update:stock'])
const edited = ref(false)
const editedStock = ref({})
watch(
  () => props.stock,
  (newVal) => {
    Object.assign(editedStock.value, newVal)
  }
)

function handleModalClose(e) {
  if (edited.value) {
    alert('수정했지롱')
    return
  }
  Object.assign(editedStock.value, props.stock)
  emit('update:modelValue', e)
}

async function update() {
  console.log('API Call', editedStock.value)
  let res = await StockApi.update(editedStock.value)
  if (res.status === 200) {
    Object.assign(props.stock, editedStock.value)
  } else {
    console.error('Could not update resource')
  }
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
      <v-toolbar>
        <v-btn icon="mdi-close" @click="handleModalClose"></v-btn>

        <v-toolbar-title>Settings</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items> </v-toolbar-items>
      </v-toolbar>
      <v-list>
        <div class="p-4">
          <v-text-field variant="outlined" v-model="editedStock.ticker" label="ticker" />
          <v-text-field variant="outlined" v-model="editedStock.stockCd" label="stockCd" />
          <v-text-field
            variant="outlined"
            v-model="editedStock.stockNameKor"
            label="stockNameKor"
          />
          <v-text-field
            variant="outlined"
            v-model="editedStock.stockNameEng"
            label="stockNameEng"
          />
          <v-text-field
            variant="outlined"
            v-model="editedStock.stockCurrency"
            label="stockCurrency"
          />
          <v-text-field
            variant="outlined"
            v-model="editedStock.assetClassCd"
            label="assetClassCd"
          />

          <v-divider></v-divider>
          <!-- <v-list-subheader>User Controls</v-list-subheader> -->

          <v-text-field
            variant="outlined"
            v-model="editedStock.assetClassName"
            label="assetClassName"
          />
          <v-text-field
            variant="outlined"
            v-model="editedStock.assetCountryCd"
            label="assetCountryCd"
          />
          <v-text-field
            variant="outlined"
            v-model="editedStock.assetCountryName"
            label="assetCountryName"
          />
          <v-text-field
            variant="outlined"
            v-model="editedStock.stockBgColorHex"
            label="stockBgColorHex"
          />
          <v-text-field
            variant="outlined"
            v-model="editedStock.stockIconUrl"
            label="stockIconUrl"
          />
          <v-text-field variant="outlined" v-model="editedStock.secTypeCd" label="secTypeCd" />
          <v-btn @click="update">Save Ticker</v-btn>

          <v-checkbox v-model="edited" label="edited"></v-checkbox>
        </div>
      </v-list>
    </v-card>
  </v-dialog>
</template>
