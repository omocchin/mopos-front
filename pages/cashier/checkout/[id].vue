<template>
  <div class="h-100 d-flex justify-center align-center">
    <base-card
      color="white"
      width="600"
      height="500"
    >
    <div
      class="h-25 w-100 pa-2"
    >
      <p class="pl-8 text-left text-h2">TRANSACTION</p>
      <p class="pr-8 text-right text-h2">COMPLETED</p>
    </div>
    <div
      class="h-50 w-100 pa-2 d-flex align-center"
    >
      <div
        class="w-100 d-flex justify-space-around"
      >
        <p class="text-h4">change</p>
        <p class="text-h3">${{ change }}</p>
      </div>
    </div>
    <div
      class="h-25 w-100 d-flex align-center justify-center"
    >
      <base-button
        mode="to"
        to="/home"
        width="50%"
        height="50%"
      >
        DONE
      </base-button>
    </div>
    </base-card>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue';
import BaseButton from '~/components/ui/BaseButton.vue';
import { requestCheckoutInfo, type checkoutInfoResponse } from '~/composables/useCashier'
import { toDollarPrice } from '~/utils/functions/calculation';

definePageMeta({
  layout: 'custom'
})

const route = useRoute()
const checkoutId = ref<string | string[]>()
const checkout = ref<checkoutInfoResponse>()

const getCheckout = async (checkoutId: any) => {
  const [data, status, error] = await requestCheckoutInfo(checkoutId)
  if (status.value === 'success') {
    checkout.value = data.value
  }
}

onMounted(async () => {
  checkoutId.value = route.params.id
  nextTick(async () => {
    await getCheckout(checkoutId.value)
  })
})

const change = computed(() => {
  return checkout.value ? toDollarPrice(checkout.value.change) : null
})
</script>