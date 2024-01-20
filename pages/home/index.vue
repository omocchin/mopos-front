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

const menuItems = [
  {
    mode: 'to',
    title: 'CASHIER',
    link: '/auth/login'
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
    link: '/auth/login'
  },
  {
    mode: 'action',
    value: 'management', 
    title: 'MANAGEMENT',
    link: '/auth/login'
  },
]

const snackBar = ref<boolean>(false)
const barMessage = ref<string>('')
const barColor = ref<string>('')
const clockInOut = ref<boolean>(false)

definePageMeta({
  layout: 'custom'
})

const menuEvent = (targetAction: string) => {
  if (targetAction == 'clock_in_out') {
    clockInOut.value = true
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
    barControl()
  }
}
</script>
