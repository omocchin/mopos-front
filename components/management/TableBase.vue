<template>
  <div class="d-flex flex-column pa-5 h-100">
    <div class="d-flex justify-space-between align-center mb-5">
      <div class="d-flex align-center">
        <base-button customClass="mr-3" mode="icon-link" icon="mdi-arrow-left" link="/management/home"/>
        <p class="font-weight-bold text-h5">{{ title }}</p>
      </div>
      <div>
        <base-button
          v-if="optionalActionValues.length > 0"
          class="text-h5 mr-3"
          height="100%"
          mode="action"
          color="accentBlue"
          @action="optionalAction"
        >
          {{ optionalActionButton }}
        </base-button>
        <base-button
          v-if="actionButton"
          custom-class="text-h5 h-100"
          mode="action"
          color="accent"
          @action="action"
        >
          {{ actionButton }}
        </base-button>
      </div>
    </div>
    <base-card
      width="100%"
      class="pa-2 mb-5"
      color="primary rounded-lg"
      style="display: inline-table;"
    >
      <div class="d-flex flex-row w-100">
        <div class="w-25 mr-10">
          <v-text-field
            v-if="searchTitle"
            v-model="keyword"
            :label="searchTitle"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            single-line
            :hide-details="true"
          ></v-text-field>
        </div>
        <div class="w-25">
          <v-select
            v-if="searchSelectChip"
            v-model="selected"
            :items="selectItems"
            item-title="name"
            item-value="id"
            chips
            :label="searchSelectTitle"
            multiple
            :hide-details="true"
          ></v-select>
          <v-select
            v-else
            v-model="selected"
            :label="searchSelectTitle"
            :items="selectItems"
            :hide-details="true"
          ></v-select>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex justify-end w-25">
          <base-button
            class="text-h5"
            mode="action"
            height="100%"
            width="50%"
            @action="searchAction"
          >search</base-button>
        </div>
      </div>
    </base-card>
    <base-card
      width="100%"
      height="100%"
      class="pa-2"
      color="primary rounded-lg"
    >
      <slot></slot>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseButton from '~/components/ui/BaseButton.vue';

interface Props {
  title: string
  actionButton: string | null
  searchTitle?: string | null
  searchSelectTitle?: string | undefined
  searchSelectChip?: boolean
  selectItems?: Array<string> | any
  optionalActionButton?: string | null
  optionalActionValues?: Array<number> | any
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  actionButton: null,
  searchTitle: null,
  searchSelectTitle: undefined,
  searchSelectChip: false,
  selectItems: undefined,
  optionalActionButton: null,
  optionalActionValues: []
})

const emits = defineEmits(['action', 'optionalAction', 'searchAction'])

const selected = ref<string>()
const keyword = ref<string>()

const action = (event: any) => {
  emits('action')
}

const optionalAction = (event: any) => {
  emits('optionalAction')
}

const searchAction = () => {
  emits('searchAction', keyword.value, selected.value)
}
</script>
