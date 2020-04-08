import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../models/product";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  @Input() inputProduct: Product;
  constructor(public productService: ProductService,
              private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  hideDialog() {
    this.dialog.closeAll();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
