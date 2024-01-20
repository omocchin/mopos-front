
import type LoginVue from '~/pages/auth/Login.vue';
<template>
  <div class="d-flex align-content-start justify-center flex-wrap w-75 h-100">
    <div v-for="index in 10" :key="index" class="pa-1" style="width: calc(100%/3); height: calc(100%/4);">
      <base-button
        class="text-h5"
        width="100%"
        height="100%"
        mode="action"
        color="secondary"
        :value="(index == 10) ? 0 : index"
        @action="buttonAction"
      >
        {{ (index == 10) ? 0 : index }}
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue';

const emits = defineEmits(['action'])

const buttonAction = (event: any) => {
  emits('action', event)
}
</script>
