<template>
  <auth-base title="USER LOGIN">
    <form @submit.prevent>
      <custom-input
        label="User Number"
        v-model="userNumber"
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
  </auth-base>
</template>

<script setup lang="ts">
import { ref, definePageMeta } from '#imports';
import AuthBase from '~/components/auth/AuthBase.vue';
import CustomInput from '~/components/input/CustomInput.vue'
import CustomButton from '~/components/input/CustomButton.vue';

definePageMeta({
  layout: 'custom'
})

const store = useUserStore()
const {userLogin} = store
const router = useRouter()

const userNumber = ref()
const password = ref()

const error = ref(false)
const errorMessage = ref()

const setError = (show: boolean, message: string) => {
  error.value = show
  errorMessage.value = message
}

const login = async () => {
  await userLogin({
    user_number: userNumber.value,
    password: password.value
  }).then((data) => {
    setError(false, '')
    router.push({path: '/management/home'})
  }).catch((e) => {
    if (e.status == 404) {
      setError(true, 'Incorrect ID or password. Please try again.')
    } else {
      setError(true, e.message)
    }
  })
}
</script>