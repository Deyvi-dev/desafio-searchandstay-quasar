import axios from "axios"

import { useGlobalStore } from "~~/stores/GlobalStore"
const userStore = useGlobalStore()

const token = userStore.token
const api = axios.create({
  baseURL: "https://sys-dev.searchandstay.com/api/admin",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export default api
