import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Order} from "../../models/order";
import {Product} from "../../models/product";
import {OrderService} from "../../services/order/order.service";
import {AuthService} from "../../services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Invoice} from "../../models/invoice";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService,
              public authService: AuthService,
              private dialog: MatDialog,
              private invoiceService: InvoiceService,
              private productService: ProductService) {
    this.prepareOrdersData();
  }

  invoice: Invoice;
  orders: Order[];
  dataSource: MatTableDataSource<Order[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  products = new Array<Product>();
  displayedColumns: string[] = [
    'Number',
    'Status',
    'Shipment Date',
    'Comments',
    'Information'
  ];

  ngOnInit(): void {
    this.prepareOrdersData();
  }

  prepareOrdersData() {
    if (this.authService.isLoggedIn()) {
      this.orderService.getOrders().subscribe(
        res => {
          this.orders = res;
          this.prepareProducts();
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  prepareProducts() {
    const productIds = new Array<number>();
    if (this.orders) {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].order_items) {
          for (let j = 0; j < this.orders[i].order_items.length; j++) {
            productIds.push(this.orders[i].order_items[j].productId);
          }
        }
      }
    }
    if (productIds.length >= 1) {
      for (let i = 0; i < productIds.length; i++) {
        this.itemProduct(productIds[i]);
      }
    }
  }

  viewOrderInvoice(id: number) {
    this.invoiceService.getUserInvoice(id).subscribe(res => {
      this.invoice = res;
    }, error => {
      console.error(error);
    });
  }

  itemProduct(id: number) {
    let product: Product;
    this.productService.getProductById(id).subscribe(res => {
      product = res;
      this.products.push(product);
    });
  }
  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  hideDialog() {
    this.dialog.closeAll();
  }
}
