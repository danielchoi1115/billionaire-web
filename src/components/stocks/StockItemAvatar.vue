<script setup>
import { StockUtil } from '@/utils'
import { computed } from 'vue'
import { StockItemAvatar } from '@/components/index.js'

const props = defineProps({
  color: {
    type: String,
    default: '#f3f5f6'
  },
  iconUrl: {
    type: String,
    default: 'default-logo.svg'
  },
  iconType: {
    type: String,
    validator: (value) => {
      return ['account', 'stock'].includes(value)
    },
    default: 'stock'
  },
  cols: Number,
  selected: Boolean,
  size: {
    type: Number,
    default: 40
  }
})

const color = computed(() => StockUtil.makeColor(props.color))
const iconUrl = computed(() => StockUtil.makeUrl(props.iconUrl))

const sizes = computed(() => {
  return {
    avatar: props.size,
    check: Math.round(props.size * 0.75) + 'px',
    figure: Math.round(props.size * 0.8) + 'px',
    img: Math.round(props.size * 0.55) + 'px'
  }
})
</script>
<template>
  <v-avatar v-if="iconType === 'stock'" :color="color" :size="sizes.avatar">
    <div
      v-show="selected"
      class="w-full h-full flex justify-center items-center absolute bg-[#323438c2]"
    >
      <v-icon :size="sizes.check" icon="mdi-check" color="white"></v-icon>
    </div>
    <figure class="w-auto flex justify-center items-center" :style="{ height: sizes.figure }">
      <img
        :src="iconUrl"
        alt="아바타 이미지"
        class="object-contain w-auto object-center"
        :style="{ height: sizes.img }"
        draggable="false"
      />
    </figure>
  </v-avatar>
  <v-avatar v-if="iconType === 'account'" :color="color + '80'" :size="sizes.avatar" class="mr-4">
    <figure
      class="w-auto rounded-full p-[6px]"
      :style="{ backgroundColor: color, height: sizes.figure }"
    >
      <img
        class="object-contain"
        :src="iconUrl"
        alt="아바타 이미지"
        :style="{ height: sizes.img }"
      />
    </figure>
  </v-avatar>
</template>

<style scoped>
img {
  user-select: none;
}
</style>
