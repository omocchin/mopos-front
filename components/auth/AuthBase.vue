<template>
  <div class="h-100 d-flex flex-column justify-center align-center">
    <base-card :customClass="['pa-3']" width="400">
      <h1 class="d-flex justify-center">{{ title }}</h1>
      <h2 v-if="subTitle" class="d-flex justify-center text-accent">{{ subTitle }}</h2>
      <slot></slot>
    </base-card>
    <v-btn
      v-if="route.path.includes('management') && companyId != config.public.demoCompanyId ? false : true"
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
import { useAuthStore } from '~/stores/auth'

interface Props {
  title: String
  subTitle?: String
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  subTitle: undefined
})

const route = useRoute()
const authStore = useAuthStore()
const { companyId } = authStore
const emits = defineEmits(['demoLogin'])
const config = useRuntimeConfig()
</script>