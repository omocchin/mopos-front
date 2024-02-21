<template>
  <form @submit.prevent="submit">
    <v-text-field
      label="Company Name"
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
    />
    <v-text-field
      label="Email"
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
    />
    <v-text-field
      label="Tel"
      v-model="tel.value.value"
      :error-messages="tel.errorMessage.value"
    />
    <v-text-field
      label="Login ID"
      v-model="loginId.value.value"
      :error-messages="loginId.errorMessage.value"
    />
    <v-text-field
      label="Password"
      v-model="password.value.value"
      :error-messages="password.errorMessage.value"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      @click:append-inner="visible = !visible"
    />
    <v-text-field
      label="Password Confirmation"
      v-model="passwordConfirmation.value.value"
      :error-messages="passwordConfirmation.errorMessage.value"
      :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visibleConfirm ? 'text' : 'password'"
      @click:append-inner="visibleConfirm = !visibleConfirm"
    />
    <v-btn
      class="me-4 w-100"
      type="submit"
    >
      submit
    </v-btn>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { telFormat, emailFormat, alNumSymOnly, numOnly, containCapital, containSymbol, alNumSymSpaceOnly } from '~/utils/validations/regex'
import { requestCreateCompanyUser } from '~/composables/useCompanyUser';
import type { ErrorResponse } from '~/utils/interfaces/errors';

const emits = defineEmits(['signUpComplete'])

const { handleSubmit, setFieldError } = useForm({
  validationSchema: {
    name (value: string) {
      if (!alNumSymSpaceOnly.test(value)) {
        return 'Alphabets, numbers, symbols are only allowed'
      }
      return true
    },
    email (value:string) {
      if (value?.length == 0) {
        return 'Email is required'
      }
      if (!alNumSymOnly.test(value)) {
        return 'Alphabets, numbers, symbols are only allowed'
      }
      if (!emailFormat.test(value)) {
        return 'Not in email format'
      }
      return true
    },
    tel (value: string) {
      if (value?.includes('-')) {
        return 'Enter without hyphens'
      }
      if (!numOnly.test(value)) {
        return 'Numbers are only allowed'
      }
      if (!telFormat.test(value)) {
        return 'Not in telephone number format'
      }
      return true
    },
    loginId (value: string) {
      if (value?.length == 0) {
        return 'Login ID is required'
      }
      if (!alNumSymOnly.test(value)) {
        return 'Alphabets, numbers, symbols are only allowed'
      }
      if (value?.length < 6) {
        return 'Login ID must be more than 6 characters'
      }
      return true
    },
    password (value: string) {
      if (value?.length == 0) {
        return 'Password is required'
      }
      if (!alNumSymOnly.test(value)) {
        return 'Alphabets, numbers, symbols are only allowed'
      }
      if (value?.length < 8) {
        return 'Password must be more than 8 characters'
      }
      if (!containCapital.test(value)) {
        return 'Contain at least 1 capital character'
      }
      if (!containSymbol.test(value)) {
        return 'Contain at least 1 symbol'
      }
      return true
    },
    passwordConfirmation (value: string) {
      if (password.value.value != value) {
        return 'Does not match password'
      }
      return true
    },
  },
})

const name = useField('name')
const email = useField('email')
const tel = useField('tel')
const loginId = useField('loginId')
const password = useField('password')
const passwordConfirmation = useField('passwordConfirmation')

const visible = ref<boolean>(false)
const visibleConfirm = ref<boolean>(false)

const createCompanyUser = async(formValues: any) => {
  const [data, status, error] = await requestCreateCompanyUser({
    name: formValues.name,
    email: formValues.email,
    tel: formValues.tel,
    login_id: formValues.loginId,
    password: formValues.password
  })
  const errorResponse: ErrorResponse = error.value
  if (status.value === 'success') {
    emits('signUpComplete')
  } else {
    setFieldError('loginId', errorResponse.data.message)
  }
}

const submit = handleSubmit(values => {
  createCompanyUser(values)
})
</script>
