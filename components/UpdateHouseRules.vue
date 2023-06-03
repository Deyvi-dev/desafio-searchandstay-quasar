<template>
  <div>
    <q-btn
      color="warning"
      size="sm"
      label="Update"
      @click="openDialog"
      class="q-ml-sm"
    />
    <q-dialog
      v-model="dialogVisible"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-white">
        <q-card-section>
          <div class="text-h6">Update House Rule</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="saveHouseRule">
            <q-input
              filled
              outlined
              v-model="updatedName"
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
import { updateHouseRule } from "@/composables/api"

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const dialogVisible = ref(false)
const updatedName = ref("")

const openDialog = () => {
  dialogVisible.value = true
  updatedName.value = props.name
}

const closeDialog = () => {
  dialogVisible.value = false
}

const emit = defineEmits(["update"])

const saveHouseRule = async () => {
  try {
    const updatedHouseRule = {
      id: props.id,
      name: updatedName.value,
    }
    emit("update", updatedHouseRule)
    await updateHouseRule(props.id, updatedName.value, 1)

    dialogVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
</script>
