<template>
  <div class="d-flex justify-center pa-5 h-100 w-100">
    <div class="d-flex flex-column w-50 h-100">
      <div class="mb-5">
        <p class="font-weight-bold text-h5">ADD NEW PRODUCT</p>
      </div>
      <product-form
        :error-response="errorResponse"
        :edit-page="false"
        :category-selection="categorySelections"
        @form-submit="createProduct"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductForm from '~/components/management/products/ProductForm.vue'
import { useTheme } from 'vuetify'
import { requestCreateUser } from '#imports';
import { requestProductategories, requestCreateProuct, type ProductCategoriesResponse } from '~/composables/useProduct'

definePageMeta({
  layout: 'management'
})

const theme = useTheme()
const router = useRouter()
const categorySelections = ref<ProductCategoriesResponse>()

const getProductSelections = async () => {
  const [data, status, error] = await requestProductategories()
  categorySelections.value = data.value
}

onMounted(async () => {
  theme.global.name.value = 'myCustomDarkTheme'
  nextTick(async () => {
    await getProductSelections()
  })
})

const errorResponse = ref<any>()

const createProduct = async (body: any) => {
  const [data, status, error] = await requestCreateProuct(body)
  if (status.value === 'success') {
    router.push({path: `/management/products`, query: {newProduct: 'true'}})
  } else {
    errorResponse.value = error.value
  }
}
</script>