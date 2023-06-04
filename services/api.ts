import axios from "axios"

import { useUserStore } from "@/store/user"
const userStore = useUserStore()

const token = userStore.token
const api = axios.create({
  baseURL: "https://sys-dev.searchandstay.com/api/admin",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export default api
