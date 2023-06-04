import { defineStore } from "pinia"
const userString = localStorage.getItem("user")
const { token: storedToken } = userString
  ? JSON.parse(userString)
  : { token: null }

interface User {
  email: string
  token: string
}

export const useGlobalStore = defineStore(
  "user",
  () => {
    // states
    const email = ref("")
    const token = ref(storedToken)

    // getters
    const isLoggedIn = computed<boolean>(
      () => token.value !== null && token.value !== ""
    )

    // actions
    function setEmail(value: string): void {
      email.value = value
    }

    function setToken(value: string): void {
      token.value = value
    }

    function login(email: string): void {
      const jwtToken =
        "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8"

      setEmail(email)
      setToken(jwtToken)
    }

    function logout(): void {
      localStorage.clear()
    }

    // watcher
    watch(
      [email, token],
      () => {
        const user: User = {
          email: email.value,
          token: token.value,
        }
        const userString = JSON.stringify(user)
        localStorage.setItem("user", userString)
      },
      { deep: true }
    )

    return {
      email,
      token,
      isLoggedIn,
      setEmail,
      setToken,
      login,
      logout,
    }
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
)
