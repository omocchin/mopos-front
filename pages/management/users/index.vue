<template>
  <table-base
    title="USERS"
    actionButton="create user"
    searchTitle="user name ot user number"
    searchSelectTitle="status"
    page="page"
    :select-items="statuses"
    @search-action="searchUsers"
  >
    <users-table
      :headers="headers"
      :items="users"
      :page="page"
      :totalPages="totalPages"
      @movePage="movePage($event)"
    >
    </users-table>
  </table-base>
</template>

<script setup lang="ts">
import TableBase from '~/components/management/TableBase.vue';
import UsersTable from '~/components/management/users/UsersTable.vue';
import { useTheme } from 'vuetify'
import { userHeader } from '~/utils/variables/headers/usersHeaders'
import { ITEMS_PER_TABLE } from '~/utils/variables/global'
import { requestUsers, type Users} from '~/composables/useUser'
import { statuses } from '~/utils/variables/management/users'

definePageMeta({
  layout: 'management'
})

const theme = useTheme()
const users = ref<Array<Users>>([])
const page = ref<number | undefined>(undefined)
const totalPages = ref<number>(0)
const load = ref<boolean>(false)
const headers = ref()

const getUsers = async (currentPage: number, keyword?: string, status?: string) => {
  load.value = true
  await requestUsers(currentPage, ITEMS_PER_TABLE, keyword, status).then((data) => {
    users.value = data.value.users
    page.value = data.value.current_page
    totalPages.value = data.value.total_pages
    load.value = false
  })
}

const movePage = async (nextPage: number) => {
  await getUsers(nextPage)
}

const searchUsers = async (keyword: string, selectedStatus: string) => {
  await getUsers(1, keyword, selectedStatus)
}

onMounted(async () => {
  theme.global.name.value = 'myCustomDarkTheme'
  headers.value = userHeader
  nextTick(async () => {
    await getUsers(page.value || 1)
  })
})
</script>