import { useApiFetch } from "./useApiFetch"

interface CategoryProductsResponse {
  id: number
  name: string
  quantity: number
  price: number
  item_code: string
}

const requestCashierProductCategories = async () => {
  const { data, status, error } = await useApiFetch('v1/cashier/categories', {
    method: 'GET',
  })
  return [data, status, error]
}

const requestCashierCategoryProducts = async (category: string | undefined) => {
  const { data, status, error } = await useApiFetch(`v1/cashier/${category}/items`, {
    method: 'GET',
  })
  return [data, status, error]
}

export {
  requestCashierProductCategories,
  requestCashierCategoryProducts
}

export type {
  CategoryProductsResponse
}