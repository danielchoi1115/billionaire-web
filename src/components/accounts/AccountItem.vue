<script setup>
import StockItemAvatar from '@/components/stocks/StockItemAvatar.vue'
import StockItemColumn from '@/components/stocks/StockItemColumn.vue'

const props = defineProps({
  account: Object,
  data: Object
})
</script>

<template>
  <div class="mb-1 transition-colors rounded-lg">
    <div class="py-1 flex items-center">
      <v-row class="w-full">
        <StockItemAvatar
          class="flex items-center m-2"
          :color="account.accBgColorHex"
          :icon-url="account.accIconUrl"
        />
        <StockItemColumn cols="1" class="min-w-[120px]">
          <template v-slot:title>
            {{ account.accName }}
          </template>
          <template v-slot:subtitle>
            {{ account.accIssuer }}
          </template>
        </StockItemColumn>

        <StockItemColumn class="items-start">
          <template v-slot:title> {{ data.value }}원 </template>
          <template v-slot:subtitle> {{ data.weight }}% </template>
        </StockItemColumn>
      </v-row>
    </div>
  </div>
</template>

<style scoped></style>
