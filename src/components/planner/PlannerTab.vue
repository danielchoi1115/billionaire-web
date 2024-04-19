<script setup>
import { ref } from 'vue'

const tabs = {
  byAsset: 1,
  byAccount: 2
}
const tab = ref(null)
</script>

<template>
  <v-tabs bg-color="white" ripple="false" fixed-tabs v-model="tab">
    <v-tab :value="tabs.byAsset"> 상품별 </v-tab>
    <v-tab :value="tabs.byAccount"> 계좌별 </v-tab>
  </v-tabs>
  <v-window v-model="tab" class="mt-4">
    <v-window-item :value="tabs.byAsset"><slot name="byAsset"></slot></v-window-item>
    <v-window-item :value="tabs.byAccount"><slot name="byAccount"></slot></v-window-item>
  </v-window>
</template>
