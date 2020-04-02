import {CartItem} from "./cart-item";
import {Category} from "./category";
import {OrderItem} from "./order-item";

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  publishedIn: Date;
  addedToCart: boolean;
  quantity: number;
  image: string;
  category: Category;
  cartQuantity: number;
  cartItem: CartItem;
  order_items: OrderItem[];
}

