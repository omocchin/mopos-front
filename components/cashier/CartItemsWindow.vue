<template>
  <v-card
    color="grey-lighten-4"
    class="w-100"
    elevation="3"
    style="height: 94%;"
  >
    <div class="h-100">
      <v-data-table-virtual
        class="bg-white"
        :headers="cashierHeader"
        :items="cart"
        item-selectable
        sticky
        item-key="name"
        v-model="selectedCartRow"
        no-data-text="Empty"
        style="height: 85%; max-height: 85%;"
      >
        <template v-slot:item="{ item, index }">
          <tr :class="selectedCartRow.indexOf(index)>-1?'selected elevation-5':''" @click="toggleRow(index)">
            <td>{{ item.name }}</td>
            <td>{{ item.buy_quantity }}</td>
            <td>{{ productMultiplication(item.price, item.buy_quantity) }}</td>
          </tr>
        </template>
      </v-data-table-virtual>
      <div class="d-flex align-end w-100 bg-white" style="height: 15%;">
        <div class="w-100">
          <p class="w-100 d-flex justify-space-between">
            <span class="text-subtitle-1">Subtotal</span>
            <span class="text-subtitle-1">{{ toDollarPrice(cartSubtotal) }}</span>
          </p>
          <p class="w-100 d-flex justify-space-between">
            <span class="text-subtitle-1">Tax</span>
            <span class="text-subtitle-1">{{ toDollarPrice(taxAmount) }}</span>
          </p>
          <p class="w-100 d-flex justify-space-between">
            <span class="text-h5">Total</span>
            <span class="text-h5">{{ toDollarPrice(cartTotal) }}</span>
          </p>
          <div style="height: 6%;">
            <base-button
              mode="action"
              height="100%"
              width="100%"
              @action="checkout"
            >
              Checkout
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
import { productMultiplication, toDollarPrice } from '~/utils/functions/calculation';

const cashierHeader = defineModel<Array<object> | undefined>('cashierHeader', {required: true})
const cart = defineModel<Array<CartProduct>>('cart', {required: true})
const selectedCartRow = defineModel<Array<number>>('selectedCartRow', {required: true})
const subtotal = defineModel<number>('subtotal', {required: true})
const taxAmount = defineModel<number>('taxAmount', {required: true})
const cartTotal = defineModel<number>('cartTotal', {required: true})

const emits = defineEmits(['toggleRow', 'checkout'])

const cartSubtotal = computed(() => {
  return subtotal.value
})

const toggleRow = (row: number) => {
  emits('toggleRow', row)
}

const checkout = () => {
  emits('checkout')
}
</script>

<style scoped>
.selected {
  background-color: #CFD8DC;
}
</style>
