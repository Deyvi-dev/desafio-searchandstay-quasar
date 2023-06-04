import { defineStore } from 'pinia'

const userString = localStorage.getItem("user")
const { token: token } = userString ? JSON.parse(userString) : { token: null }
export const useUserStore = defineStore('user', {
  
  state: () => ({
    email: '',
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
    setToken(token) {
      this.token = token
    },
    login(email) {
      const jwtToken = "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8"

      this.setEmail(email)
      this.setToken(jwtToken)
    },
    logout() {
      localStorage.clear() 
      this.token = ''
      this.email = ''
    },
  },

  persist:  true,
})
