<template>
  <auth-base 
    title="LOGIN"
    @demo-login="demoLogin"
  >
    <form @submit.prevent>
      <custom-input
        label="ID"
        v-model="loginId"
      />
      <custom-input
        label="Password"
        v-model="password"
        :type="'password'"
      />
      <div v-if="error" class="d-flex justify-center mb-2">
        <p class="text-red">{{ errorMessage }}</p>
      </div>
      <custom-button
        mode="button"
        class="w-100"
        type="submit"
        text="login"
        @action="login"
      />
    </form>
    <custom-button
      mode="link"
      link="/auth/signup"
      class="w-100"
      text="Signup instead"
    />
  </auth-base>
</template>

<script setup lang="ts">
import { ref } from '#imports';
import AuthBase from '~/components/auth/AuthBase.vue';
import CustomInput from '~/components/input/CustomInput.vue'
import CustomButton from '~/components/input/CustomButton.vue';

const router = useRouter()
const store = useAuthStore()
const { companyLogin } = store

const loginId = ref()
const password = ref()

const error = ref(false)
const errorMessage = ref()

const setError = (show: boolean, message: string) => {
  error.value = show
  errorMessage.value = message
}

const login = async () => {
  await companyLogin(loginId.value, password.value).then((data) => {
    setError(false, '')
    router.push({path: '/home'})
  }).catch((e) => {
    if (e.status == 404) {
      setError(true, 'Incorrect ID or password. Please try again.')
    }
    else {
      setError(true, e.message)
    }
  })
}

const demoLogin = async () => {
  const config = useRuntimeConfig()
  await companyLogin(config.public.demoCompanyLoginId, config.public.demoCompanyLoginPassword).then((data) => {
    setError(false, '')
    router.push({path: '/home'})
  }).catch((e) => {
    if (e.status == 404) {
      setError(true, 'Incorrect ID or password. Please try again.')
    }
    else {
      setError(true, e.message)
    }
  })
}
</script>
