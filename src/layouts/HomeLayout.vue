<template>
  <div class="flex justify-center gap-4">
    <article class="w-[45vw]">
      <slot name="accounts"></slot>
    </article>
    <article class="w-[45vw]">
      <slot name="charts"></slot>
      <slot name="chart-list"></slot>
    </article>
  </div>
</template>
