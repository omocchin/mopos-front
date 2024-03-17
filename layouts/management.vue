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
      <v-btn class="text-h5 text-accent" to="/management/home" variant="plain">MOPOS</v-btn>
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
import BaseDialog from '~/components/ui/BaseDialog.vue';
import { ref } from 'vue';
import { managementItems } from '~/utils/variables/managementItems';
import { requestCompanyTokenAuth, requestUserTokenAuth } from '~/composables/useAuth'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const userStore = useUserStore()
const { companyName } = authStore
const { userName, userLogout } = userStore
const router = useRouter()

const drawer = ref<boolean>(false)
const company = ref<string>('')
const user = ref<string>('')
const dialog = ref<boolean>(false)
const dialogTitle = ref<string>('')
const dialogBody = ref<string>('')
const dialogRoute = ref<string>('')

const menuEvent = async (event: string) => {
  if (event === 'signout') {
    const result = await userLogout()
    if (result) {
      router.push({path: '/home'})
    }
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
</script>

<style scoped>
.company-user-selector {
  max-width: 25%;
}
</style>
