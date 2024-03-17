<template>
  <base-snack-bar :model-value="snackBar" @close-bar="barControl" :message="barMessage" :color="barColor"/>
  <base-dialog
    :dialog="dialog"
    title="CAUTION"
    body="The selected products will be deleted. Are you sure you want to proceed?"
    action-text="DELETE"
    @close="dialog = false"
    @action="deleteProducts"
  />
  <table-base
    title="PRODUCTS"
    actionButton="add product"
    searchTitle="product name or code"
    :searchSelectChip="true"
    searchSelectTitle="product categories"
    page="page"
    optional-action-button="delete product"
    :optional-action-values="selectedIds"
    :select-items="categorySelections"
    @search-action="searchProducts"
    @action="createPage"
    @optional-action="dialog = true"
  >
    <products-table
      :headers="headers"
      :items="poducts"
      :page="page"
      :totalPages="totalPages"
      @movePage="movePage"
      @row-event="rowEvent"
      @selected-event="selectedEvent"
    >
    </products-table>
  </table-base>
</template>

<script setup lang="ts">
import TableBase from '~/components/management/TableBase.vue';
import ProductsTable from '~/components/management/products/ProductsTable.vue';
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';
import BaseDialog from '~/components/ui/BaseDialog.vue';
import { useTheme } from 'vuetify'
import { productHeader } from '~/utils/variables/headers/headers'
import { ITEMS_PER_TABLE } from '~/utils/variables/global'
import { requestProductategories, requestProducts, requestDeleteProducts, type ProductCategoriesResponse, type Products} from '~/composables/useProduct'

definePageMeta({
  layout: 'management'
})

const theme = useTheme()
const route = useRoute()
const router = useRouter()
const poducts = ref<Array<Products>>([])
const page = ref<number | undefined>(undefined)
const totalPages = ref<number>(0)
const load = ref<boolean>(false)
const headers = ref()
const searchKeyword = ref<string>()
const searchItemCategories = ref<Array<number>>()
const selectedIds = ref<Array<number> | any>()
const snackBar = ref<boolean>(false)
const barMessage = ref<string>('')
const barColor = ref<string>('')
const dialog = ref<boolean>(false)

const categorySelections = ref<ProductCategoriesResponse>()

const getProducts = async (currentPage: number, keyword?: string, itemCategories?: Array<number>) => {
  load.value = true
  searchKeyword.value = keyword
  searchItemCategories.value = itemCategories
  const [data, status, error] = await requestProducts(currentPage, ITEMS_PER_TABLE, keyword, itemCategories?.toString())
  if (status.value === 'success') {
    console.log(data.value)
    poducts.value = data.value.items
    page.value = data.value.current_page
    totalPages.value = data.value.total_pages
    load.value = false
  }
}

const getProductSelections = async () => {
  const [data, status, error] = await requestProductategories()
  console.log(data.value)
  categorySelections.value = data.value
}

const movePage = async (nextPage: number) => {
  await getProducts(nextPage, searchKeyword.value, searchItemCategories.value)
}

const searchProducts = async (keyword: string, selectedCategories: Array<number>) => {
  console.log(selectedCategories)
  await getProducts(1, keyword, selectedCategories)
}

const barControl = (message?: string, color?: string) => {
  if (message) barMessage.value = message
  if (color) barColor.value = color
  snackBar.value = !snackBar.value
}

const deleteProducts = async () => {
  dialog.value = false
  const [data, status, error] = await requestDeleteProducts({ids: selectedIds.value})
  if (status.value === 'success') {
    barControl('Successfully deleted products', 'success')
    movePage(1)
  } else {
    console.log(error.value.data)
    // errorResponse.value = error.value
  }
}

const createPage = () => {
  router.push({path: '/management/products/new'})
}

const rowEvent = (product: any) => {
  router.push({path: `/management/products/${product.id}`})
}

const selectedEvent = (items: any) => {
  selectedIds.value = items
}

onMounted(async () => {
  if (route.query.newUser === 'true') {
    barControl('Successfully created user', 'success')
  }
  theme.global.name.value = 'myCustomDarkTheme'
  headers.value = productHeader
  nextTick(async () => {
    await getProducts(page.value || 1)
    await getProductSelections()
  })
})
</script>