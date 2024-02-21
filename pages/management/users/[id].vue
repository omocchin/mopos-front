<template>
  <base-snack-bar :model-value="snackBar" @close-bar="barControl" :message="barMessage" :color="barColor"/>
  <div class="d-flex justify-center pa-5 h-100 w-100">
    <div class="d-flex flex-column w-50 h-100">
      <div class="mb-5">
        <p class="font-weight-bold text-h5">EDIT USER</p>
      </div>
      <user-form
        :error-response="errorResponse"
        :edit-page="true"
        :user="user"
        @form-submit="editUser"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserForm from '~/components/management/users/UserForm.vue'
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';
import { useTheme } from 'vuetify'
import { requestGetUser } from '#imports';
import { type GetUserResponse, requestEditUser } from '#imports';

definePageMeta({
  layout: 'management'
})

const theme = useTheme()
const route = useRoute()
const router = useRouter()
const userId = ref<any>()
const user = ref<GetUserResponse>()
const snackBar = ref<boolean>(false)
const barMessage = ref<string>('')
const barColor = ref<string>('')
const errorResponse = ref<any>()

const getUser = async (userId: any) => {
  const [data, status, error] = await requestGetUser(userId)
  if (status.value === 'success') {
    user.value = data.value
  } else {
    if (error.value.statusCode == 404) {
      barControl('User Not Found', 'error')
    }
  }
}

const editUser = async (body: any) => {
  const [data, status, error] = await requestEditUser(userId.value, body)
  if (status.value === 'success') {
    barControl('Successfully edited user', 'success')
    router.push({path: `/management/users/${userId.value}`})
  } else {
    errorResponse.value = error.value
  }
}

const barControl = (message?: string, color?: string) => {
  if (message) barMessage.value = message
  if (color) barColor.value = color
  snackBar.value = !snackBar.value
}


onMounted(async () => {
  theme.global.name.value = 'myCustomDarkTheme'
  userId.value = route.params.id
  console.log(userId.value)
  nextTick(async () => {
    await getUser(userId.value)
  })
})
</script>