<template>
  <!-- <base-snack-bar :model-value="snackBar" @close-bar="barControl" :message="barMessage" :color="barColor"/>
  <clock-modal v-if="activeClock" @close="closeClock"/> -->
  <base-dialog
    :dialog="dialog"
    :title="dialogTitle"
    :body="dialogBody"
    action-text="RE-LOGIN"
    :closable="false"
    @close="dialog = false"
    @action="toLogin"
  />
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
        {{ company }}
      </v-input>
      <v-input
        class="company-user-selector"
        prepend-icon="mdi-account"
        hide-details
      >
        {{ user }}
      </v-input>
    </v-app-bar>
    <v-navigation-drawer
      color="primary"
      v-model="drawer"
      location="left"
      temporary
    >
      <v-list nav>
        <v-list-item
          v-for="item in managementItems"
          :key="item.title"
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
// import ClockModal from '~/components/home/ClockModal.vue';
// import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';
import BaseDialog from '~/components/ui/BaseDialog.vue';
import { ref } from 'vue';
import { managementItems } from '~/utils/variables/managementItems';
import { requestCompanyTokenAuth, requestUserTokenAuth } from '~/composables/useAuth'

const authStore = useAuthStore()
const userStore = useUserStore()
// const router = useRouter()
const { companyName } = authStore
const { userName } = userStore
const router = useRouter()

const drawer = ref<boolean>(false)
const activeClock = ref<boolean>(false)
const company = ref<string>('')
const user = ref<string>('')
const dialog = ref<boolean>(false)
const dialogTitle = ref<string>('')
const dialogBody = ref<string>('')
const dialogRoute = ref<string>('')

// const snackBar = ref<boolean>(false)
// const barMessage = ref<string>('')
// const barColor = ref<string>('')
// const company = ref<string>('')

const menuEvent = async (event: string) => {
  if (event === 'signout') {
    console.log('signout')
  }
}

const setDialog = (title: string, body: string, route: string) => {
  dialog.value = true
  dialogTitle.value = title
  dialogBody.value = body
  dialogRoute.value = route
}

const toLogin = () => {
  router.push({path: dialogRoute.value})
}

onBeforeMount(async () => {
  await nextTick(async () => {
    const companyStatus = await requestCompanyTokenAuth()
    if (companyStatus.value === 'error') {
      setDialog(
        'COMPANY USER SESSION EXPIRED',
        'Your company user seesion has expired due expiration of the token. Please re-login to continue.',
        '/auth/login'
      )
    }
    const userStatus = await requestUserTokenAuth()
    if (userStatus.value === 'error') {
      setDialog(
        'MANAGEMENT USER SESSION EXPIRED',
        'Your managemant user seesion has expired due expiration of the token. Please re-login to continue.',
        '/management/auth/login'
      )
      // router.push({path: '/management/auth/login'})
    }
  })
})

onMounted(() => {
  company.value = companyName
  user.value = userName
})

// const barControl = (message?: string, color?: string) => {
//   if (message) barMessage.value = message
//   if (color) barColor.value = color
//   snackBar.value = !snackBar.value
// }

// const closeClock = (event: ClockInOutResponse) =>{
//   activeClock.value = !activeClock.value
//   if (event.status === 'clocked_in') {
//     barControl(`Hello ${event.first_name}, have a nice shift.`, 'clockin')
//   } else if (event.status === 'clocked_out') {
//     barControl(`Bye ${event.first_name}, please go home safe.`, 'clockout')
//   } else {
//     barControl()
//   }
// }

// onMounted(() => {
//   selectedUser.value =  activeUsers.find(({user_number}) => user_number == currentUser)?.user_number
//   company.value = companyName
// })

// watch(selectedUser, (newValue) => {
//   setCurrentUser(newValue === '' ? null : selectedUser.value)
// })

// watch(activeUsers, (newValue) => {
//   if (newValue.length == 0) {
//     selectedUser.value = ''
//   }
// })
</script>

<style scoped>
.company-user-selector {
  max-width: 25%;
}
</style>
