import ApiClient from '@/services/api'

const CurrencyApi = {
  get: async (data) => {
    return await ApiClient.get(`/currencies/${data.code}`)
  }
}

export default CurrencyApi
