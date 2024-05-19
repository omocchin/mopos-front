<template>
  <div class="h-100" style="width: 300px; float: left;">
    <v-tabs
      class="h-100"
      bg-color="accent"
      direction="vertical"
      v-model="selectedCategory"
      width="200"
    >
      <v-tab
        v-for="category in categories"
        :key="category.id"
        :value="category.name"
      >
        {{ category.name }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script setup lang="ts">
import { type ProductCategoriesResponse } from '#imports'

const selectedCategory = defineModel<string | undefined>('selectedCategory', {required: true})
const categories = defineModel<Array<ProductCategoriesResponse> | undefined>('categories', {required: true})
</script>
