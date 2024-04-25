<script setup>
import { imgBaseUrl } from '@/utils'

defineProps({
  color: {
    type: String,
    default: '#f3f5f6'
  },
  iconUrl: {
    type: String,
    default: 'default-logo.png'
  },
  iconType: {
    type: String,
    validator: (value) => {
      return ['account', 'stock'].includes(value)
    },
    default: 'stock'
  },
  cols: Number,
  selected: Boolean
})
</script>
<template>
  <v-avatar v-if="iconType === 'stock'" :color="color" size="40">
    <div
      v-show="selected"
      class="w-full h-full flex justify-center items-center absolute bg-[#323438c2]"
    >
      <v-icon size="30" icon="mdi-check" color="white"></v-icon>
    </div>
    <figure class="w-8 h-8 flex justify-center items-center">
      <img
        :src="imgBaseUrl + iconUrl"
        alt="아바타 이미지"
        class="object-contain w-auto h-5 object-center"
        draggable="false"
      />
    </figure>
  </v-avatar>
  <v-avatar v-if="iconType === 'account'" :color="color + '80'" size="40" class="mr-4">
    <figure class="w-6 h-6 rounded-full p-[6px]" :style="{ backgroundColor: color }">
      <img class="object-contain" :src="imgBaseUrl + iconUrl" alt="아바타 이미지" />
    </figure>
  </v-avatar>
</template>
