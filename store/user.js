import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const state = {
    email: '',
    password: '',
    token: '',
  }

  const setEmail = (email) => {
    state.email = email
  }

  const setPassword = (password) => {
    state.password = password
  }

  const setToken = (token) => {
    state.token = token
  }

  const login = (email, password) => {
    const token = "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8"

    state.email = email
    state.password = password

    localStorage.setItem("email", state.email)
    localStorage.setItem("password", state.password)
    localStorage.setItem("token", token)
    state.token = token

    alert(state.token)
  }

  const logout = () => {
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("token")
    state.email = ''
    state.password = ''
    state.token = ''
  }

  return { state, setEmail, setPassword, setToken, login, logout }
})
