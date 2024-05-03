<script setup>
import { StockItemAvatar } from '@/components/index.js'
import TextFieldTitle from '@/components/stocks/TextFieldTitle.vue'
import { reactive, watch } from 'vue'
import fileApi from '@/services/fileApi.js'

const props = defineProps({
  modelValue: Boolean,
  color: String,
  iconUrl: String
})
const emits = defineEmits(['update:modelValue', 'submit'])

const files = reactive({
  icons: []
})

const select = reactive({
  bgColorHex: '',
  iconUrl: '',
  profileUploadFile: null
})
const loading = reactive({ account: false })
const show = reactive({
  avatarColorPicker: false,
  avatarProfileUploader: false
})
watch(
  () => props.modelValue,
  async (val) => {
    if (!val) return //do some close handler

    loading.account = true
    // let stockRes = await StockApi.getByTicker(ticker)
    let iconRes = await fileApi.getAll()
    loading.account = false

    if (iconRes.status === 200) {
      files.icons = iconRes.data?.files
    } else {
      console.error('AvatarEditorDialog,  Failed to load Icons.')
    }
    select.iconUrl = props.iconUrl
    select.bgColorHex = props.color
  }
)
function iconOnClick(item) {
  select.iconUrl = item.value
  item.onClick()
}
function onAvatarSubmit() {
  // 아이콘 업로드 시도
  // 성공 시 submit과 update:modelValue 실행

  emits('submit', select)
  emits('update:modelValue', false)
}
function closeModal() {
  emits('update:modelValue', false)
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    transition="tab-transition"
    max-width="480"
    @update:modelValue="closeModal"
  >
    <v-card color="#f2f2f2">
      <v-card-item class="bg-white mx-2 rounded mt-2">
        <div class="flex items-center justify-center relative">
          <StockItemAvatar
            :color="select.bgColorHex"
            :icon-url="select.iconUrl"
            :size="120"
            :clickable="false"
          />

          <div class="absolute top-0 right-0">
            <v-btn @click="closeModal" icon="mdi-close" variant="plain" density="comfortable" />
          </div>
        </div>

        <div class="flex flex-col gap-4 my-4">
          <div>
            <TextFieldTitle title="주식 로고" />
            <div class="flex gap-2 mb-2">
              <v-autocomplete
                variant="outlined"
                v-model="select.iconUrl"
                density="comfortable"
                hide-details
                :items="files.icons"
                item-value="iconUrl"
                no-data-text="결과를 찾을 수 없습니다."
                transition="fade-transition"
                :list-props="{ height: '40vh' }"
              >
                <template v-slot:item="{ props: item }">
                  <v-list-item v-bind="props" @click="iconOnClick(item)">
                    <template v-slot:prepend>
                      <StockItemAvatar :icon-url="item.value" color="#494A50" :clickable="false" />
                    </template>
                    <div class="ml-2">{{ item.value }}</div>
                  </v-list-item>
                </template>
              </v-autocomplete>
              <v-btn
                @click="show.avatarProfileUploader = !show.avatarProfileUploader"
                variant="tonal"
                size="sm"
              >
                <v-icon icon="mdi-upload" size="24" class="px-6" />
              </v-btn>
            </div>
            <v-expand-transition>
              <v-file-input
                v-if="show.avatarProfileUploader"
                v-model="select.profileUploadFile"
                label="클릭해서 로고 업로드하기"
                density="comfortable"
                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                counter
                show-size
                prepend-icon=""
                prepend-inner-icon="mdi-file-image"
                variant="outlined"
                single-line
                hide-details
              />
            </v-expand-transition>
          </div>
          <div>
            <TextFieldTitle title="주식 배경색" />
            <div class="flex gap-2">
              <v-text-field
                variant="outlined"
                v-model="select.bgColorHex"
                density="comfortable"
                hide-details
              />
              <v-menu
                v-model="show.avatarColorPicker"
                :close-on-content-click="false"
                location="start center"
                offset="4"
              >
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps" variant="tonal" size="sm">
                    <v-icon icon="mdi-palette" size="24" class="px-6" />
                  </v-btn>
                </template>
                <v-color-picker v-model="select.bgColorHex" mode="hex" />
              </v-menu>
            </div>
          </div>
        </div>
        <!--          <v-color-picker v-model="select.bgColorHex" mode="hex" hide-inputs />-->
      </v-card-item>
      <template v-slot:actions>
        <v-btn
          @click="onAvatarSubmit"
          class="grow"
          color="blue"
          variant="flat"
          prepend-icon="mdi-check"
        >
          확인
        </v-btn>
        <v-btn @click="closeModal" class="grow" prepend-icon="mdi-close"> 취소 </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
