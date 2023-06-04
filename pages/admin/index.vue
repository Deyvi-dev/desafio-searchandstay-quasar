<template>
  <div>
    <Popup
      :popupError="errorPopup"
      :popupSuccess="successPopup"
      :showPopup="showPopup"
    />

    <div class="center">
      <CreateHouseRules :onUpadte="onUpdate" />
    </div>
    <Skeleton :showSkeleton="showSkeleton" />
    <div class="q-pa-md" v-if="!showSkeleton">
      <q-table
        v-if="rows.length"
        title="House Rules"
        :rows="rows"
        :columns="columns"
        :rows-per-page-options="[10]"
        row-key="id"
      >
        <template v-slot:body-cell="{ row, col }">
          <q-td>
            <template v-if="col.name === 'actions'">
              <div class="flex justify-center">
                <q-btn
                  color="negative"
                  size="sm"
                  label="Delete"
                  @click="deleteItem(row.id)"
                  class="q-mr-sm"
                />
                <UpdateHouseRules
                  :id="row.id"
                  :name="row.name"
                  @update="handleUpdate"
                />
              </div>
            </template>
            <template v-else>
              {{ row[col.field] }}
            </template>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import {
  fetchHouseRules,
  deleteHouseRule,
} from "@/composables/useHouseRulesRequest"
import {
  setErrorPopupMessage,
  setSuccessPopupMessage,
  clearPopupMessage,
  PopupMessage,
} from "@/composables/popupUtils"

interface HouseRule {
  id: number
  name: string
}

definePageMeta({
  middleware: ["auth"],
})

const columns = ref<any[]>([
  {
    name: "id",
    required: true,
    label: "ID",
    field: "id",
    sortable: true,
    align: "left",
    "header-align": "left",
  },
  {
    name: "name",
    required: true,
    label: "Name",
    field: "name",
    sortable: true,
    align: "left",
    "header-align": "left",
  },
  {
    name: "actions",
    label: "Actions",
    field: "id",
    sortable: false,
    align: "center",
    "header-align": "center",
  },
])

const showSkeleton = ref(true)
const showPopup = ref(false)

onMounted(async () => {
  try {
    await onUpdate()
    showSkeleton.value = false
  } catch (error) {
    console.error(error)
  }
})

const rows = ref<HouseRule[]>([])
const errorPopup = ref<PopupMessage>({
  message: "",
})

const successPopup = ref<PopupMessage>({
  message: "",
})

function addPopupSucess() {
  setSuccessPopupMessage(successPopup, "Ação realizada com sucesso")
  showPopup.value = true
}
function addPopupError() {
  setErrorPopupMessage(errorPopup, "Erro ocorreu")
  showPopup.value = true
}

async function deleteItem(id: number) {
  try {
    await deleteHouseRule(id)
    rows.value = rows.value.filter((item) => item.id !== id)
    addPopupSucess()
  } catch (error) {
    addPopupError()
    console.error(error)
  } finally {
    setTimeout(() => {
      showPopup.value = false
      clearPopupMessage(errorPopup)
      clearPopupMessage(successPopup)
    }, 2000)
  }
}

async function handleUpdate(updatedHouseRule: HouseRule) {
  try {
    const index = rows.value.findIndex(
      (item) => item.id === updatedHouseRule.id
    )
    if (index !== -1) {
      rows.value.splice(index, 1, updatedHouseRule)
    }
    addPopupSucess()
  } catch (error) {
    addPopupError()
    console.error(error)
  } finally {
    setTimeout(() => {
      showPopup.value = false
      clearPopupMessage(errorPopup)
      clearPopupMessage(successPopup)
    }, 2000)
  }
}

async function onUpdate() {
  try {
    rows.value = await fetchHouseRules()
    addPopupSucess()
  } catch (error) {
    addPopupError()
    console.error(error)
    throw new Error()
  } finally {
    setTimeout(() => {
      showPopup.value = false
      clearPopupMessage(errorPopup)
      clearPopupMessage(successPopup)
    }, 2000)
  }
}
</script>
