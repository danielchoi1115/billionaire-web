import ApiClient from '@/services/api'

const FileApi = {
  insert: async (data) => {
    let res = await ApiClient.post('/api/billionaire/file', data, 'fs')
    return res.data
  },
  getAll: async () => {
    return await ApiClient.get(`/api/billionaire/file`, {}, 'fs')
  },
  getOne: async (filename) => {
    return await ApiClient.get(`/api/billionaire/file/${filename}`, {}, 'fs')
  }
}

export default FileApi
