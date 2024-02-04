<template>
<div class="h-100 d-flex justify-center">
  <div class="w-75 h-100 d-flex align-content-center flex-wrap">
    <div v-for="item in menuItems" :key="item.title" class="w-50 pa-4">
      <base-button
        :mode="item.mode"
        :width="'100%'"
        :height="'100%'"
        :color="'primary'"
        :link="item.link"
        :style="'font-size: 4vw;'"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.title }}
      </base-button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, definePageMeta, onMounted } from '#imports';
import { useTheme } from 'vuetify'
import BaseButton from '~/components/ui/BaseButton.vue';

definePageMeta({
  layout: 'management'
})

const theme = useTheme()
onMounted(() => {
  theme.global.name.value = 'myCustomDarkTheme'
})

const menuItems = [
  {
    mode: 'to',
    title: 'USERS',
    link: '/management/users',
    disabled: false
  },
  {
    mode: 'to',
    title: 'HISTORY',
    link: '/auth/login',
    disabled: true
  },
  {
    mode: 'action',
    value: 'clock_in_out',
    title: 'CLOCK IN/OUT',
    disabled: true
  },
  {
    mode: 'action',
    value: 'management', 
    title: 'MANAGEMENT',
    disabled: true
  },
]
</script>
