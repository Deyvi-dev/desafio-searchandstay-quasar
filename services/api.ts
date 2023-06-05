import axios from "axios"

import { useGlobalStore } from "@/stores/GlobalStore"
const userStore = useGlobalStore()
const token = userStore.token
const api = axios.create({
  baseURL: `${useRuntimeConfig().public.apiBase}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export default api
