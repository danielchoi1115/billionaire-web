<script setup>
import StockItemAvatar from '@/components/stocks/StockItemAvatar.vue'
import StockItemColumn from '@/components/stocks/StockItemColumn.vue'
defineProps({ disabled: Boolean })
</script>
<template>
  <div class="px-2 transition-colors rounded-lg relative" :class="{ 'cursor-pointer': !disabled }">
    <div class="clickable-wrapper__overlay absolute top-0 left-0 rounded-lg w-full h-full"></div>
    <div class="clickable-inner-wrapper py-2 transition-transform flex items-center">
      <v-row class="w-full">
        <StockItemAvatar class="flex items-center m-4" color="#f3f5f6" icon-url="plus.svg" />
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
