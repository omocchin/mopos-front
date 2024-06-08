<template>
  <v-overlay
    activator="parent"
    scroll-strategy="block"
    class="d-flex justify-center align-center"
    height="75%"
    width="40vw"
    @click:outside="close"
  >
    <base-card :customClass="['h-100', 'w-100', 'rounded-lg', 'pa-5']">
      <base-card :customClass="['h-100', 'w-100', 'rounded-lg']" :color="'primary'">
        <div class="d-flex align-center flex-column w-100 h-25 pa-3">
          <p class="text-h5">Enter Employee Number</p>
          <v-btn
            v-if="companyId != config.public.demoCompanyId ? false : true"
            variant="text"
            color="accent"
            @click="clockInOut(Number(config.public.demoUserNumber))"
          >
            DEMO EMPLOYEE CLOCK IN/OUT
          </v-btn>
          <v-text-field
            class="w-75 mt-2 rounded-lg num-text"
            v-model="employeeNumber"
            variant="solo"
            single-line
            density="compact"
            hide-details
          />
          <div>
            <v-messages class="mt-2" :active="error" :messages="errorMessage" color="error" style="font-size: large;"/>
          </div>
        </div>
        <div class="d-flex flex-row w-100 h-75 pa-3">
          <num-pad
            @action="clockAction"
          ></num-pad>
          <div class="d-flex flex-column justify-center flex-wrap w-25 h-100">
            <div v-for="(func, index) in funcButtons" :key="index" class="pa-1 w-100" :style="{ height: (index == 2) ? 'calc(100%/2)' : 'calc(100%/4)'}">
              <base-button
                width="100%"
                height="100%"
                mode="action"
                :color="func.color"
                :value="func.value"
                @action="clockAction"
              >
                <v-icon :icon="func.icon" size="x-large" color="white"/>
              </base-button>
            </div>
          </div>
        </div>
      </base-card>
    </base-card>
  </v-overlay>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue';
import BaseButton from '~/components/ui/BaseButton.vue';
import NumPad from '~/components/common/NumPad.vue';
import { type ClockInOutResponse } from '#imports';

const emits = defineEmits(['close'])

const route = useRoute()
const authStore = useAuthStore()
const store = useUserStore()
const { companyId } = authStore
const { userClockInOut } = store
const employeeNumber = ref<string>('')
const config = useRuntimeConfig()

const error = ref(false)
const errorMessage = ref()

const setError = (show: boolean, message: string) => {
  error.value = show
  errorMessage.value = message
}

const funcButtons = ref([
  {
    icon: 'mdi-keyboard-backspace',
    color: 'backred',
    value: 'backSpace',
  },
  {
    icon: 'mdi-alpha-c',
    color: 'clearyellow',
    value: 'clear',
  },
  {
    icon: 'mdi-keyboard-return',
    color: 'accent',
    value: 'enter',
  },
])

const clockInOut = async (userNumber: number) => {
  await userClockInOut({user_number: userNumber}).then((data) => {
    setError(false, '')
    employeeNumber.value = ''
    close(data)
  }).catch((e) => {
    if (e.status == 404) {
      setError(true, 'Employee not found. Please try again.')
    }
    else {
      setError(true, e.message)
    }
  })
}

const clockAction = async (enteredValue: string) => {
  if (enteredValue == undefined) {
    return
  }
  if (enteredValue == funcButtons.value[0].value) {
    employeeNumber.value = employeeNumber.value.slice(0, -1)
  } else if (enteredValue == funcButtons.value[1].value) {
    employeeNumber.value = ''
  } else if (enteredValue == funcButtons.value[2].value) {
    await clockInOut(Number(employeeNumber.value))
  } else {
    employeeNumber.value = employeeNumber.value + enteredValue
  }
}

const close = (data: ClockInOutResponse) => {
  emits('close', data)
}
</script>

<style scoped>
.num-text :deep(input) {
  font-size: 1.5rem;
}

.num-text {
  align-content: center;
}
</style>
