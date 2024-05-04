import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

export const AuditUtil = {
  setDefaultAudit: (data, setCreatedBy = false) => {
    const userStore = useUserStore()
    const { userData } = storeToRefs(userStore)
    if (!data.modifiedBy) {
      data.modifiedBy = userData.value.userNo
    }
    if (setCreatedBy && !data.createdBy) {
      data.createdBy = userData.value.userNo
    }
  }
}
