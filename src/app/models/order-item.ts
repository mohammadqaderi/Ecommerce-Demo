import {Product} from "./product";
import {Order} from "./order";

export class OrderItem {
  id: number;
  unit_price: number;
  quantity: number;
  totalPrice: number;
  orderId: number;
  productId: number;
}

