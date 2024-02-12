<template>
  <form @submit.prevent="submit">
    <base-card
      width="100%"
      class="pa-5 mb-5"
      color="primary rounded-lg"
      style="display: inline-table;"
    >
      <div class="d-flex flex-column w-100 h-100">
        <div class="d-flex flex-row w-100">
          <base-text-field
            custom-class="pr-2 w-50"
            v-model="firstName.value.value"
            :error-message="firstName.errorMessage.value"
            label="First Name"
            icon="mdi-asterisk"
            icon-color="red"
            icon-size="x-small"
          />
          <base-text-field
            custom-class="pl-2 w-50"
            v-model="lastName.value.value"
            :error-message="lastName.errorMessage.value"
            label="Last Name"
            icon="mdi-asterisk"
            icon-color="red"
            icon-size="x-small"
          />
        </div>
        <base-text-field
          v-model="tel.value.value"
          :error-message="tel.errorMessage.value"
          label="Tel"
        />
        <base-text-field
          v-model="email.value.value"
          :error-message="email.errorMessage.value"
          label="Email"
        />
        <base-select
          v-model="authority.value.value"
          :error-message="authority.errorMessage.value"
          :items="authorities"
          item-title="name"
          item-value="id"
          label="Authority"
          icon="mdi-asterisk"
          icon-color="red"
          icon-size="x-small"
        />
        <base-text-field
          v-model="pay.value.value"
          :error-message="pay.errorMessage.value"
          label="Pay"
          icon="mdi-asterisk"
          icon-color="red"
          icon-size="x-small"
        />
        <base-text-field
          v-model="userNumber.value.value"
          :error-message="userNumber.errorMessage.value"
          label="User Number"
          icon="mdi-asterisk"
          icon-color="red"
          icon-size="x-small"
        />
        <base-text-field
          v-model="loginId.value.value"
          :error-message="loginId.errorMessage.value"
          label="Login ID"
          icon="mdi-asterisk"
          icon-color="red"
          icon-size="x-small"
        />
        <base-text-field
          v-model="password.value.value"
          :error-message="password.errorMessage.value"
          label="Password"
          type="password"
          icon="mdi-asterisk"
          icon-color="red"
          icon-size="x-small"
        />
        <base-text-field
          v-model="passwordConfirmation.value.value"
          :error-message="passwordConfirmation.errorMessage.value"
          label="Password Confirmation"
          type="password"
          icon="mdi-asterisk"
          icon-color="red"
          icon-size="x-small"
        />
      </div>
    </base-card>
    <v-btn
      class="me-4 w-100"
      type="submit"
      color="accent"
    >
      submit
    </v-btn>
  </form>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseTextField from '~/components/ui/BaseTextField.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'
import { useField, useForm } from 'vee-validate'
import { alOnly, telFormat, emailFormat, numDecimal, numOnly, alNumSymOnly } from '~/utils/validations/regex'
import { authorities } from '~/utils/variables/management/authoritySelections'
import { type ErrorResponse } from '~/utils/interfaces/errors'
import { snakeToCamel } from '~/utils/functions/caseConversion'

interface Props {
  errorResponse: ErrorResponse
}

const props = withDefaults(defineProps<Props>(), {
  errorResponse: undefined
})

const emits = defineEmits(['formSubmit'])

const { handleSubmit, setFieldError } = useForm({
  validationSchema: {
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
    tel (value: string) {
      if (value?.length > 0 && !telFormat.test(value)) {
        return 'Phone number is not in correct format'
      }
      return true
    },
    email (value: string) {
      if (value?.length > 0 && !emailFormat.test(value)) {
        return 'Email not in correct format'
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
    loginId (value: string) {
      if (!value || value?.length == 0) {
        return 'Login ID is required'
      } if (!alOnly.test(value)) {
        return 'Alphabets only'
      } if (!/^.{5,}$/.test(value)) {
        return 'Enter 5 or more characters'
      }
      return true
    },
    password (value: string) {
      if (!value || value?.length == 0) {
        return 'Password is required'
      } if (!alNumSymOnly.test(value)) {
        return 'Alphabets, numbers and !@#$%^&*.? are only allowed'
      } if (!/^.{8,}$/.test(value)) {
        return 'Enter 8 or more characters'
      }
      return true
    },
    passwordConfirmation (value: string) {
      if (!value || value?.length == 0) {
        return 'Password Confirmation is required'
      } if (password.value.value != value) {
        return 'Is not matching with password'
      }
      return true
    }
  },
})

const firstName = useField('firstName')
const lastName = useField('lastName')
const tel = useField('tel')
const email = useField('email')
const authority = useField('authority')
const pay = useField('pay')
const userNumber = useField('userNumber')
const loginId = useField('loginId')
const password = useField('password')
const passwordConfirmation = useField('passwordConfirmation')

const submit = handleSubmit(values => {
  console.log('values', values)
  const body = {
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    tel: values.tel?.trim(),
    email: values.email?.trim(),
    user_authority: values.authority,
    pay: Number(values.pay.trim()),
    user_number: Number(values.userNumber.trim()),
    login_id: values.loginId.trim(),
    password: values.password.trim(),
    password_confirmation: values.passwordConfirmation.trim()
  }
  console.log('body', body)
  emits('formSubmit', body)
})

watch(
  () => props.errorResponse,
  (value: ErrorResponse) => {
    if (value.statusCode == 422) {
      if (!value.data.model) return
      const model: string = value.data.model
      setFieldError(snakeToCamel(model), value.data.message)
    }
  }
)
</script>