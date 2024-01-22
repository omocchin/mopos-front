<template>
  <div class="h-100 d-flex justify-center align-center">
    <base-card :customClass="['pa-3']" width="400">
      <h1 class="d-flex justify-center">{{ title }}</h1>
      <slot></slot>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue';

interface Props {
  title: String
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined
})
</script>