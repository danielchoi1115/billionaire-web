<template>
  <div>
    <slot name="title"></slot>
    <section class="mt-2">
      <slot name="searchBar"></slot>
    </section>
    <section>
      <slot name="stockList"></slot>
    </section>
  </div>
</template>
