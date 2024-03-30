<template>
  <base-snack-bar :model-value="snackBar" @close-bar="barControl" :message="barMessage" :color="barColor"/>
  <div class="d-flex justify-center pa-5 h-100 w-100">
    <div class="d-flex flex-column w-50 h-100">
      <div class="mb-5">
        <p class="font-weight-bold text-h5">EDIT PRODUCT</p>
      </div>
      <product-form
        :error-response="errorResponse"
        :edit-page="true"
        :product="product"
        :category-selection="categorySelections"
        @form-submit="editProduct"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductForm from '~/components/management/products/ProductForm.vue';
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';
import { useTheme } from 'vuetify'
import { requestProduct } from '#imports';
import { type GetUserResponse, requestEditProduct, type ProductCategoriesResponse } from '#imports';

definePageMeta({
  layout: 'management'
})

const theme = useTheme()
const route = useRoute()
const router = useRouter()
const productId = ref<any>()
const product = ref<GetUserResponse>()
const snackBar = ref<boolean>(false)
const barMessage = ref<string>('')
const barColor = ref<string>('')
const errorResponse = ref<any>()
const categorySelections = ref<ProductCategoriesResponse>()

const getProduct = async (productId: any) => {
  const [data, status, error] = await requestProduct(productId)
  if (status.value === 'success') {
    product.value = data.value
  } else {
    if (error.value.statusCode == 404) {
      barControl('User Not Found', 'error')
    }
  }
}

const editProduct = async (body: any) => {
  const [data, status, error] = await requestEditProduct(productId.value, body)
  if (status.value === 'success') {
    barControl('Successfully edited product', 'success')
    router.push({path: `/management/products/${productId.value}`})
  } else {
    errorResponse.value = error.value
  }
}

const getProductSelections = async () => {
  const [data, status, error] = await requestProductategories()
  categorySelections.value = data.value
}

const barControl = (message?: string, color?: string) => {
  if (message) barMessage.value = message
  if (color) barColor.value = color
  snackBar.value = !snackBar.value
}


onMounted(async () => {
  theme.global.name.value = 'myCustomDarkTheme'
  productId.value = route.params.id
  nextTick(async () => {
    await getProduct(productId.value)
    await getProductSelections()
  })
})
</script>