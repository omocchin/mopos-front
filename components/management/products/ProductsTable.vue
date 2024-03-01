<template>
  <base-data-table
    custom-class="h-100"
    :page="page"
    :headers="headers"
    :items="items"
    :total-pages="totalPages"
    :items-per-page="ITEMS_PER_TABLE"
    :row-click-event="true"
    :row-select="true"
    @row-click="rowClick"
    @move-page="changePage"
    @selected="rowSelected"
  >
  </base-data-table>
</template>

<script setup lang="ts">
import BaseDataTable from '~/components/ui/BaseDataTable.vue';
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

const emits = defineEmits(['movePage', 'rowEvent', 'selectedEvent'])

const changePage = (event: any) => {
  emits('movePage', event)
}

const rowClick = (item: any) => {
  emits('rowEvent', item)
}

const rowSelected = (items: any) => {
  emits('selectedEvent', items)
}
</script>
