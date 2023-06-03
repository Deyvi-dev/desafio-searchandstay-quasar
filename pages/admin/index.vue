<template>
  <div>
    <div class="q-pa-md">
      <CreateHouseRules />
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
import { fetchHouseRules, deleteHouseRule } from "@/composables/api"

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

const rows = ref<HouseRule[]>([])

onMounted(async () => {
  rows.value = await fetchHouseRules()
})

const deleteItem = async (id: number) => {
  try {
    await deleteHouseRule(id)
    rows.value = rows.value.filter((item) => item.id !== id)
  } catch (error) {
    console.error(error)
  }
}
const handleUpdate = (updatedHouseRule: HouseRule) => {
  const index = rows.value.findIndex((item) => item.id === updatedHouseRule.id)
  if (index !== -1) {
    rows.value.splice(index, 1, updatedHouseRule)
  }
}
</script>
