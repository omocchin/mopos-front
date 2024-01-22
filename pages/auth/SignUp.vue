<template>
  <auth-base title="SIGNUP">
    <sign-up-form v-if="!signUpCompletion" @sign-up-complete="signUpCompletion = !signUpCompletion"/>
    <sign-up-completion v-else-if="signUpCompletion"/>
    <custom-button
      mode="link"
      link="/auth/login"
      class="w-100"
      :text="!signUpCompletion ? 'Login instead' : 'Go to Login'"
    />
  </auth-base>
</template>

<script setup lang="ts">
import AuthBase from '~/components/auth/AuthBase.vue';
import CustomButton from '~/components/input/CustomButton.vue';
import SignUpForm from '~/components/auth/SignUpForm.vue';
import SignUpCompletion from '~/components/auth/SIgnUpCompletion.vue';

const snackBar = ref<boolean>(false)
const barMessage = ref<string>('')
const barColor = ref<string>('')
const signUpCompletion = ref<boolean>(false)
</script>
