<template>
  <div class="text-h3 q-pa-md">Notify Plugin</div>
  <div class="text-h5 q-pa-md">With icon </div>
    <div class="q-pa-md">
      <q-btn color="primary" @click="showNotif" label="Show Notification" />
    </div>
    <div class="q-pa-md">
      <div class="text-h5 q-pb-md">With Spinner </div>
    <div class="row q-gutter-sm">
      <q-btn color="primary" @click="showDefault" label="Default spinner" />
      <q-btn color="primary" @click="showCustom" label="Custom spinner" />
    </div>
  </div>
  </template>
  <script lang="ts" setup>
  import { QSpinnerGears } from 'quasar'
  const q$ = useQuasar()

  function showNotif () : void {
    q$.notify({
      message: 'Jim pinged you.',
      icon: 'announcement'
    })
  }
  
  function showDefault () {
    q$.notify({
      spinner: true,
      message: 'Please wait...',
      timeout: 2000
    })
  }

  function showCustom () : void {
    q$.notify({
      spinner: QSpinnerGears,
      message: 'Working...',
      timeout: 2000
    })
  }
  </script>
