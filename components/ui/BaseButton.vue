<template>
  <v-btn
    v-if="mode == 'to'"
    class="pa-3"
    :color="color || 'accent'"
    elevation="16"
    :width="width"
    :height="height"
    :to="link"
    :style="style"
    :disabled="disabled"
  >
    <slot></slot>
  </v-btn>
  <v-btn
    v-else-if="mode == 'action'"
    class="pa-3"
    :color="color || 'accent'"
    elevation="16"
    :width="width"
    :height="height"
    @click="buttonAction"
    :style="style"
    :value="value"
    :disabled="disabled"
  >
    <slot></slot>
  </v-btn>
  <v-btn
    v-else-if="mode == 'link'"
    class="pa-3"
    :to="link"
    :color="color || 'accent'"
    elevation="16"
    :width="width"
    :height="height"
    :style="style"
    :disabled="disabled"
    nuxt
  >
    <slot></slot>
  </v-btn>
  <v-btn
    v-else-if="mode == 'icon'"
    :class="customClass"
    density="comfortable"
    :icon="icon"
    :to="link"
  >
  </v-btn>
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  color?: string
  mode: string
  link?: string
  style?: string
  value?: string | number
  disabled?: boolean
  icon?: string
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '',
  height: '',
  color: undefined,
  mode: '',
  link: undefined,
  style: undefined,
  value: undefined,
  disabled: false,
  icon: undefined,
  customClass: undefined,
})

const emits = defineEmits(['action'])

const buttonAction = (event: any) => {
  emits('action', event.target.value)
}
</script>
