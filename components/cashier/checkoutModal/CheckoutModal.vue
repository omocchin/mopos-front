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
          <card-payment-input
            v-if="paymentMethod.value.value?.name === 'credit_card'"
            v-model:card-number="cardNumber"
            v-model:card-name="cardName"
            v-model:card-security-code="cardSecurityCode"
            v-model:card-expiry-month="cardExpiryMonth"
            v-model:card-expiry-year="cardExpiryYear"
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
import CardPaymentInput from '~/components/cashier/checkoutModal/parts/CardPaymentInput.vue';
import { useField, useForm } from 'vee-validate'
import { toDollarPrice, toPriceNumber } from '~/utils/functions/calculation';
import { type PaymentTypeResponse, type ReceiptTypeResponse } from '#imports'
import { numOnly, alOnly } from '~/utils/validations/regex'
import { type checkoutForm } from '~/utils/interfaces/forms'

const emits = defineEmits(['checkoutSubmit'])

const modal = defineModel<boolean>('modal', {required: true})
const cartTotal = defineModel<number>('cartTotal', {required: true})
const paymentTypes = defineModel<Array<PaymentTypeResponse>>('paymentTypes', {required: true})
const receiptTypes = defineModel<Array<ReceiptTypeResponse>>('receiptTypes', {required: true})

const { values, validate, setFieldValue } = useForm<checkoutForm>({
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
    },
    cardNumber (value: string) {
      if (values.paymentMethod?.name === 'credit_card') {
        if (!value || value?.length == 0) {
          return 'Input credit card number'
        }
        if (value && !numOnly.test(String(value))) {
          return 'Input using numbers only'
        }
        if (value?.length > 16) {
          return 'Credit card length is too long'
        }
      }
      return true
    },
    cardName (value: string) {
      if (values.paymentMethod?.name === 'credit_card') {
        if (!value || value?.length == 0) {
          return 'Input credit card holder name'
        }
        if (value && !alOnly.test(String(value))) {
          return 'Input using alphabets only'
        }
      }
      return true
    },
    cardSecurityCode (value: string) {
      if (values.paymentMethod?.name === 'credit_card') {
        if (!value || value?.length == 0) {
          return 'Input CVV'
        }
        if (value && !numOnly.test(String(value))) {
          return 'Input using numbers only'
        }
        if (value?.length > 4) {
          return 'Credit card length is too long'
        }
      }
      return true
    },
  }
})

const paymentMethod = useField('paymentMethod')
const receiptMethod = useField('receiptMethod')
const cashAmount = useField('cashAmount')
const cardNumber = useField('cardNumber')
const cardName = useField('cardName')
const cardSecurityCode = useField('cardSecurityCode')
const cardExpiryMonth = useField('cardExpiryMonth')
const cardExpiryYear = useField('cardExpiryYear')

const submit = async () => {
  const { valid, errors } = await validate()
  if (valid) {
    let paymentParams = null
    if (values.paymentMethod.name === 'cash') {
      paymentParams = {
        paid_amount: toPriceNumber(parseFloat(values.cashAmount))
      }
    } else if (values.paymentMethod.name === 'credit_card') {
      paymentParams = {
        paid_amount: cartTotal.value.toFixed(2),
        card_info: {
          name: values.cardName,
          number: values.cardNumber,
          security_code: values.cardSecurityCode,
          expiry: `${values.cardExpiryYear}-${values.cardExpiryMonth}`
        }
      }
    }
    const paymentInfo = {
      payment_type: values.paymentMethod.id,
      receipt_type: values.receiptMethod.id,
      ...paymentParams
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
