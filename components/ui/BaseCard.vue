<template>
  <v-card
    :class="customClass"
    :color="color || 'background'"
    :elevation="elevation || 16"
    :width="width"
    :height="height"
  >
    <slot></slot>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  width?: string | number
  height?: string | number
  customClass?: Array<string> | string
  color?: string
  elevation?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '',
  height: '',
  customClass: undefined,
  color: undefined,
  elevation: undefined
})
</script>
