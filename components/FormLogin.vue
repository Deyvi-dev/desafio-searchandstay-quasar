<template>
  <div class="login-page q-pa-lg bg-gradient-primary">
    <div>
      <div class="q-mb-lg">
        <q-img
          src="https://assets.searchandstay.com/midias/60a34d82cc193.png"
          alt="Logo"
          class="logo q-ma-auto"
          max-width="100%"
          max-height="150px"
        />
      </div>
      <q-card class="custom-card">
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="email"
              type="email"
              label="Email"
              :rules="[emailRule]"
            />
            <q-input
              square
              filled
              clearable
              v-model="password"
              type="password"
              label="Password"
              :rules="[passwordRule]"
            />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            unelevated
            color="primary"
            size="lg"
            class="full-width"
            label="Login"
            @click="handleLogin"
            :disable="!isFormValid"
          />
        </q-card-actions>
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-6">Not registered? Create an Account</p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useUserStore } from "@/store/user"

const email = ref("")
const password = ref("")
const userStore = useUserStore()

const emailRule = (value: string): string | true => {
  if (!value) {
    return "Email is required"
  }
  if (!validateEmail(value)) {
    return "Invalid email format"
  }
  return true
}

const passwordRule = (value: string): string | true => {
  if (!value) {
    return "Password is required"
  }
  if (value.length < 6) {
    return "Password must be at least 6 characters long"
  }
  return true
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleLogin = (): void => {
  if (isFormValid) {
    userStore.login(email.value, password.value)
    navigateTo("/admin")
  }
}

const isFormValid = computed((): boolean => {
  return (
    emailRule(email.value) === true && passwordRule(password.value) === true
  )
})
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
