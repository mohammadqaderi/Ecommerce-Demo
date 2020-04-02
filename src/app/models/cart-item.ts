import {Product} from "./product";
import {Cart} from "./cart";

export class CartItem {
  id: number;
  total_products: number;
  products: Product[];
}
