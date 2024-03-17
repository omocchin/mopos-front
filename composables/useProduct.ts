import { useApiFetch } from "./useApiFetch"

interface ProductCategoriesResponse {
  id: number
  name: string
}

interface ProductsRequest {
  page: number
  per_page: number
  keyword?: string
  user_status?: string
}

interface Products {
  id: number
  name: string
  item_code: string
  category_name: number
  price: string
  quantity: number
}

interface ProductsResponse {
  current_page: number
  total_pages: number
  items: Products
}

interface DeleteProductsRequest {
  ids: Array<number>
}

interface CreateProductRequest {
  name: string
  category: string
  item_code: string
  price: number
  quantity: number
}

const requestProductategories = async () => {
  const { data, status, error } = await useApiFetch('v1/items/categories', {
    method: 'GET',
  })
  return [data, status, error]
}

const requestProducts = async (page: number, perPage: number, keyword?: string, itemCategories?: string) => {
  const query: ProductsRequest = {
    page: page,
    per_page: perPage,
    keyword: keyword,
    item_categories: itemCategories
  }
  const { data, status, error } = await useApiFetch('v1/items', {
    method: 'GET',
    query: query
  })
  return [data, status, error]
}

const requestDeleteProducts = async (body: DeleteProductsRequest) => {
  const { data, status, error } = await useApiFetch('v1/items', {
    method: 'DELETE',
    body: body
  })
  return [data, status, error]
}

const requestGenerateProuctCode = async () => {
  const { data, status, error } = await useApiFetch('v1/item/generate_code', {
    method: 'GET'
  })
  return [data, status, error]
}

const requestCreateProuct = async (body: CreateProductRequest) => {
  console.log(body)
  const { data, status, error } = await useApiFetch('v1/item', {
    method: 'POST',
    body: body
  })
  return [data, status, error]
}

const requestProduct = async (productId: any) => {
  const { data, status, error } = await useApiFetch(`v1/item/${productId}`, {
    method: 'GET'
  })
  return [data, status, error]
}

const requestEditProduct = async (productId: any, body: CreateProductRequest) => {
  const { data, status, error } = await useApiFetch(`v1/item/${productId}`, {
    method: 'PUT',
    body: body
  })
  return [data, status, error]
}

export {
  requestProductategories,
  requestProducts,
  requestDeleteProducts,
  requestGenerateProuctCode,
  requestCreateProuct,
  requestProduct,
  requestEditProduct
}

export type {
  ProductCategoriesResponse,
  ProductsRequest,
  Products,
  ProductsResponse,
  DeleteProductsRequest,
  CreateProductRequest
}
