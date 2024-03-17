<template>
  <base-snack-bar :model-value="snackBar" @close-bar="barControl" :message="barMessage" :color="barColor"/>
  <base-dialog
    :dialog="dialog"
    title="CAUTION"
    body="The selected users will be deleted. Are you sure you want to proceed?"
    action-text="DELETE"
    @close="dialog = false"
    @action="deleteUsers"
  />
  <table-base
    title="USERS"
    actionButton="create user"
    searchTitle="user name ot user number"
    searchSelectTitle="status"
    page="page"
    optional-action-button="delete user"
    :optional-action-values="selectedIds"
    :select-items="statuses"
    @search-action="searchUsers"
    @action="createPage"
    @optional-action="dialog = true"
  >
    <users-table
      :headers="headers"
      :items="users"
      :page="page"
      :totalPages="totalPages"
      @movePage="movePage"
      @row-event="rowEvent"
      @selected-event="selectedEvent"
    >
    </users-table>
  </table-base>
</template>

<script setup lang="ts">
import TableBase from '~/components/management/TableBase.vue';
import UsersTable from '~/components/management/users/UsersTable.vue';
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';
import BaseDialog from '~/components/ui/BaseDialog.vue';
import { useTheme } from 'vuetify'
import { userHeader } from '~/utils/variables/headers/headers'
import { ITEMS_PER_TABLE } from '~/utils/variables/global'
import { requestUsers, requestDeleteUsers, type Users} from '~/composables/useUser'
import { statuses } from '~/utils/variables/management/users'

definePageMeta({
  layout: 'management'
})

const theme = useTheme()
const route = useRoute()
const router = useRouter()
const users = ref<Array<Users>>([])
const page = ref<number | undefined>(undefined)
const totalPages = ref<number>(0)
const load = ref<boolean>(false)
const headers = ref()
const searchKeyword = ref<string>()
const searchStatus = ref<string>()
const selectedIds = ref<Array<number> | any>()
const snackBar = ref<boolean>(false)
const barMessage = ref<string>('')
const barColor = ref<string>('')
const dialog = ref<boolean>(false)

const getUsers = async (currentPage: number, keyword?: string, status?: string) => {
  load.value = true
  searchKeyword.value = keyword
  searchStatus.value = status
  await requestUsers(currentPage, ITEMS_PER_TABLE, keyword, status).then((data) => {
    users.value = data.value.users
    page.value = data.value.current_page
    totalPages.value = data.value.total_pages
    load.value = false
  })
}

const movePage = async (nextPage: number) => {
  await getUsers(nextPage, searchKeyword.value, searchStatus.value)
}

const searchUsers = async (keyword: string, selectedStatus: string) => {
  await getUsers(1, keyword, selectedStatus)
}

const barControl = (message?: string, color?: string) => {
  if (message) barMessage.value = message
  if (color) barColor.value = color
  snackBar.value = !snackBar.value
}

const deleteUsers = async () => {
  dialog.value = false
  const [data, status, error] = await requestDeleteUsers({ids: selectedIds.value})
  if (status.value === 'success') {
    barControl('Successfully deleted users', 'success')
    movePage(1)
  } else {
    console.log(error.value.data)
    // errorResponse.value = error.value
  }
}

const createPage = () => {
  router.push({path: '/management/users/new'})
}

const rowEvent = (user: any) => {
  router.push({path: `/management/users/${user.id}`})
}

const selectedEvent = (items: any) => {
  console.log(items)
  selectedIds.value = items
}

onMounted(async () => {
  if (route.query.newUser === 'true') {
    barControl('Successfully created user', 'success')
  }
  theme.global.name.value = 'myCustomDarkTheme'
  headers.value = userHeader
  nextTick(async () => {
    await getUsers(page.value || 1)
  })
})
</script>
