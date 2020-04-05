import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
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

}
