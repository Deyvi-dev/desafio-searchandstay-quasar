<template>
  <div class="q-pa-md">
    <q-markup-table v-if="showSkeleton">
      <thead>
        <tr>
          <th class="text-left">
            <q-skeleton animation="blink" width="50%" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" width="50%" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" width="50%" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="n in 10" :key="n">
          <td class="text-left">
            <q-skeleton animation="blink" width="75%" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" width="75%" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" width="75%" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showSkeleton: {
    type: Boolean,
    required: true,
  },
})
</script>
