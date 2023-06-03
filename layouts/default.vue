<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Dashboard</q-toolbar-title>

        <q-avatar>
          <q-icon name="person" />
        </q-avatar>
        <div class="q-ml-sm" v-if="userEmail">
          <div>{{ userEmail }}</div>
        </div>
        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          class="q-ml-auto"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="logo-container">
        <q-img
          src="https://assets.searchandstay.com/midias/60a34d82cc193.png"
          alt="Logo"
          class="logo"
          max-width="100%"
          max-height="150px"
        />
      </div>

      <q-list>
        <q-item
          v-for="link in links"
          :key="link.title"
          clickable
          :to="link.path"
          :class="{ 'q-hoverable': link.hoverable }"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/user"

const router = useRouter()
const userStore = useUserStore()
const leftDrawerOpen = ref(false)
const userEmail = userStore.state.email

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  userStore.logout()
  router.push("/")
}

const links = ref([
  {
    title: "Admin",
    path: "/admin",
    icon: "admin_panel_settings",
    hoverable: true,
  },
])
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.logo {
  max-width: 100%;
  max-height: 150px;
}
</style>
