<template>
  <div class="h-100 d-flex flex-column justify-center align-center">
    <base-card :customClass="['pa-3']" width="400">
      <h1 class="d-flex justify-center">{{ title }}</h1>
      <slot></slot>
    </base-card>
    <v-btn
      variant="text"
      color="accent"
      @click="emits('demoLogin')"
    >
      {{ route.path.includes('management') ? 'DEMO USER LOGIN' : 'DEMO COMPANY LOGIN' }}
  </v-btn>
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

const route = useRoute()
const emits = defineEmits(['demoLogin'])
</script>