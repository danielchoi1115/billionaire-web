<script setup>
import { imgBaseUrl } from '@/utils'

const props = defineProps({
  stock: Object,
  selected: Boolean
})
function getAvatarColor() {
  return props.stock?.stockBgColorHex || '#798599'
}
function getAvatarIcon() {
  return props.stock?.stockIconUrl
    ? imgBaseUrl + props.stock.stockIconUrl
    : imgBaseUrl + 'default-logo.svg'
}
</script>

<template>
  <div class="flex flex-col items-center select-none relative cursor-pointer">
    <v-avatar :color="getAvatarColor()" size="80" :draggable="false" class="relative">
      <div
        v-show="selected"
        class="w-full h-full flex justify-center items-center absolute bg-[#323438c2]"
      >
        <v-icon size="40" icon="mdi-check"></v-icon>
      </div>

      <figure class="w-12 h-12 flex justify-center items-center">
        <img
          :src="getAvatarIcon()"
          alt="아바타 이미지"
          class="object-contain w-auto h-8 object-center"
          draggable="false"
        />
      </figure>
    </v-avatar>
    <div class="flex flex-col items-center" :class="selected ? 'font-semibold' : ''">
      <span>{{ stock.stockNameKor }}</span>
      <span class="text-neutral-500 text-sm">{{ stock.ticker }}</span>
    </div>
  </div>
</template>
