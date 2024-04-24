<script setup>
import StockItemAvatar from '@/components/stocks/StockItemAvatar.vue'
import StockItemColumn from '@/components/stocks/StockItemColumn.vue'
</script>
<template>
  <div class="clickable-wrapper px-2 transition-colors rounded-lg">
    <div class="clickable-inner-wrapper py-2 transition-transform flex items-center">
      <v-row class="w-full">
        <v-col cols="1" class="flex items-center mr-4">
          <StockItemAvatar color="#f3f5f6" icon-url="plus.png" />
        </v-col>
        <StockItemColumn>
          <template v-slot:title>
            <div class="text-neutral-500">추가하기</div>
          </template>
        </StockItemColumn>
      </v-row>
    </div>
  </div>
</template>
