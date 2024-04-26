import ApiClient from '@/services/api'
import { FILE_SERVER_BASE_URL } from '@/configs'
const FileApi = {
  getUrl: (filename) => {
    return `${FILE_SERVER_BASE_URL}/api/billionaire/file/${filename}`
  },
  insert: async (data) => {
    let res = await ApiClient.post('/api/billionaire/file', data, 'fs')
    return res.data
  },
  get: async (filename) => {
    return await ApiClient.get(`/api/billionaire/file/${filename}`, {}, 'fs')
  }
}

export default FileApi
