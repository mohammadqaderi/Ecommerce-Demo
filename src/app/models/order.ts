import {OrderStatus} from "../enums/order-status.enum";
import {User} from "./user";
import {OrderItem} from "./order-item";
import {Invoice} from "./invoice";

export class Order {
  id: number;
  order_date: Date;
  shipmentDate: Date;
  comments: string;
  shippedTo: string;
  status: OrderStatus;
  user: User;
  order_items: OrderItem[];
  invoiceId: number;
}
