import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product/product.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[];

  constructor(public authService: AuthService, public productService: ProductService) {
    this.authService.refreshInfo();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    })
  }

  sortProductsByDate(): Product[] {
    if (this.products) {
      return this.products.sort((a, b) => {
        return <any>new Date(b.publishedIn) - <any>new Date(a.publishedIn);
      })
    }
  }

}
