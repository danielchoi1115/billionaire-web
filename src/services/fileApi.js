import ApiClient from '@/services/api'

const FileApi = {
  post: async (data) => {
    return await ApiClient.post('/api/billionaire/file', data, {}, 'fs')
  },
  getAll: async () => {
    return await ApiClient.get(`/api/billionaire/file`, {}, 'fs')
  },
  getOne: async (filename) => {
    return await ApiClient.get(`/api/billionaire/file/${filename}`, {}, 'fs')
  }
}

export default FileApi
