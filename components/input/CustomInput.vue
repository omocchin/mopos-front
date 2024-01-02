<template>
  <div>
    <v-text-field
      :label="label"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: String,
  label: String,
  type?: String,
}
const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  type: undefined,
  modelValue: undefined,
})

defineEmits(['update:modelValue'])
</script>