<template>
  <v-row
    class="my-2"
  >
    <v-col
      cols="3"
      class="text-subtitle-1"
      align-self="center"
    >
      <p>Card Number</p>
    </v-col>
    <v-col cols="5">
      <base-text-field
        v-model="cardNumber.value.value"
        :error-message="cardNumber.errorMessage.value"
      />
    </v-col>
  </v-row>
  <v-row
    class="my-2"
  >
    <v-col
      cols="3"
      class="text-subtitle-1"
      align-self="center"
    >
      <p>CVV</p>
    </v-col>
    <v-col cols="5">
      <base-text-field
        v-model="cardSecurityCode.value.value"
        :error-message="cardSecurityCode.errorMessage.value"
      />
    </v-col>
  </v-row>
  <v-row
    class="my-2"
  >
    <v-col
      cols="3"
      class="text-subtitle-1"
      align-self="center"
    >
      <p>Expiry Date</p>
    </v-col>
    <v-col cols="2">
      <v-select
        v-model="cardExpiryMonth.value.value"
        :error-messages="cardExpiryMonth.errorMessage.value"
        :items="MONTHS"
        label="MONTH"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        v-model="cardExpiryYear.value.value"
        :error-message="cardExpiryYear.errorMessage.value"
        :items="years"
        label="YEAR"
      />
    </v-col>
  </v-row>
  <v-row
    class="my-2"
  >
    <v-col
      cols="3"
      class="text-subtitle-1"
      align-self="center"
    >
      <p>Card Holder Name</p>
    </v-col>
    <v-col cols="5">
      <base-text-field
        v-model="cardName.value.value"
        :error-message="cardName.errorMessage.value"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import BaseTextField from '~/components/ui/BaseTextField.vue';
import { MONTHS, TO_FIFTY_YEARS } from '~/utils/variables/time/month'
const cardNumber = defineModel<any>('cardNumber', {required: true})
const cardName = defineModel<any>('cardName', {required: true})
const cardSecurityCode = defineModel<any>('cardSecurityCode', {required: true})
const cardExpiryMonth = defineModel<any>('cardExpiryMonth', {required: true})
const cardExpiryYear = defineModel<any>('cardExpiryYear', {required: true})

const emits = defineEmits(['inputCash', 'delCash'])
const years = TO_FIFTY_YEARS()
</script>