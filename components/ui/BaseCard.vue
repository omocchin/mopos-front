<template>
  <v-card
    class="pa-3 ma-auto"
    color="background"
    elevation="16"
    :width="width"
  >
    <slot></slot>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  width: Number
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined
})
</script>
