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
          v-if="!editPage"
          v-model="password.value.value"
          :error-message="password.errorMessage.value"
          label="Password"
          type="password"
          :icon="editPage ? undefined : 'mdi-asterisk'"
          icon-color="red"
          icon-size="x-small"
        />
        <base-text-field
          v-if="!editPage"
          v-model="passwordConfirmation.value.value"
          :error-message="passwordConfirmation.errorMessage.value"
          label="Password Confirmation"
          type="password"
          :icon="editPage ? undefined : 'mdi-asterisk'"
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
      {{ editPage ? 'EDIT USER' : 'CREATE USER'}}
    </v-btn>
  </form>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseTextField from '~/components/ui/BaseTextField.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'
import { useField, useForm } from 'vee-validate'
import { alOnly, alNum, telFormat, emailFormat, numDecimal, numOnly, alNumSymOnly } from '~/utils/validations/regex'
import { authorities } from '~/utils/variables/management/authoritySelections'
import { type ErrorResponse } from '~/utils/interfaces/errors'
import { snakeToCamel } from '~/utils/functions/caseConversion'
import { type GetUserResponse } from '#imports'

interface Props {
  errorResponse: ErrorResponse
  editPage: boolean
  user?: GetUserResponse
}

const props = withDefaults(defineProps<Props>(), {
  errorResponse: undefined,
  editPage: false,
  user: undefined
})

const emits = defineEmits(['formSubmit'])

const { handleSubmit, setFieldError, setFieldValue } = useForm({
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
      } if (!alNum.test(value)) {
        return 'Alphabets only'
      } if (!/^.{5,}$/.test(value)) {
        return 'Enter 5 or more characters'
      }
      return true
    },
    password (value: string) {
      if (props.editPage) {
        return true
      }
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
      if (props.editPage) {
        return true
      }
      if (!value || value?.length == 0) {
        return 'Password Confirmation is required'
      } if (password.value.value != value) {
        return 'Is not matching with password'
      }
      return true
    }
  }
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
  let body = null
  if (props.editPage) {
    body = {
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      tel: values.tel?.trim(),
      email: values.email?.trim(),
      user_authority: values.authority,
      pay: Number(values.pay),
      user_number: Number(values.userNumber),
      login_id: values.loginId.trim(),
    }
  } else {
    body = {
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      tel: values.tel?.trim(),
      email: values.email?.trim(),
      user_authority: values.authority,
      pay: Number(values.pay),
      user_number: Number(values.userNumber),
      login_id: values.loginId.trim(),
      password: values.password?.trim(),
      password_confirmation: values.passwordConfirmation?.trim()
    }
  }
  emits('formSubmit', body)
})

const setInitialValues = (userInfo: GetUserResponse) => {
  setFieldValue('firstName', userInfo.first_name)
  setFieldValue('lastName', userInfo.last_name)
  setFieldValue('tel', userInfo.tel)
  setFieldValue('email', userInfo.email)
  setFieldValue('authority', userInfo.user_authority_id)
  setFieldValue('pay', userInfo.pay)
  setFieldValue('userNumber', userInfo.user_number)
  setFieldValue('loginId', userInfo.login_id)
}

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

watch(
  () => props.user,
  (value: any) => {
    setInitialValues(value)
  }
)
</script>