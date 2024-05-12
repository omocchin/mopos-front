<template>
  <base-snack-bar
    :model-value="error"
    :message="errorMessage"
    color="error"
    @close-bar="closeBar"
  />
  <product-modal
    v-model:modal="modal"
    v-model:product="selectedProduct"
    v-model:product-quantity="productQuantity"
    @add-product="addProduct"
  />
  <checkout-modal
    v-model:modal="checkoutModal"
    v-model:cartTotal="cartTotal"
    v-model:paymentTypes="paymentTypes"
    v-model:receiptTypes="receiptTypes"
    @checkoutSubmit="checkoutSubmit"
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
      <div class="w-25 pa-1 h-100" style="max-height: 850px;">
        <div class="d-flex justify-end" style="height: 6%;">
          <v-btn
            class="ma-2 w-25"
            color="blue-grey-darken-1"
            @click="deleteProduct"
          >
            <v-icon
              icon="mdi-backspace"
              size="30"
            ></v-icon>
          </v-btn>
        </div>
        <cart-items-window
          v-model:cashier-header="cashierHeader"
          v-model:cart="inCart"
          v-model:selected-cart-row="selectedCartRow"
          v-model:subtotal="subtotal"
          v-model:taxAmount="taxAmount"
          v-model:cart-total="cartTotal"
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
  requestPaymentTypes,
  requestReceiptTypes,
  type ProductCategoriesResponse,
  type CategoryProductsResponse,
  type CartProduct,
  type SettingsResponse,
  type PaymentTypeResponse,
  type ReceiptTypeResponse,
  type checkoutResponse
} from '#imports';
import productModal from '~/components/cashier/ProductModal.vue';
import ProductCategoryTab from '~/components/cashier/ProdoctCategoryTab.vue'
import ProductSelectWindow from '~/components/cashier/ProductSelectWindow.vue';
import CartItemsWindow from '~/components/cashier/CartItemsWindow.vue';
import CheckoutModal from '~/components/cashier/checkoutModal/CheckoutModal.vue';
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';
import { useCashierStore } from '~/stores/cashier'
import { useUserStore } from '#imports';
import { cashierHeader } from '~/utils/variables/headers/headers'

definePageMeta({
  layout: 'custom'
})

const cashierStore = useCashierStore()
const { cart, addToCart, removeFromCart, cashierCheckout } = cashierStore
const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()
const { settings } = authStore
const { currentUser } = userStore

const selectedCategory = ref<string>()
const categories = ref<Array<ProductCategoriesResponse>>()
const categoryProducts = ref<Array<CategoryProductsResponse>>()
const selectedProduct = ref<CategoryProductsResponse>({} as CategoryProductsResponse)
const modal = ref<boolean>(false)
const productQuantity = ref<number>(1)
const selectedCartRow = ref<Array<number>>([])
const subtotal = ref<number>(0)
const checkoutModal = ref<boolean>(false)
const inCart = ref<Array<CartProduct>>([])
const setting = ref<SettingsResponse>()
const paymentTypes = ref<Array<PaymentTypeResponse>>([])
const receiptTypes = ref<Array<ReceiptTypeResponse>>([])
const error = ref<boolean>(false)
const errorMessage = ref<string>('')

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

const getPaymentTypes = async () => {
  const [data, status, error] = await requestPaymentTypes()
  paymentTypes.value = data.value
}

const getReceiptTypes = async () => {
  const [data, status, error] = await requestReceiptTypes()
  receiptTypes.value = data.value
}

const getproductCategoryProducts = async (category: string | undefined) => {
  const [data, status, error] = await requestCashierCategoryProducts(category)
  categoryProducts.value = data.value
}

onMounted(async () => {
  nextTick(async () => {
    await getproductCategories()
    await getPaymentTypes()
    await getReceiptTypes()
  })
  inCart.value = cart
  setting.value = settings
  setSubtotal(cart)
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
  checkoutModal.value = true
}

const setSubtotal = (products: Array<CartProduct>) => {
  products.forEach((product) => {
    subtotal.value += (product.price * product.buy_quantity)
  })
}

const checkoutSubmit = async (event:any) => {
  const params = {
    ...event,
    user_number: currentUser,
    subtotal: subtotal.value,
    tax_total: Number(taxAmount.value.toFixed(2)),
    total: Number(cartTotal.value.toFixed(2)),
    items: cart
  }
  await cashierCheckout(params).then((data: checkoutResponse) => {
    const checkoutId = data.id
    router.push({path: '/cashier/checkout/' + checkoutId})
  }).catch((e) => {
    error.value = true
    errorMessage.value = 'Failed to complete transaction.'
  })
}

const closeBar = () => {
  error.value = false
}

const taxAmount = computed(() => {
  return  subtotal.value * setting.value?.tax/100
})

const cartTotal = computed(() => {
  return subtotal.value + taxAmount.value
})

watch(selectedCategory, (value) => {
  getproductCategoryProducts(value)
})

watch(modal, (value) => {
  if (value) productQuantity.value = 1
})

watch(() => cashierStore.cart,
  (newCart) => {
    subtotal.value = 0
    setSubtotal(newCart)
    inCart.value = newCart
  },
  { deep: true }
)
</script>
