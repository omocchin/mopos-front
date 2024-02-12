<template>
  <v-select
    :class="customClass"
    :label="label"
    :type="type"
    :model-value="modelValue"
    :error-messages="errorMessage"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-if="icon" v-slot:prepend-inner>
      <v-icon :icon="icon" :color="iconColor" :size="iconSize"></v-icon>
    </template>
  </v-select>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any,
  errorMessage: any,
  items: any,
  itemTitle?: string,
  itemValue?: string,
  customClass?: string,
  label?: string,
  type?: string,
  icon?: string,
  iconColor?: string
  iconSize?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  errorMessage: undefined,
  items: undefined,
  itemTitle: undefined,
  itemValue: undefined,
  customClass: undefined,
  label: undefined,
  type: undefined,
  icon: undefined,
  iconColor: undefined,
  iconSize: undefined
})
</script>
