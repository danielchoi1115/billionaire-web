import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userData = ref({
    userNo: '000000'
  })
  const getUser = () => userData.value
  const getUserNo = () => userData.value?.userNo

  return { getUser, getUserNo }
})
