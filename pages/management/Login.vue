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
    <custom-button
      mode="link"
      link="/auth/signup"
      class="w-100"
      text="Signup instead"
    />
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

const userNumber = ref()
const password = ref()
</script>