interface checkoutForm {
  paymentMethod: PaymentTypeResponse
  receiptMethod: ReceiptTypeResponse
  cashAmount: string
  cardNumber: string
  cardName: string,
  cardSecurityCode: string,
  cardExpiryMonth: string,
  cardExpiryYear: string
}

export type {
  checkoutForm
}