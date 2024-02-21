<template>
  <div class="d-flex justify-center pa-5 h-100 w-100">
    <div class="d-flex flex-column w-50 h-100">
      <div class="mb-5">
        <p class="font-weight-bold text-h5">CREATE NEW USER</p>
      </div>
      <user-form
        :error-response="errorResponse"
        :edit-page="false"
        @form-submit="createUser"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserForm from '~/components/management/users/UserForm.vue'
import { useTheme } from 'vuetify'
import { requestCreateUser } from '#imports';

definePageMeta({
  layout: 'management'
})

const theme = useTheme()

onMounted(async () => {
  theme.global.name.value = 'myCustomDarkTheme'
})

const errorResponse = ref<any>()

const createUser = async (body: any) => {
  const [data, status, error] = await requestCreateUser(body)
  if (status.value === 'success') {
    console.log('success')
  } else {
    errorResponse.value = error.value
  }
}
</script>