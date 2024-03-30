const productMultiplication = (price: number, factor: number) => {
  const multipliedPrice = price * factor
  return multipliedPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export {
  productMultiplication
}