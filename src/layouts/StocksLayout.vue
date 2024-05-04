<template>
  <div class="px-6 max-w-[720px] my-0 mx-auto">
    <slot name="title"></slot>
    <section class="mt-2">
      <slot name="searchBar"></slot>
    </section>
    <section>
      <slot name="stockList"></slot>
    </section>
  </div>
</template>
