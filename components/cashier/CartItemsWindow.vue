<template>
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
  <v-card
    color="grey-lighten-4"
    class="w-100"
    elevation="3"
    style="height: 94%;"
  >
    <v-data-table-virtual
      :headers="cashierHeader"
      :items="cart"
      item-selectable
      sticky
      item-key="name"
      v-model="selectedCartRow"
      no-data-text="Empty"
      style="height: 94%; max-height: 94%;"
    >
      <template v-slot:item="{ item, index }">
        <tr :class="selectedCartRow.indexOf(index)>-1?'selected elevation-5':''" @click="toggleRow(index)">
          <td>{{ item.name }}</td>
          <td>{{ item.buy_quantity }}</td>
          <td>{{ productMultiplication(item.price, item.buy_quantity) }}</td>
        </tr>
      </template>
    </v-data-table-virtual>
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
  </v-card>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
import { productMultiplication } from '~/utils/functions/calculation';

const cashierHeader = defineModel<Array<object> | undefined>('cashierHeader', {required: true})
const cart = defineModel<Array<CartProduct>>('cart', {required: true})
const selectedCartRow = defineModel<Array<number>>('selectedCartRow', {required: true})

const emits = defineEmits(['deleteProduct', 'toggleRow', 'checkout'])

const deleteProduct = () => {
  emits('deleteProduct')
}

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
