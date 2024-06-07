<template>
  <auth-base
    title="SIGNUP"
    :sub-title="subTitle"
  >
    <v-btn
      v-if="signUpPage == 'user'"
      class="ma-2"
      density="compact"
      icon="mdi-arrow-left"
      variant="text"
      @click="changeInput('company', 'Company Information')"
    ></v-btn>
    <sign-up-form
      v-if="!signUpCompletion"
      @sign-up-complete="signUpCompletion = !signUpCompletion"
      @change-input="changeInput"
      :sign-up-page="signUpPage"
    />
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
const subTitle = ref<string>('Company Information')
const signUpPage = ref<string>('company')

const changeInput = (page: string, title: string) => {
  signUpPage.value = page
  subTitle.value = title
}
</script>
