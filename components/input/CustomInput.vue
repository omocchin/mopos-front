<template>
  <div>
    <v-text-field
      :label="label"
      :type="type"
      :model-value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string,
  label: String,
  type?: String,
}
const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  type: undefined,
  modelValue: '',
})

defineEmits(['update:modelValue'])
</script>