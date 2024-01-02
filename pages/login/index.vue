<template>
  <div class="h-100 d-flex justify-center align-center">
    <base-card width="300">
      <h1 class="d-flex justify-center">login</h1>
      <form @submit.prevent>
        <custom-input
          label="ID"
          v-model="loginId"
        />
        <div>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
          />
        </div>
        <div>
          <v-btn
            class="w-100"
            color="accent"
            type="submit"
            text="login"
            @click="login"
          />
        </div>
      </form>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports';
import { requestCompanyLogin } from '#imports';
import BaseCard from '~/components/ui/BaseCard.vue';
import CustomInput from '~/components/input/CustomInput.vue'

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
