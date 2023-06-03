import { useUserStore } from "@/store/user"

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn

  if (!isLoggedIn) {
    return navigateTo("/")
  }
})
