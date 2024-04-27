<script setup>
import StockItemAvatar from '@/components/stocks/StockItemAvatar.vue'
import StockItemColumn from '@/components/stocks/StockItemColumn.vue'
import { FileApi } from '@/services'
import { StockUtil } from '@/utils/index.js'
defineProps({ disabled: Boolean })
</script>
<template>
  <div class="px-2 transition-colors rounded-lg relative" :class="{ 'cursor-pointer': !disabled }">
    <div class="clickable-wrapper__overlay absolute top-0 left-0 rounded-lg w-full h-full"></div>
    <div class="clickable-inner-wrapper py-2 transition-transform flex items-center">
      <v-row class="w-full">
        <v-col cols="1" class="flex items-center mr-4">
          <StockItemAvatar color="#f3f5f6" icon-url="plus.svg" />
        </v-col>
        <StockItemColumn>
          <template v-slot:title>
            <div class="font-normal" :class="disabled ? 'text-neutral-300' : 'text-neutral-500'">
              추가하기
            </div>
          </template>
        </StockItemColumn>
      </v-row>
    </div>
  </div>
</template>
