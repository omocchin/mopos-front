<template>
  <form @submit.prevent="submit">
    <base-card
      width="100%"
      class="pa-5 mb-5"
      color="primary rounded-lg"
      style="display: inline-table;"
    >
      <div class="d-flex flex-column w-100 h-100">
        <base-text-field
          v-model="name.value.value"
          :error-message="name.errorMessage.value"
          label="Name"
          icon="mdi-asterisk"
          icon-color="red"
          icon-size="x-small"
        />
        <div class="d-flex align-start w-100">
          <v-slide-x-transition hide-on-leave>
              <base-select
              v-if="!isNewCategory"
              v-model="category.value.value"
              custom-class="pr-2 w-75"
              :error-message="category.errorMessage.value"
              :items="categorySelection"
              item-title="name"
              item-value="name"
              label="Select Existing Category"
              icon="mdi-asterisk"
              icon-color="red"
              icon-size="x-small"
            />
            <base-text-field
              v-else
              v-model="newCategory.value.value"
              custom-class="pr-2 w-75"
              :error-message="newCategory.errorMessage.value"
              label="New Category"
              icon="mdi-asterisk"
              icon-color="red"
              icon-size="x-small"
            />
          </v-slide-x-transition>
          <v-btn
            icon
            @click="isNewCategory = !isNewCategory"
            color="accent"
          >
            <v-icon icon="mdi-swap-horizontal">
            </v-icon>
            <v-tooltip
              activator="parent"
              location="top"
            >{{ isNewCategory ? 'Choose existing category' : 'Enter new category' }}
            </v-tooltip>
          </v-btn>
          <!-- <base-button
            mode="icon-action"
            icon="mdi-swap-horizontal"
            @action=""
          >
          </base-button> -->
          <!-- <base-button
            mode="action"
            custom-class="w-25 h-100 font-weight-bold"
            @action="generateProductCode"
          >
          <v-icon
            start
            icon="mdi-swap-horizontal"
            size="large"
          /> <span>Enter<br>NEW Category</span>
          </base-button> -->
        </div>
        <div class="d-flex align-start w-100">
          <base-text-field
            custom-class="pr-2 w-75"
            v-model="productCode.value.value"
            :error-message="productCode.errorMessage.value"
            label="Product Code"
            icon="mdi-asterisk"
            icon-color="red"
            icon-size="x-small"
          />
          <base-button
            mode="action"
            custom-class="w-25 h-100 font-weight-bold"
            @action="generateProductCode"
          >
            <span>Generate<br>Product Code</span>
          </base-button>
        </div>
        <base-text-field
          v-model="price.value.value"
          :error-message="price.errorMessage.value"
          label="Price"
          icon="mdi-asterisk"
          icon-color="red"
          icon-size="x-small"
        />
        <base-text-field
          v-model="quantity.value.value"
          :error-message="quantity.errorMessage.value"
          label="Quantity"
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
      {{ editPage ? 'EDIT PRODUCT' : 'ADD PRODUCT'}}
    </v-btn>
  </form>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseTextField from '~/components/ui/BaseTextField.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import { useField, useForm } from 'vee-validate'
import { alOnly, alNum, telFormat, emailFormat, numDecimal, numOnly, alNumSymOnly, alNumSymSpaceOnly, alNumHyphen } from '~/utils/validations/regex'
import { authorities } from '~/utils/variables/management/authoritySelections'
import { type ErrorResponse } from '~/utils/interfaces/errors'
import { snakeToCamel } from '~/utils/functions/caseConversion'
import { type GetUserResponse } from '#imports'
import { requestGenerateProuctCode, type CreateProductRequest } from '~/composables/useProduct'

interface Props {
  errorResponse: ErrorResponse
  editPage: boolean
  categorySelection: any
  user?: GetUserResponse
}

const props = withDefaults(defineProps<Props>(), {
  errorResponse: undefined,
  editPage: false,
  categorySelection: undefined,
  user: undefined
})

const emits = defineEmits(['formSubmit'])

const { handleSubmit, setFieldError, setFieldValue } = useForm({
  validationSchema: {
    name (value: string) {
      if (!value || value?.length == 0) {
        return 'Name is required'
      }
      if (!alNumSymSpaceOnly.test(value)) {
        return 'Alphabets, numbers, space, and !@#$%^&*.? only'
      }
      return true
    },
    productCode (value: string) {
      if (!value || value?.length == 0) {
        return 'Product code is required'
      }
      if (!alNumHyphen.test(value)) {
        return 'Alphabets, number, and - only'
      }
      return true
    },
    category (value: string) {
      if (!isNewCategory.value) {
        if (!value || value?.length == 0) {
          return 'Category is required'
        }
        if (!alNumSymSpaceOnly.test(value)) {
          return 'Alphabets, numbers, space, and !@#$%^&*.? only'
        }
      }
      return true
    },
    newCategory (value: string) {
      if (isNewCategory.value) {
        if (!value || value?.length == 0) {
          return 'Category is required'
        }
        if (!alNumSymSpaceOnly.test(value)) {
          return 'Alphabets, numbers, space, and !@#$%^&*.? only'
        }
      }
      return true
    },
    price (value: number) {
      if (!value) {
        return 'Price is required'
      }
      if (!numDecimal.test(String(value))) {
        return 'Numbers or decimal numbers only'
      }
      return true
    },
    quantity (value: number) {
      if (!value) {
        return true
      }
      if (value && !numOnly.test(String(value))) {
        return 'Numbers only'
      }
      return true
    }
  }
})

const name = useField('name')
const category = useField('category')
const newCategory = useField('newCategory')
const productCode = useField('productCode')
const price = useField('price')
const quantity = useField('quantity')
const isNewCategory = ref<boolean>(false)

const submit = handleSubmit(values => {
  const body: CreateProductRequest = {
    name: values.name.trim(),
    category: isNewCategory.value ? values.newCategory.trim() : values.category.trim(),
    item_code: values.productCode.trim(),
    price: Number(values.price.trim()),
    quantity: Number(values.quantity),
  }
  emits('formSubmit', body)
})

const generateProductCode = async () => {
  const [data, status, error] = await requestGenerateProuctCode()
  setFieldValue('productCode', data.value.item_code)
}

// const setInitialValues = (userInfo: GetUserResponse) => {
//   setFieldValue('firstName', userInfo.first_name)
//   setFieldValue('lastName', userInfo.last_name)
//   setFieldValue('tel', userInfo.tel)
//   setFieldValue('email', userInfo.email)
//   setFieldValue('authority', userInfo.user_authority_id)
//   setFieldValue('pay', userInfo.pay)
//   setFieldValue('userNumber', userInfo.user_number)
//   setFieldValue('loginId', userInfo.login_id)
// }

watch(
  () => props.errorResponse,
  (value: ErrorResponse) => {
    if (value.statusCode == 422) {
      if (!value.data.model) return
      const model: string = value.data.model == 'item_code' ? 'productCode' : value.data.model
      setFieldError(snakeToCamel(model), value.data.message)
    }
  }
)

// watch(
//   () => props.user,
//   (value: any) => {
//     setInitialValues(value)
//   }
// )
</script>