import {Order} from "./order";
import {Invoice} from "./invoice";
import {Payment} from "./payment";

export class User {
  id: number;
  username: string;
  password: string;
  profileId: number;
  isAdmin: boolean;
  orders: Order[];
  invoices: Invoice[];
  payments: Payment[];
}
