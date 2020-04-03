import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../models/category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  @Input() inputCategories: Category[]; // input variable
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {
    if (this.route.snapshot.data.categories) {
      this.categories = this.route.snapshot.data.categories;
    }
  }

  ngOnInit(): void {
  }

}
