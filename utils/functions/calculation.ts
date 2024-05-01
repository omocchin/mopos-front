const productMultiplication = (price: number, factor: number) => {
  const multipliedPrice = price * factor
  return multipliedPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const convertDollarToNumber = (value: string) => {
  return parseFloat(value.slice(1).replace(/,/g, '')).toFixed(2)
}

const toDollarPrice = (price: number) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const toPriceNumber = (price: number) => {
  return convertDollarToNumber(toDollarPrice(price))
}

export {
  productMultiplication,
  toDollarPrice,
  toPriceNumber
}