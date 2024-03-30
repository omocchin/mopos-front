<template>
  <product-modal
    v-model:modal="modal"
    v-model:product="selectedProduct"
    v-model:product-quantity="productQuantity"
    @add-product="addProduct"
  />
  <div class="h-100 w-100 d-flex flex-row">
    <product-category-tab
      v-model:categories="categories"
      v-model:selected-category="selectedCategory"
    />
    <div class="w-100 h-100 pa-2 d-flex flex-row">
      <product-select-window
        v-model:selected-category="selectedCategory"
        v-model:categories="categories"
        v-model:category-products="categoryProducts"
        @productSelected="productSelected"
      />
      <div class="w-25 pa-1 h-100" ref="checkoutTable">
        <cart-items-window
          v-model:cashier-header="cashierHeader"
          v-model:cart="cart"
          v-model:selected-cart-row="selectedCartRow"
          @delete-product="deleteProduct"
          @toggle-row="toggleRow"
          @checkout="checkout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  requestCashierProductCategories,
  requestCashierCategoryProducts,
  type ProductCategoriesResponse,
  type CategoryProductsResponse,
  type CartProduct
} from '#imports';
import productModal from '~/components/cashier/ProductModal.vue';
import ProductCategoryTab from '~/components/cashier/ProdoctCategoryTab.vue'
import ProductSelectWindow from '~/components/cashier/ProductSelectWindow.vue';
import CartItemsWindow from '~/components/cashier/CartItemsWindow.vue';
import { useCashierStore } from '~/stores/cashier'
import { cashierHeader } from '~/utils/variables/headers/headers'

definePageMeta({
  layout: 'custom'
})

const cashierStore = useCashierStore()
const { cart, addToCart, removeFromCart } = cashierStore
const router = useRouter()

const selectedCategory = ref<string>()
const categories = ref<Array<ProductCategoriesResponse>>()
const categoryProducts = ref<Array<CategoryProductsResponse>>()
const selectedProduct = ref<CategoryProductsResponse>({} as CategoryProductsResponse)
const modal = ref<boolean>(false)
const productQuantity = ref<number>(1)
const selectedCartRow = ref<Array<number>>([])

// const checkoutTable = ref(null)

// get height of element
// onMounted(()=>{
//   console.log('aaa', checkoutTable.value)
//   console.log(checkoutTable.value.clientWidth,checkoutTable.value.clientHeight)
  // checkoutTable.value.height = checkoutTable.value.clientHeight
  // const height = String(checkoutTable.value.clientHeight)
  // checkoutTable.value.setAttribute("style", `height: ${height}px;`);
  // tableHeight.value = true
// })

const toggleRow = (row: number) => {
  if (selectedCartRow.value.includes(row)) {
    selectedCartRow.value = selectedCartRow.value.filter(
      selectedRow => selectedRow !== row
    )
  } else {
    selectedCartRow.value.push(row);
  }
}

const deleteProduct = () => {
  if (selectedCartRow.value.length == 0) {
    removeFromCart()
  } else {
    removeFromCart(selectedCartRow.value)
    selectedCartRow.value = []
  }
}

const getproductCategories = async () => {
  const [data, status, error] = await requestCashierProductCategories()
  categories.value = data.value
  selectedCategory.value = data.value?.[0].name
}

const getproductCategoryProducts = async (category: string | undefined) => {
  const [data, status, error] = await requestCashierCategoryProducts(category)
  categoryProducts.value = data.value
}

onMounted(async () => {
  nextTick(async () => {
    await getproductCategories()
  })
})

const productSelected = (product: string) => {
  selectedProduct.value = JSON.parse(product)
  modal.value = true
}

const addProduct = () => {
  if (selectedProduct.value) {
    const product: CartProduct = {
      id: selectedProduct.value.id,
      name: selectedProduct.value.name,
      quantity: selectedProduct.value.quantity,
      price: selectedProduct.value.price,
      item_code: selectedProduct.value.item_code,
      buy_quantity: productQuantity.value
    }
    addToCart(product)
  }
}

const checkout = () => {
  router.push({path: '/cashier/checkout'})
}

watch(selectedCategory, (value) => {
  getproductCategoryProducts(value)
})

watch(modal, (value) => {
  if (value) productQuantity.value = 1
})
</script>
