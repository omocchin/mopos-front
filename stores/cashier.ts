// import { productMultiplication } from '~/utils/functions/calculation';

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

  return {
    cart,
    addToCart,
    removeFromCart
  }
},
{
  persist: true
})

export type {
  CartProduct
}
