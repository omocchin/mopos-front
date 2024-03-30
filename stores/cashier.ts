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
    cart.value.push(product)
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
