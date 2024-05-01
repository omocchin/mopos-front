<template>
  <v-dialog
    v-model="modal"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar>
        <v-btn
          icon="mdi-close"
          @click="modal = false"
        ></v-btn>
        <v-toolbar-title class="text-center">Checkout</v-toolbar-title>
        <v-toolbar-items>
          <v-btn
            text="Proceed"
            variant="text"
            @click="submit"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <form @submit.prevent="submit">
          <v-row style="min-height: 150px;">
            <v-col
              class="text-center text-h2"
              align-self="center"
            >
              {{ toDollarPrice(cartTotal) }}
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="my-2">
            <v-col
              cols="3"
              class="text-subtitle-1"
              align-self="center"
            >
              <p>Payment method</p>
            </v-col>
            <v-col cols="9">
              <v-btn-toggle
                v-model="paymentMethod.value.value"
                color="accent"
                border="md"
                divided
              >
                <v-btn v-for="type in paymentTypes" :key="type.id" class="btn-width" :value="type">{{ type?.name }}</v-btn>
              </v-btn-toggle>
              <v-input
                v-if="paymentMethod.errorMessage.value"
                error
                :error-messages="paymentMethod.errorMessage.value"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <cash-payment-input
            v-if="paymentMethod.value.value?.name === 'cash'"
            v-model:cash-amount="cashAmount"
            @input-cash="inputCash"
            @del-cash="delCash"
          />    
          <v-row
            v-else
            class="my-2"
          >
            <v-col
              cols="12"
              class="text-subtitle-1 text-center"
              align-self="center"
            >
              <p>Choose payment method</p>
            </v-col>
          </v-row>
          <v-row
            v-if="paymentMethod.value.value?.name"
            class="my-2"
          >
            <v-col
              cols="3"
              class="text-subtitle-1"
              align-self="center"
            >
              <p>Receipt</p>
            </v-col>
            <v-col cols="9">
              <v-btn-toggle
                v-model="receiptMethod.value.value"
                color="accent"
                border="md"
                divided
              >
                <v-btn v-for="type in receiptTypes" :key="type.id" class="btn-width" :value="type">{{ type?.name }}</v-btn>
              </v-btn-toggle>
              <v-input
                v-if="paymentMethod.errorMessage.value"
                error
                :error-messages="paymentMethod.errorMessage.value"
              />
            </v-col>

          </v-row>
        </form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import CashPaymentInput from '~/components/cashier/checkoutModal/parts/CashPaymentInput.vue';
import { useField, useForm } from 'vee-validate'
import { toDollarPrice, toPriceNumber } from '~/utils/functions/calculation';
import { type PaymentTypeResponse, type ReceiptTypeResponse } from '#imports'

const emits = defineEmits(['checkoutSubmit'])

const modal = defineModel<boolean>('modal', {required: true})
const cartTotal = defineModel<number>('cartTotal', {required: true})
const paymentTypes = defineModel<Array<PaymentTypeResponse>>('paymentTypes', {required: true})
const receiptTypes = defineModel<Array<PaymentTypeResponse>>('receiptTypes', {required: true})

const { values, validate, setFieldValue } = useForm({
  validationSchema: {
    paymentMethod (value: string) {
      if (!value || value?.length == 0) {
        return 'Select a payment method'
      }
      return true
    },
    cashAmount (value: string) {
      if (values.paymentMethod?.name === 'cash') {
        if (!value || value?.length == 0) {
          return 'Input cash amount'
        }
        if (Number(value) < cartTotal.value) {
          return 'Insufficient cash amount'
        }
      }
      return true
    }
  },
  initialValues: {
    cashAmount: ''
  }
})

const paymentMethod = useField('paymentMethod')
const receiptMethod = useField('receiptMethod')
const cashAmount = useField('cashAmount')

const submit = async () => {
  const { valid, errors } = await validate()
  if (valid) {
    const paymentInfo = {
      payment_type: values.paymentMethod.id,
      receipt_type: values.receiptMethod.id,
      paid_amount: toPriceNumber(parseFloat(values.cashAmount))
    }
    emits('checkoutSubmit', paymentInfo)
  }
}

const inputCash = (value: string) => {
  if (!/\d+\.\d{2}/gm.test(values.cashAmount)) {
    if (isNaN(Number(value))) {
      if (!values.cashAmount.includes('.')) setFieldValue('cashAmount', values.cashAmount.concat(value))
    } else {
      setFieldValue('cashAmount', values.cashAmount.concat(value))
    }
  }
}

const delCash = () => {
  setFieldValue('cashAmount', values.cashAmount.slice(0, -1))
}
</script>

<style scoped>
.btn-width{
  width: 150px;
}
</style>
