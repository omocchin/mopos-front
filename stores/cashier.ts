import { requestCheckout, type checkoutRequest, type checkoutResponse } from "#imports"
import { CustomError } from "~/utils/classes/customs"
import { type ErrorResponse } from "~/utils/interfaces/errors"

interface CartProduct {
  id: number
  name: string
  quantity: number
  price: number
  item_code: string
  buy_quantity: number
}

export const useCashierStore = defineStore('cashier', () => {
  const cart = ref<Array<CartProduct>>([])

  const addToCart = (product: CartProduct) => {
    if (cart.value.some(cartProduct => cartProduct.item_code === product.item_code)) {
      cart.value = cart.value.map(cartProduct => {
        if (cartProduct.item_code === product.item_code) {
          return {
            ...cartProduct,
            buy_quantity: cartProduct.buy_quantity + product.buy_quantity
          }
        }
        return cartProduct
      })
    } else {
      cart.value.push(product)
    }
  }

  const removeFromCart = (rowIndexes?: Array<number>) => {
    if (!rowIndexes) {
      cart.value.splice(-1, 1)
    } else {
      rowIndexes.sort().reverse().forEach(row => cart.value.splice(row, 1))
    }
  }

  const cashierCheckout = async (params: checkoutRequest) => {
    const [data, status, error] = await requestCheckout(params)
    const response: checkoutResponse = data.value
    const errorResponse: ErrorResponse = error.value
    if (status.value === 'success') {
      cart.value = []
      return response
    } else {
      throw new CustomError(errorResponse.data.message,  { status: error.value.statusCode })
    }
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    cashierCheckout
  }
},
{
  persist: true
})

export type {
  CartProduct
}
