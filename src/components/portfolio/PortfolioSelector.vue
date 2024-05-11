<script setup>
import { Formatter } from '@/utils/index.js'
import { usePortfolioStore, useUserStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive } from 'vue'
import { useCurrencyStore } from '@/stores/currency.js'

const props = defineProps({
  plan: { type: Boolean, default: false }
})

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

const currencyStore = useCurrencyStore()

const selected = reactive({
  portfolio: null
})
const hint = computed(() => {
  if (!selected.portfolio) {
    return '포트폴리오를 선택해 주세요.'
  }
})
onMounted(async () => {
  portfolioStore.setPlanYn(props.plan ? 'Y' : 'N')
  await currencyStore.updateCurrency()
  await userStore.loadPortfolioList()
  selected.portfolio = userData.value.portfolios.length > 0 ? userData.value.portfolios[0] : null
  await loadPortfolio()
})

const itemProps = (portfolio) => {
  return {
    title: `${Formatter.formatDateYYYYM(portfolio.baseDate)} - ${portfolio.portfolioName}`,
    subtitle: `#${portfolio.portfolioNo}`
  }
}

const portfolioStore = usePortfolioStore()
async function loadPortfolio() {
  if (!selected.portfolio) return
  await portfolioStore.setPortfolioNo(selected.portfolio.portfolioNo)
  await portfolioStore.refresh()
}
</script>

<template>
  <v-select
    v-model="selected.portfolio"
    :items="userData.portfolios"
    :item-props="itemProps"
    :hint="hint"
    density="comfortable"
    variant="outlined"
    persistent-hint
    @update:modelValue="loadPortfolio"
    return-object
  >
  </v-select>
</template>
