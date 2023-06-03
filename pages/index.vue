<template>
  <div>
    <q-page
      class="bg-gradient-primary window-height window-width row justify-center items-center"
    >
      <div class="column">
        <div class="row">
          <h5 class="text-h3 q-my-md">Search and Stay</h5>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg shadow-2 q-w-2xl custom-card">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  square
                  filled
                  clearable
                  v-model="email"
                  type="email"
                  label="Email"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="password"
                  type="password"
                  label="Password"
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
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">Not registered? Create an Account</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "@/store/user"

definePageMeta({
  layout: "custom",
})

const router = useRouter()
const email = ref("")
const password = ref("")
const userStore = useUserStore()

const handleLogin = () => {
  userStore.login(email.value, password.value)
  router.push("/admin")
}
</script>

<style>
.custom-card {
  width: 360px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
