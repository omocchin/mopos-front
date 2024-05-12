import { useApiFetch } from "./useApiFetch"

interface CategoryProductsResponse {
  id: number
  name: string
  quantity: number
  price: number
  item_code: string
}

interface PaymentTypeResponse {
  id: number,
  name: string
}

interface ReceiptTypeResponse {
  id: number,
  name: string
}

interface checkoutRequest {
  user_number: number,
  subtotal: number,
  tax_total: number,
  total: number,
  receipt_type: number,
  payment_type: number,
  paid_amount: number,
  change_amount?: number,
  tip_amount?: number,
  receipt_email?: string,
  items: Array<Products>,
  card_info: object
}

interface checkoutResponse {
  id: number
}

interface checkoutInfoResponse {
  id: number,
  change: number
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

const requestPaymentTypes = async () => {
  const { data, status, error } = await useApiFetch(`v1/cashier/checkout/payment_type`, {
    method: 'GET',
  })
  return [data, status, error]
}

const requestReceiptTypes = async () => {
  const { data, status, error } = await useApiFetch(`v1/cashier/checkout/receipt_type`, {
    method: 'GET',
  })
  return [data, status, error]
}

const requestCheckout = async (body: checkoutRequest) => {
  const { data, status, error } = await useApiFetch(`v1/cashier/checkout`, {
    method: 'POST',
    body: body
  })
  return [data, status, error]
}

const requestCheckoutInfo = async (checkoutId: number) => {
  const { data, status, error } = await useApiFetch(`v1/cashier/checkout/${checkoutId}`, {
    method: 'GET'
  })
  return [data, status, error]
}

export {
  requestCashierProductCategories,
  requestCashierCategoryProducts,
  requestPaymentTypes,
  requestReceiptTypes,
  requestCheckout,
  requestCheckoutInfo
}

export type {
  CategoryProductsResponse,
  PaymentTypeResponse,
  ReceiptTypeResponse,
  checkoutRequest,
  checkoutResponse,
  checkoutInfoResponse
}