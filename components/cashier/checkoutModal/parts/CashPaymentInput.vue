<template>
  <v-row
    class="my-2"
  >
    <v-col
      cols="3"
      class="text-subtitle-1"
      align-self="center"
    >
      <p>Cash</p>
    </v-col>
    <v-col cols="5">
      <v-menu
        v-model="priceMenu"
        :close-on-content-click="false"
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-text-field
            v-bind="props"
            v-model="cashAmount.value.value"
            :error-messages="cashAmount.errorMessage.value"
          />
        </template>
        <v-card
          width="350"
          height="250"
        >
          <div
            class="d-flex flex-row flex-wrap w-100 h-100"
          >
            <v-btn
              v-for="n in keyPadItems"
              :key="n"
              :value="n"
              width="calc(100%/3)"
              height="calc(100%/4)"
              rounded="0"
              outlined
              border="sm"
              @click="emits('inputCash', n)"
            >
              {{ n }}
            </v-btn>
            <v-btn
              width="calc(100%/3)"
              height="calc(100%/4)"
              rounded="0"
              outlined
              border="sm"
              @click="emits('delCash')"
            >
              <v-icon icon="mdi-keyboard-backspace" size="x-large" color="black"/>
            </v-btn>
          </div>
        </v-card>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const cashAmount = defineModel<any>('cashAmount', {required: true})
const priceMenu = ref<boolean>(false)
const keyPadItems = ref<Array<string>>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'])
const emits = defineEmits(['inputCash', 'delCash'])
</script>