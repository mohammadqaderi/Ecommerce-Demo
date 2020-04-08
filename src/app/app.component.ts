import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {CategoryService} from "./services/category/category.service";
import {Category} from "./models/category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  categories: Category[]; // will be sent to child component

  constructor(public authService: AuthService,
              private categoryService: CategoryService) {
    authService.prepareUserData();
    authService.refreshInfo();
    this.prepareCategories();
  }

  prepareCategories() {
    this.categoryService.getCategories()
      .subscribe(resData => {
        this.categories = resData;
      })
  }

  ngOnInit(): void {
    this.authService.prepareUserData();
    this.authService.refreshInfo();
    this.prepareCategories();
  }


}
