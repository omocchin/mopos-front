<template>
  <v-text-field
    :class="customClass"
    :label="label"
    :type="type"
    :model-value="modelValue"
    :error-messages="errorMessage"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <template v-if="icon" v-slot:prepend-inner>
      <v-icon :icon="icon" :color="iconColor" :size="iconSize"></v-icon>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any,
  errorMessage: any,
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
  customClass: undefined,
  label: undefined,
  type: undefined,
  icon: undefined,
  iconColor: undefined,
  iconSize: undefined
})
</script>
