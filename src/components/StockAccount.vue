<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const dialog = ref(false)
const dialogDelete = ref(false)
const headers = [
  {
    title: '주식',
    align: 'start',
    sortable: false,
    key: 'ticker'
  },
  { title: '보유수량', key: 'quantity' },
  { title: '평가액', key: 'totalPriceKRW' },
  { title: '비중', key: 'weight' },
  { title: 'Actions', key: 'actions', sortable: false }
]
const props = defineProps({
  modelValue: Array
})
const emit = defineEmits(['update:modelValue'])

const currentStockIndex = ref(-1)
const currentAccountIndex = ref(-1)

const editedItem = ref({
  company: '',
  lastPriceKRW: 40000,
  quantity: 0
})
const defaultItem = ref({
  company: '',
  lastPriceKRW: 40000,
  quantity: 0
})

const accounts = ref(props.modelValue)
const formTitle = computed(() => (currentStockIndex.value === -1 ? 'New Item' : 'Edit Item'))

watch(dialog, (val) => val || close())
watch(dialogDelete, (val) => val || closeDelete())

function editItem(accountIdx, item) {
  currentStockIndex.value = accounts.value[accountIdx].stocks.indexOf(item)
  currentAccountIndex.value = accountIdx
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}
function deleteItem(accountIdx, item) {
  currentStockIndex.value = accounts.value[accountIdx].stocks.indexOf(item)
  currentAccountIndex.value = accountIdx
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}
function deleteItemConfirm() {
  accounts.value[currentAccountIndex.value].stocks.splice(currentStockIndex.value, 1)
  closeDelete()
}
function close() {
  dialog.value = false
  nextTick(() => clearEditing())
}
function closeDelete() {
  dialogDelete.value = false
  nextTick(() => clearEditing())
}
function clearEditing() {
  editedItem.value = Object.assign({}, defaultItem.value)
  currentStockIndex.value = -1
  currentAccountIndex.value = -1
}
function save() {
  if (currentAccountIndex.value < 0 || currentAccountIndex.value >= accounts.value.length) {
    console.error(
      'Failed to run function save()',
      'List out of index: [currentAccountIndex] account length: ',
      accounts.value.length,
      'currentAccountIndex: ',
      currentAccountIndex.value
    )
    return
  }
  accounts.value[currentAccountIndex.value].stocks.push(editedItem.value)
  close()
  emit('update:modelValue', accounts.value)
}

const totalValueKRW = computed(() =>
  accounts.value.map((account) =>
    account.stocks.reduce((acc, cur) => acc + cur.lastPriceKRW * cur.quantity, 0)
  )
)

watch(
  () => accounts.value.map((a) => a.stocks.map((s) => s.quantity)),
  (val) => {
    accounts.value.forEach((account, idx) => {
      account.stocks.forEach((stock) => {
        stock.weight = Math.round(
          ((stock.lastPriceKRW * stock.quantity) / totalValueKRW.value[idx]) * 100
        )
        stock.totalPriceKRW = stock.lastPriceKRW * stock.quantity
        stock.totalPriceUSD = stock.lastPriceUSD * stock.quantity
      })
    })
    emit('update:modelValue', accounts.value)
  }
)

const panel = ref(accounts.value.map((a, idx) => idx))

function openNewItemDialog(accountIdx) {
  currentAccountIndex.value = accountIdx
  dialog.value = true
}
const search = ref(['', ''])
</script>

<template>
  <div class="wrapper">
    <div v-for="(account, idx) in accounts" :key="idx">
      <v-data-table-virtual
        :headers="headers"
        :items="account.stocks"
        :sort-by="[{ key: 'totalPriceKRW', order: 'desc' }]"
        :max-height="400"
        class="mb-10"
        :search="search[idx]"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ account.accountName }}</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search[idx]"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              clearable
            />
            <v-spacer></v-spacer>

            <v-btn class="mb-2" color="primary" dark @click="openNewItemDialog(idx)">
              New Item
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:[`item.totalPriceKRW`]="{ item }">{{ item.totalPriceKRW }}</template>
        <template v-slot:[`item.quantity`]="{ item }">
          <v-number-input
            control-variant="default"
            inset
            variant="outlined"
            density="comfortable"
            :min="0"
            v-model="item.quantity"
          />
        </template>
        <template v-slot:[`item.weight`]="{ item }"> {{ item.weight }}% </template>

        <template v-slot:item.actions="{ item }">
          <!-- <v-icon class="me-2" size="small" @click="editItem(idx, item)"> mdi-pencil </v-icon> -->
          <v-icon size="small" @click="deleteItem(idx, item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn class="mb-2" color="primary" dark @click="openNewItemDialog(idx)">
            New Item
          </v-btn>
        </template>
      </v-data-table-virtual>
    </div>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="editedItem.ticker" label="주식명"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="editedItem.quantity" label="수량"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm()">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
