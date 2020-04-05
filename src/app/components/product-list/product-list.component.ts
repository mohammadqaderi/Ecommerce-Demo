import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product";
import {AuthService} from "../../services/auth/auth.service";
import {ProductService} from "../../services/product/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  searchTerm: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              public authService: AuthService) {
    if (route.snapshot.data.products) {
      this.products = route.snapshot.data.products;
    }
  }

  ngOnInit(): void {

  }


  pushToCart(productId: number, quantity: number) {
    if (this.authService.cartItem) {
      this.productService.insertToCart(productId, this.authService.cartItem.id, quantity)
        .subscribe(res => {
          this.hideDialog();
          this.router.navigate(['/cart'],
            {
              queryParams: {
                Updated: true
              }
            })
        })
    }
  }

  viewProductDetails(product: Product) {
    this.productService.viewProductDetails(product);
  }

  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  hideDialog() {
    this.dialog.closeAll();
  }

}
