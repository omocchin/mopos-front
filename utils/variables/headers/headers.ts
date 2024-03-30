import { productMultiplication } from "~/utils/functions/calculation"
import { type CartProduct } from "#imports"

const userHeader = [
  {
    align: 'start',
    key: 'first_name',
    title: 'First Name',
  },
  { title: 'Last Name', key: 'last_name' },
  { title: 'User Number', key: 'user_number' },
  { title: 'Status', key: 'status' },
  { title: 'Pay', key: 'pay' },
]

const productHeader = [
  {
    align: 'start',
    key: 'name',
    title: 'Product Name',
  },
  { title: 'Category', key: 'category_name' },
  { title: 'Product Code', key: 'item_code' },
  { title: 'Price', key: 'price' },
  { title: 'Quantity', key: 'quantity' },
]

const cashierHeader: Array<object> | undefined = [
  {
    align: 'start',
    key: 'name',
    title: 'item',
    width: '60%',
    sortable: false,
    maxWidth: '60%'
  },
  {
    title: 'qty',
    key: 'buy_quantity',
    width: '10%',
    sortable: false
  },
  {
    title: 'total',
    key: 'total',
    value: (item: CartProduct) => productMultiplication(item.price, item.buy_quantity),
    width: '30%',
    sortable: false
  },
]

export {
  userHeader,
  productHeader,
  cashierHeader
}