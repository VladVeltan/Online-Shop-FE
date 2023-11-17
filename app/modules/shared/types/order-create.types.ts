import { ProductIdAndQuantity } from "./product-id-and-quantity.types"
export interface OrderCreate {
    customerId: string;
    products: ProductIdAndQuantity[];
  }
  