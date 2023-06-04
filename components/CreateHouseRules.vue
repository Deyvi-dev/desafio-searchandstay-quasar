<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Create Rules" color="primary" @click="openDialog" />

    <q-dialog
      v-model="dialogVisible"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-white">
        <q-card-section>
          <div class="text-h6">Add a New House Rule</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveHouseRule">
            <q-input
              filled
              outlined
              v-model="name"
              label="Name*"
              required
            ></q-input>

            <small>* Indicates required field</small>

            <div class="q-mt-md">
              <q-btn flat label="Close" @click="closeDialog" />
              <q-btn color="primary" label="Save" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  createHouseRule,
  fetchHouseRules,
} from "@/composables/useHouseRulesRequest"

const props = defineProps({
  onUpadte: {
    type: Function,
    required: true,
  },
})

const dialogVisible = ref(false)
const name = ref("")

const openDialog = () => {
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
}

const saveHouseRule = async () => {
  try {
    await createHouseRule(name.value)
    name.value = ""
    dialogVisible.value = false
    props.onUpadte()
    await fetchHouseRules()
  } catch (error) {
    console.error(error)
  }
}
</script>
