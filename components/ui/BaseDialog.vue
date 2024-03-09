<template>
  <v-dialog
    :model-value="dialog"
    width="auto"
    :persistent="!closable"
  >
    <base-card>
      <v-card-title class="d-flex justify-center font-weight-bold text-clearyellow w-100">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-body-1">
        {{ body }}
      </v-card-text>
      <v-card-actions>
        <div class="d-flex justify-center text-subtitle-1 w-100">
          <base-button v-if="closable" mode="action" @action="emits('close')" color="accent" width="25%">
            CLOSE
          </base-button>
          <base-button mode="action" @action="emits('action')" color="accentBlue" width="25%">
            {{ actionText }}
          </base-button>
        </div>
      </v-card-actions>
    </base-card>
  </v-dialog>
</template>

<script setup lang="ts">
import BaseCard from '~/components/ui/BaseCard.vue';
import BaseButton from '~/components/ui/BaseButton.vue';

interface Props {
  dialog: boolean
  title: string
  body: string
  actionText: string
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  dialog: false,
  title: '',
  body: '',
  actionText: '',
  closable: true,
})

const emits = defineEmits(['close', 'action'])
</script>
