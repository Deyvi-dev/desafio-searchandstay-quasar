<template>
  <div v-show="showPopup">
    <div v-if="popupSuccess" />
    <div v-if="popupError" />
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue"
import { useQuasar } from "quasar"

const $q = useQuasar()

const props = defineProps({
  popupError: {
    type: Object,
    default: null,
  },
  popupSuccess: {
    type: Object,
    default: null,
  },
  showPopup: {
    type: Boolean,
    default: false,
  },
})

const triggerPositive = () => {
  $q.notify({
    type: "positive",
    message: props.popupSuccess.message,
    classes: "some",
    timeout: 500,
  })
}

const triggerNegative = () => {
  $q.notify({
    type: "negative",
    message: props.popupError.message,
    classes: "some",
    timeout: 500,
  })
}

watchEffect(() => {
  if (props.showPopup) {
    if (props.popupSuccess.message !== "") {
      triggerPositive()
    }
    if (props.popupError.message !== "") {
      triggerNegative()
    }
  }
})
</script>
<style>
.some {
  position: fixed;
  top: 50%;
}
</style>
