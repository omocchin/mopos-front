<template>
  <div class="w-100">
    <v-btn
      v-if="mode == 'button'"
      :class="class"
      color="accent"
      :type="type"
      :text="text"
      @click="$emit('action')"
    />
    <v-btn
      v-if="mode == 'link'"
      :to="link"
      :text="text"
      :class="class"
      variant="text"
      color="accent"
      nuxt
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  mode: String
  class?: String
  type?: String
  text: String
  link?: String
}
const props = withDefaults(defineProps<Props>(), {
  mode: '',
  class: '',
  type: '',
  text: '',
  link: '',
})

const emits = defineEmits(['action'])
</script>