import { useGlobalStore } from "@/stores/GlobalStore/index"

export default defineNuxtRouteMiddleware(() => {
  const userStore = useGlobalStore()
  const isLoggedIn = userStore.isLoggedIn

  if (!isLoggedIn) {
    return navigateTo("/")
  }
})
