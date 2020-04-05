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
  checkoutDto: FormGroup;
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
              private dialog: MatDialog) {
    this.prepareCartData();

  }

  get paymentMethod() {
    return this.checkoutDto.get('createPaymentDto').get('payment_method');
  }

  get comments() {
    return this.checkoutDto.get('createOrderDto').get('comments');
  }

  ngOnInit(): void {
    this.prepareCartData();
    this.checkoutDto = this.fb.group({
      createPaymentDto: this.fb.group({
        payment_method: new FormControl(null, Validators.required)
      }),
      createOrderDto: this.fb.group({
        comments: new FormControl(null, Validators.required)
      })
    });
  }

  prepareCartData() {
    if (this.authService.isLoggedIn()) {
      if (this.route.snapshot.data.userCart) {
        console.log(true);
        this.cart = this.route.snapshot.data.userCart;
        this.cartService.getCartItem(this.route.snapshot.data.userCart.cartItemId)
          .subscribe(res => {
            this.cartItem = res;
            this.dataSource = new MatTableDataSource<any>(res.products);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
      } else if (this.authService.cart && this.authService.cartItem) {
        this.cart = this.authService.cart;
        this.cartItem = this.authService.cartItem;
        this.dataSource = new MatTableDataSource<any>(this.cartItem.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }else{
        console.log(false);

      }
    }
  }

  refreshCartData() {
    if (this.authService.cartItem) {
      console.log(true);
      this.cartService.getCartItem(this.authService.cartItem.id)
        .subscribe(res => {
          this.cartItem = res;
          this.authService.cartItem = res;
          this.dataSource = new MatTableDataSource<any>(res.products);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.openSnackBar('Cart Refreshed Successfully', 'OK');
        });
    } else {
      console.log(false);
    }

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
    })
  }

  checkSelectedMethod() {
    if (this.selectedPM === 'PAYPAL' || this.selectedPM === 'VISA'
      || this.selectedPM === 'MASTERCARD' || this.selectedPM === 'CASH_ON_DELIVERY'
    ) {
      return true;
    } else {
      return false;
    }
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
    this.cartService.checkout(this.cartItem.id, this.checkoutDto.value)
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
}

