<template>
  <auth-base title="SIGNUP">
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
      <custom-button
        mode="button"
        class="w-100"
        type="submit"
        text="signup"
        @action="login"
      />
    </form>
    <custom-button
      mode="link"
      link="/auth/login"
      class="w-100"
      text="Login instead"
    />
  </auth-base>
</template>

<script setup lang="ts">
import { ref } from '#imports';
import { requestCompanyLogin } from '#imports';
import AuthBase from '~/components/auth/AuthBase.vue';
import CustomInput from '~/components/input/CustomInput.vue'
import CustomButton from '~/components/input/CustomButton.vue';

const loginId = ref()
const password = ref()

const login = async () => {
  const data = await requestCompanyLogin({
    "login_id": loginId.value,
    "password": password.value
  })
  if (data) {
    console.log('success')
    console.log(data.value)
  } else {
    console.log('error')
  }
}

</script>
