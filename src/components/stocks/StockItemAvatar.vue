<script setup>
const imgBaseUrl = 'src/assets/icons/'

defineProps({
  color: String,
  iconUrl: String,
  iconType: {
    type: String,
    validator: (value) => {
      return ['account', 'stock'].includes(value)
    },
    default: 'stock'
  },
  cols: Number
})
</script>
<template>
  <v-col cols="1" class="flex items-center mr-4">
    <v-avatar v-if="iconType === 'stock'" :color="color" size="40">
      <figure class="w-8 h-8 flex justify-center items-center">
        <img
          :src="imgBaseUrl + iconUrl"
          alt="아바타 이미지"
          class="object-contain w-auto h-5 object-center"
        />
      </figure>
    </v-avatar>
    <v-avatar v-if="iconType === 'account'" :color="color + '80'" size="40" class="mr-4">
      <figure class="w-6 h-6 rounded-full p-[6px]" :style="{ backgroundColor: color }">
        <img class="object-contain" :src="imgBaseUrl + iconUrl" alt="아바타 이미지" />
      </figure>
    </v-avatar>
  </v-col>
</template>
