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
  },
  showEdit: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: true
  },
  onEditClicked: {
    type: Function,
    default: () => {}
  }
})

const color = computed(() => StockUtil.makeColor(props.color))
const iconUrl = computed(() => StockUtil.makeUrl(props.iconUrl))

const sizes = computed(() => {
  return {
    avatar: props.size,
    check: Math.round(props.size * 0.75) + 'px',
    figure: Math.round(props.size * 0.5) + 'px',
    imgHeight: Math.round(props.size * 0.5) + 'px',
    imgWidth: Math.round(props.size * 0.8) + 'px',
    editBtn: Math.round(props.size * 0.3) + 'px',
    editIcon: Math.round(props.size * 0.2) + 'px'
  }
})
</script>
<template>
  <div
    :class="clickable ? 'wrapper' : ''"
    :style="{ height: sizes.avatar, width: sizes.avatar }"
    @click="onEditClicked"
  >
    <v-avatar :color="color" :size="sizes.avatar">
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
          class="object-contain object-center"
          :style="{ height: sizes.imgHeight, width: sizes.imgWidth }"
          draggable="false"
        />
      </figure>
    </v-avatar>

    <v-avatar v-if="showEdit" class="edit-avatar" :size="sizes.editBtn">
      <template v-slot:default>
        <v-icon class="edit-icon" icon="mdi-pencil" :size="sizes.editIcon"></v-icon>
      </template>
    </v-avatar>
  </div>
</template>

<style scoped>
img {
  user-select: none;
  -webkit-user-select: none;
}
.edit-avatar {
  position: absolute;
  top: 67%;
  left: 72%;
  background-color: rgb(241, 243, 246);
  color: black;
}
.wrapper {
  position: relative;
  cursor: pointer;
}

.wrapper:hover .edit-avatar {
  background-color: rgba(220, 225, 231);
}
.wrapper:active .edit-avatar {
  background-color: rgb(173, 178, 183);
}
</style>
