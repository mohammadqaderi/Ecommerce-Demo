import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";
import {CartService} from "../../services/cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../models/product";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  cartItem: CartItem;
  modalRef: BsModalRef;
  dataSource: MatTableDataSource<Product[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    'Number',
    'Name',
    'Price',
    'Quantity',
    'Actions'
  ];
  createPaymentDto: FormGroup;
  createOrderDto: FormGroup;
  selectedPM = "";
  paymentMethods: string[] = [
    'VISA',
    'PAYPAL',
    'CASH_ON_DELIVERY',
    'MASTERCARD'
  ];

  constructor(private cartService: CartService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private modalService: BsModalService,
              private snackBar: MatSnackBar,
              private productService: ProductService,
              private dialog: MatDialog) {
    this.prepareCartData();

  }

  get paymentMethod() {
    return this.createPaymentDto.get('payment_method');
  }

  get comments() {
    return this.createOrderDto.get('comments');
  }

  ngOnInit(): void {
    this.prepareCartData();
    this.createPaymentDto = this.fb.group({
      payment_method: new FormControl(null, Validators.required)
    })
    this.createOrderDto = this.fb.group({
      comments: new FormControl(null, Validators.required)
    })
  }

  prepareCartData() {
    if (this.authService.cart && this.authService.cartItem) {
      this.cart = this.authService.cart;
      this.cartItem = this.authService.cartItem;
      this.dataSource = new MatTableDataSource<any>(this.cartItem.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      console.log(false);
    }
  }

  refreshCartData() {
    this.cartService.getCartItem(this.authService.cartItem.id)
      .subscribe(res => {
        this.cartItem = res;
        this.authService.cartItem = res;
        this.dataSource = new MatTableDataSource<any>(res.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar('Cart Refreshed Successfully', 'OK');
      });
  }

  clearCartProducts() {
    this.cartService.clearCartProducts(this.cartItem.id)
      .subscribe(res => {
        this.cartItem = res;
        this.openSnackBar('Cart cleared successfully!', 'OK');
      });
  }

  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  hideDialog() {
    this.dialog.closeAll();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hideModal() {
    this.modalRef.hide();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  checkSelectedMethod() {
    return this.selectedPM === 'PAYPAL' || this.selectedPM === 'VISA'
      || this.selectedPM === 'MASTERCARD' || this.selectedPM === 'CASH_ON_DELIVERY';
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(this.cartItem.id, productId)
      .subscribe(res => {
        this.cartItem = res;
        this.openSnackBar('product removed successfully', 'OK');
      }, (error: Error) => {
        this.openSnackBar(`An error has occurred ${error.message}`, 'OK');
      });
  }

  completeCheckout() {
    const checkoutData = {
      createPaymentDto: this.createPaymentDto.value,
      createOrderDto: this.createOrderDto.value
    };
    this.cartService.checkout(this.cartItem.id, checkoutData)
      .subscribe(res => {
          this.openSnackBar('order created successfully', 'OK');
          this.router.navigate(['/orders'], {
            queryParams: {
              NewOrder: true
            }
          })
        },
        (error: Error) => {
          this.openSnackBar(`An error has occurred ${error.message}`, 'OK');
        });

  }

  updateProductCartQuantity(product: Product) {
    this.productService.updateProductCartQuantity(product.id, product.cartQuantity)
      .subscribe(res => {
        this.openSnackBar(`Quantity of this products was updated successfully!`, 'OK');

      });
  }
}

