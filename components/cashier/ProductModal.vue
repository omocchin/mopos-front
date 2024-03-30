<template>
  <v-dialog
    v-model="modal"
    width="auto"
  >
    <v-card
      min-width="400"
      prepend-icon="mdi-cart-arrow-down"
      title="Add to cart"
      color="background"
    >
      <v-table
        class="bg-background"
      >
        <thead class="mb-0">
          <tr>
            <th class="text-left" style="width: 20rem;">
              Name
            </th>
            <th class="text-left">
              Price
            </th>
            <th class="text-left">
              Quantity
            </th>
            <th>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="w-25">{{ product?.name }}</td>
            <td class="w-25">{{ product?.price }}</td>
            <td class="w-50">
              <div class="d-flex flex-row align-center w-100" style="width: auto;">
                <v-text-field
                  class="mr-2"
                  density="compact"
                  variant="solo"
                  v-model="productQuantity"
                  hide-details="auto"
                />
                <v-btn
                  class="w-25 rounded-s-xl"
                  min-width="0"
                  :disabled="minusButtonControl"
                  @click="subtractQuantity"
                >
                  <v-icon icon="mdi-minus"/>
                </v-btn>
                <v-btn
                  class="w-25 rounded-e-xl"
                  min-width="0"
                  @click="addQuantity"
                >
                  <v-icon icon="mdi-plus"/>
                </v-btn>
              </div>
            </td>
            <td>
              {{ totalAmount }}
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="w-100">
        <v-btn
          class="w-50"
          text="Cancel"
          color="backred"
          @click="modal = false"
        ></v-btn>
        <v-btn
          class="w-50"
          text="Add"
          color="accent"
          @click="addProductToCart"
        ></v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { type CategoryProductsResponse } from '#imports';
import { productMultiplication } from '~/utils/functions/calculation'

const emits = defineEmits(['addProduct'])

const modal = defineModel<boolean>('modal', {required: true})
const product = defineModel<CategoryProductsResponse>('product', {required: true})
const productQuantity = defineModel<number>('productQuantity', {required: true})
// const quantityOfProduct = ref<number>(1)

const minusButtonControl = computed(() => {
  return (productQuantity.value <= 1) ? true : false
})

const totalAmount = computed(() => {
  return productMultiplication(product.value.price, productQuantity.value)
})

const addQuantity = () => {
  productQuantity.value++
}

const subtractQuantity = () => {
  productQuantity.value--
}

const addProductToCart = () => {
  emits('addProduct')
  modal.value = false
}
</script>

<style scoped>

</style>
