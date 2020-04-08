import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../models/product";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private dialog: MatDialog,
              private snackBar: MatSnackBar,
              public authService: AuthService,
              public productService: ProductService) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('productId')) {
        this.productService.getProductById(+params.get('productId'))
          .subscribe(resProduct => {
            this.product = resProduct;
          })
      }
    })
  }

  ngOnInit(): void {
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
