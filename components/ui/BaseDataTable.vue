<template>
  <v-data-table
    :class="customClass"
    v-model="selected"
    :modelValue:page="page"
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
    :show-select="rowSelect"
    :return-object="rowSelectReturnObject"
    @click:row="rowClickControl"
  >
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-if="items"
          total-visible="6"
          :modelValue="page"
          :length="totalPages"
          @update:modelValue="changePage($event)"
        ></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
interface Props {
  customClass?: string | undefined
  page: number| undefined
  headers: Array<object> | undefined
  items: Array<object>| undefined
  totalPages: number| undefined
  itemsPerPage: number | undefined
  rowClickEvent?: boolean
  rowSelect?: boolean
  rowSelectReturnObject?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: undefined,
  page: undefined,
  headers: undefined,
  items: undefined,
  totalPages: undefined,
  itemsPerPage: undefined,
  rowClickEvent: false,
  rowSelect: false,
  rowSelectReturnObject: false
})

const emits = defineEmits(['movePage', 'rowClick', 'selected'])

const selected = ref<Array<number>>()

const changePage = (event: any) => {
  selected.value = []
  emits('movePage', event)
}

const rowClick = (item: any, row: any) => {
  emits('rowClick', row.item)
}

const rowClickControl = computed(() => {
  return props.rowClickEvent ? rowClick : false
})

watch(selected, (value) => {
  emits('selected', value)
})
</script>
