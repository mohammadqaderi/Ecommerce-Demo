import {User} from "./user";
import {Payment} from "./payment";

export class Invoice {
  id: number;
  invoice_total: number;
  invoice_date: Date;
  number: string;
  due_date: Date;
  payment_date: Date;
  client: User;
  payment: Payment;
}
