import { defineStore } from 'pinia'

const userString = localStorage.getItem("user")
const { token: token } = userString ? JSON.parse(userString) : { token: null }
export const useUserStore = defineStore('user', {
  
  state: () => ({
    email: '',
    password: '',
    token: token,
  }),

  getters: {
    isLoggedIn: (state) => {
      return state.token !== null
    },
  },

  actions: {
    setEmail(email) {
      this.email = email
    },
    setPassword(password) {
      this.password = password
    },
    setToken(token) {
      this.token = token
    },
    login(email, password) {
      const jwtToken = "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8"

      this.setEmail(email)
      this.setPassword(password)
      this.setToken(jwtToken)
    },
    logout() {
      localStorage.clear() 
    },
  },

  persist: {
    storage: persistedState.localStorage,
  },
})
