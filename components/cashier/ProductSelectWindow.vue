<template>
  <div class="w-75 h-75">
    <v-window v-model="selectedCategory">
      <v-window-item
        v-for="category in categories"
        :key="category.id"
        :value="category.name"
      >
        <div class="d-flex flex-wrap">
          <div
            v-for="item in categoryProducts"
            :key="item.id"
            class="ma-2 pa-2"
            style="width: 17rem; height: auto;"
          >
            <base-card
              elevation="10"
              custom-class="pa-1 h-100"
            >
              <base-button
                mode="action"
                custom-class="w-100 h-100 text-pre-wrap text-left"
                :value="item"
                @action="productSelected"
              >
                <div class="px-2">
                  <p class="text-center text-h6 text-wrap">{{ item.name }}</p>
                  <p class="text-center text-subtitle-2">${{ item.price }}</p>
                </div>
              </base-button>
            </base-card>   
          </div>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue';
import BaseButton from '../ui/BaseButton.vue';
import { type ProductCategoriesResponse, type CategoryProductsResponse } from '#imports'

const selectedCategory = defineModel<string | undefined>('selectedCategory', {required: true})
const categories = defineModel<Array<ProductCategoriesResponse> | undefined>('categories', {required: true})
const categoryProducts = defineModel<Array<CategoryProductsResponse> | undefined>('categoryProducts', {required: true})

const emits = defineEmits(['productSelected'])

const productSelected = (product: string) => {
  emits('productSelected', product)
}
</script>
