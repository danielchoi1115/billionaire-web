<script setup>
import { DividendDetail, MonthlyDividendsHeading } from '@/components'
import { ref } from 'vue'
const props = defineProps({
  modelValue: Object
})
const headers = ref(props.modelValue.headers)
const dividends = ref(props.modelValue.dividends)
</script>
<template>
  <dl v-for="(monthlyDividends, i) in dividends" :key="i" class="my-8">
    <MonthlyDividendsHeading :data="monthlyDividends" />
    <dd>
      <DividendDetail
        v-for="(dividend, j) in monthlyDividends.history"
        :key="j"
        :dividend="dividend"
      />
    </dd>
  </dl>
</template>
