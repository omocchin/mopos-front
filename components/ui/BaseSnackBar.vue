<template>
  <v-snackbar
    :model-value="modelValue"
    @update:model-value="closeBar"
    timeout="2000"
    location="center"
    :color="color"
  >
  {{ message }}
  </v-snackbar>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  message: string
  color: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  message: '',
  color: ''
})

const emits = defineEmits(['closeBar'])

const closeBar = (event: any) => {
  emits('closeBar', event)
}
</script>