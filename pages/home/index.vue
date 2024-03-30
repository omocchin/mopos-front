<template>
  <base-snack-bar :model-value="snackBar" @close-bar="barControl" :message="barMessage" :color="barColor"/>
  <clock-modal v-if="clockInOut"  @close="closeClock"/>
  <div class="w-100 h-100 d-flex flex-wrap flex-row">
    <div v-for="menu in menuItems" :key="menu.title" class="w-50 h-50 pa-4">
      <base-button
        :mode="menu.mode"
        :width="'100%'"
        :height="'100%'"
        :color="'primary'"
        :link="menu.link"
        :style="'font-size: 4vw;'"
        :value="menu.value"
        @action="menuEvent"
      >
        {{ menu.title }}
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue';
import ClockModal from '~/components/home/ClockModal.vue';
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';
import { type ClockInOutResponse } from '#imports';
import { useTheme } from 'vuetify'

const menuItems = [
  {
    mode: 'to',
    title: 'CASHIER',
    link: '/cashier'
  },
  {
    mode: 'to',
    title: 'HISTORY',
    link: '/auth/login'
  },
  {
    mode: 'action',
    value: 'clock_in_out',
    title: 'CLOCK IN/OUT',
  },
  {
    mode: 'action',
    value: 'management', 
    title: 'MANAGEMENT',
  },
]

const snackBar = ref<boolean>(false)
const barMessage = ref<string>('')
const barColor = ref<string>('')
const clockInOut = ref<boolean>(false)
const theme = useTheme()
const router = useRouter()

definePageMeta({
  layout: 'custom'
})

const menuEvent = (targetAction: string) => {
  if (targetAction === 'clock_in_out') {
    clockInOut.value = true
  } else if (targetAction === 'management') {
    // theme.global.name.value = 'myCustomDarkTheme'
    router.push({path: '/management/auth/login'})
  }
}

const barControl = (message?: string, color?: string) => {
  if (message) barMessage.value = message
  if (color) barColor.value = color
  snackBar.value = !snackBar.value
}

const closeClock = (event: ClockInOutResponse) =>{
  clockInOut.value = !clockInOut.value
  if (event.status === 'clocked_in') {
    barControl(`Hello ${event.first_name}, have a nice shift.`, 'clockin')
  } else if (event.status === 'clocked_out') {
    barControl(`Bye ${event.first_name}, please go home safe.`, 'clockout')
  } else {
    return
  }
}

onMounted(() => {
  theme.global.name.value = 'myCustomLightTheme'
})
</script>
