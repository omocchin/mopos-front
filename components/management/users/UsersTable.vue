<template>
  <v-data-table
    class="h-100"
    :modelValue:page="page"
    :headers="headers"
    :items="items"
    :items-per-page="ITEMS_PER_TABLE"
  >
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-if="items"
          :modelValue="page"
          :length="totalPages"
          @update:modelValue="changePage($event)"
        ></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ITEMS_PER_TABLE } from '~/utils/variables/global'

interface Props {
  page: number| undefined
  headers: Array<object> | undefined
  items: Array<object>| undefined
  totalPages: number| undefined
}

const props = withDefaults(defineProps<Props>(), {
  page: undefined,
  headers: undefined,
  items: undefined,
  totalPages: undefined
})

const emits = defineEmits(['movePage'])

const changePage = (event: any) => {
  emits('movePage', event)
}
</script>