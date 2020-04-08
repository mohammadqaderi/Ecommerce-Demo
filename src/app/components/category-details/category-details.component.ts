import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category/category.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product/product.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category: Category;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService,
              private productService: ProductService) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.categoryService.getCategoryById(+params.get('id'))
          .subscribe(res => {
            this.category = res;
          })
      } else {
        router.navigate(['/categories']);
      }
    })
  }

  ngOnInit(): void {

  }

  viewProductDetails(product: Product) {
    this.productService.viewProductDetails(product);
  }

}
