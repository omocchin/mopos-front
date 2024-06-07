<template>
  <form @submit.prevent="submit">
    <div v-if="signUpPage == 'company'">
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
      color="accent"
      @click="emits('changeInput', 'user', 'User Information')"
    >
      Input User Info
    </v-btn>
    </div>
    <div v-if="signUpPage == 'user'">
      <v-text-field
        label="First Name"
        v-model="firstName.value.value"
        :error-messages="firstName.errorMessage.value"
      />
      <v-text-field
        label="Last Name"
        v-model="lastName.value.value"
        :error-messages="lastName.errorMessage.value"
      />
      <base-select
        v-model="authority.value.value"
        :error-message="authority.errorMessage.value"
        :items="signUpAuthorities"
        item-title="name"
        item-value="id"
        label="Authority"
      />
      <v-text-field
        label="Pay"
        v-model="pay.value.value"
        :error-messages="pay.errorMessage.value"
      />
      <v-text-field
        label="User Number"
        v-model="userNumber.value.value"
        :error-messages="userNumber.errorMessage.value"
      />
      <v-text-field
        label="Login ID"
        v-model="userLoginId.value.value"
        :error-messages="userLoginId.errorMessage.value"
      />
      <v-text-field
        label="Password"
        v-model="userPassword.value.value"
        :error-messages="userPassword.errorMessage.value"
        :append-inner-icon="uservisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="uservisible ? 'text' : 'password'"
        @click:append-inner="uservisible = !visible"
      />
      <v-text-field
        label="Password Confirmation"
        v-model="userPasswordConfirmation.value.value"
        :error-messages="userPasswordConfirmation.errorMessage.value"
        :append-inner-icon="userVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
        :type="userVisibleConfirm ? 'text' : 'password'"
        @click:append-inner="userVisibleConfirm = !visible"
      />
      <v-btn
        class="me-4 w-100"
        color="accent"
        type="submit"
      >
        submit
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseSelect from '../ui/BaseSelect.vue';
import { useField, useForm } from 'vee-validate'
import { telFormat, emailFormat, alNumSymOnly, numOnly, containCapital, containSymbol, alNumSymSpaceOnly, alOnly, numDecimal, alNum } from '~/utils/validations/regex'
import { requestCreateCompanyUser } from '~/composables/useCompanyUser';
import { requestCreateUser } from '#imports';
import type { ErrorResponse } from '~/utils/interfaces/errors';
import { signUpAuthorities } from '~/utils/variables/management/authoritySelections'

interface Props {
  signUpPage: String
}

const props = withDefaults(defineProps<Props>(), {
  signUpPage: undefined
})

const emits = defineEmits(['signUpComplete', 'changeInput'])

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
    firstName (value: string) {
      if (!value || value?.length == 0) {
        return 'First name is required'
      }
      if (!alOnly.test(value)) {
        return 'Alphabets only'
      }
      return true
    },
    lastName (value: string) {
      if (!value || value?.length == 0) {
        return 'Last name is required'
      }
      if (!alOnly.test(value)) {
        return 'Alphabets only'
      }
      return true
    },
    authority(value: number) {
      if (!value) {
        return 'Authority is required'
      }
      return true
    },
    pay (value: number) {
      if (!value) {
        return 'First name is required'
      }
      if (!numDecimal.test(String(value))) {
        return 'Numbers or decimal numbers only'
      }
      return true
    },
    userNumber (value: number) {
      if (!value) {
        return 'User number is required'
      } if (!numOnly.test(String(value))) {
        return 'Numbers only'
      } if (!/^\d{8}$/.test(String(value))) {
        return 'Enter in 8 digits'
      }
      return true
    },
    userLoginId (value: string) {
      if (!value || value?.length == 0) {
        return 'Login ID is required'
      } if (!alNum.test(value)) {
        return 'Alphabets only'
      } if (!/^.{5,}$/.test(value)) {
        return 'Enter 5 or more characters'
      }
      return true
    },
    userPassword (value: string) {
      if (!value || value?.length == 0) {
        return 'Password is required'
      } if (!alNumSymOnly.test(value)) {
        return 'Alphabets, numbers and !@#$%^&*.? are only allowed'
      } if (!/^.{8,}$/.test(value)) {
        return 'Enter 8 or more characters'
      }
      return true
    },
    userPasswordConfirmation (value: string) {
      if (!value || value?.length == 0) {
        return 'Password Confirmation is required'
      } if (userPassword.value.value != value) {
        return 'Is not matching with password'
      }
      return true
    }
  },
})

const name = useField('name')
const email = useField('email')
const tel = useField('tel')
const loginId = useField('loginId')
const password = useField('password')
const passwordConfirmation = useField('passwordConfirmation')
const firstName = useField('firstName')
const lastName = useField('lastName')
const authority = useField('authority')
const pay = useField('pay')
const userNumber = useField('userNumber')
const userLoginId = useField('userLoginId')
const userPassword = useField('userPassword')
const userPasswordConfirmation = useField('userPasswordConfirmation')

const visible = ref<boolean>(false)
const visibleConfirm = ref<boolean>(false)
const uservisible = ref<boolean>(false)
const userVisibleConfirm = ref<boolean>(false)

const createCompanyUser = async(formValues: any) => {
  const [data, status, error] = await requestCreateCompanyUser({
    company_info: {
      name: formValues.name,
      email: formValues.email,
      tel: formValues.tel,
      login_id: formValues.loginId,
      password: formValues.password
    },
    user_info: {
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      user_authority: formValues.authority,
      pay: formValues.pay,
      user_number: formValues.userNumber,
      login_id: formValues.userLoginId,
      password: formValues.userPassword,
      password_confirmation: formValues.userPasswordConfirmation
    }
  })
  const errorResponse: ErrorResponse = error.value
  if (status.value === 'success') {
    emits('signUpComplete')
  } else {
    return errorResponse.data.message
  }
}

const createUser = async(formValues: any) => {
  const [data, status, error] = await requestCreateUser({
    first_name: formValues.firstName,
    last_name: formValues.lastName,
    authority: formValues.authority,
    pay: formValues.pay,
    user_number: formValues.userNumber,
    login_id: formValues.userLoginId,
    password: formValues.userPassword,
    password_confirmation: formValues.userPasswordConfirmation
  })
  const errorResponse: ErrorResponse = error.value
  if (status.value === 'success') {
    emits('signUpComplete')
  } else {
    return errorResponse
  }
}

const submit = handleSubmit(values => {
  createCompanyUser(values)
})
</script>
