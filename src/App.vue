<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/commons/NavBar.vue'
</script>

<template>
  <header class="z-50 fixed w-full top-0">
    <NavBar />
  </header>

  <RouterView class="mt-[80px] px-3 max-w-7xl mx-auto" />
</template>
