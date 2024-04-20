<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="w-full flex justify-center gap-4 mb-10">
        <RouterLink to="/" class="bg-red">Home</RouterLink>
        <RouterLink to="/plans" class="bg-red">Planner</RouterLink>
        <RouterLink to="/dividends" class="bg-red">Dividends</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
