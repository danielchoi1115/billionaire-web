import ApiClient from '@/services/api'
import { AuditUtil } from '@/utils/audit_util.js'

const AccApi = {
  getAccMstWithAccNo: async (data) => {
    return await ApiClient.get(`/accounts/${data.accNo}`)
  },
  updateAccMstWithAccNo: async (data) => {
    AuditUtil.setDefaultAudit(data)
    return await ApiClient.patch(`/accounts/${data.accNo}`, data)
  }
}

export default AccApi
