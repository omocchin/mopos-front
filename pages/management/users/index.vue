<template>
  <div class="pa-5 h-100">
    <div class="d-flex justify-space-between">
      <p class="font-weight-bold text-h5">USERS</p>
      <base-button
        class="text-h5"
        height="100%"
        mode="action"
        color="secondary"
      >create user</base-button>
    </div>
    <div>
      <base-card
        :width="'100%'"
        :class="'pa-2'"
      >
        <div class="d-flex flex-row w-100">
          <div class="w-25">
            <v-text-field
              label="Input user name"
              prepend-inner-icon="mdi-map-marker"
              variant="outlined"
              :hide-details="true"
            ></v-text-field>
          </div>
          <div class="w-25">
            <v-select
              class="w-25"
              label="status"
              :hide-details="true"
            ></v-select>
          </div>
          <div class="w-25">
            <base-button
            >search</base-button>
          </div>
        </div>
      </base-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseButton from '~/components/ui/BaseButton.vue';
import { useTheme } from 'vuetify'

const theme = useTheme()

definePageMeta({
  layout: 'management'
})

onMounted(() => {
  theme.global.name.value = 'myCustomDarkTheme'
})
</script>