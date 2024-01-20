<template>
  <base-snack-bar :model-value="snackBar" @close-bar="barControl" :message="barMessage" :color="barColor"/>
  <clock-modal v-if="activeClock" @close="closeClock"/>
  <v-layout>
    <v-app-bar rounded color="secondary" density="comfortable">
      <v-app-bar-nav-icon icon="$menu" @click.stop="drawer = !drawer" />
      <v-app-bar-title>MiPOS</v-app-bar-title>
      <v-spacer/>
      <v-input
        class="company-user-selector"
        prepend-icon="mdi-office-building-outline"
        hide-details
      >
        {{ companyName }}
      </v-input>
      <v-select
        class="company-user-selector"
        v-model="selectedUser"
        :items="activeUsers"
        item-title="first_name"
        item-value="user_number"
        prepend-icon="mdi-account"
        label="Current User"
        no-data-text="No users available"
        hide-details
      />
    </v-app-bar>
    <v-navigation-drawer
      color="primary"
      v-model="drawer"
      location="left"
      temporary
    >
      <v-list nav>
        <v-list-item
          v-for="item in drawerItems"
          :key="item.value"
          :to="item.action === 'url' ? item.url : undefined"
          :prepend-icon="item.icon"
          @click="item.action === 'event' ? menuEvent(item.value) : undefined"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import ClockModal from '~/components/home/ClockModal.vue';
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';
import { ref } from 'vue';
import { drawerItems } from '~/utils/variables/navBarItems';
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
const userStore = useUserStore()
const { companyName } = authStore
const { activeUsers, currentUser, setCurrentUser } = userStore

const drawer = ref<boolean>(false)
const selectedUser = ref()
const activeClock = ref<boolean>(false)
const snackBar = ref<boolean>(false)
const barMessage = ref<string>('')
const barColor = ref<string>('')

const menuEvent = (event: string) => {
  if (event === 'clockInOut') {
    activeClock.value = !activeClock.value
  }
}

const barControl = (message?: string, color?: string) => {
  if (message) barMessage.value = message
  if (color) barColor.value = color
  snackBar.value = !snackBar.value
}

const closeClock = (event: ClockInOutResponse) =>{
  activeClock.value = !activeClock.value
  if (event.status === 'clocked_in') {
    barControl(`Hello ${event.first_name}, have a nice shift.`, 'clockin')
  } else if (event.status === 'clocked_out') {
    barControl(`Bye ${event.first_name}, please go home safe.`, 'clockout')
  } else {
    barControl()
  }
}

onMounted(() => {
  selectedUser.value =  activeUsers.find(({user_number}) => user_number == currentUser)?.user_number
})

watch(selectedUser, (newValue) => {
  setCurrentUser(newValue === '' ? null : selectedUser.value)
})

watch(activeUsers, (newValue) => {
  if (newValue.length == 0) {
    selectedUser.value = ''
  }
})
</script>

<style scoped>
.company-user-selector {
  max-width: 25%;
}
</style>
