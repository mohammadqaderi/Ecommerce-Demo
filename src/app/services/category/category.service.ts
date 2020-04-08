import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../shared/error-handler";
import {Category} from "../../models/category";
import {Observable} from "rxjs";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = `http://localhost:3000/categories`;

  constructor(private http: HttpClient) {
  }

  private errorHandler: ErrorHandler = new ErrorHandler();

  getCategories(): Observable<Category[]> {
    try {
      return this.http.get<Category[]>(this.categoryUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCategoryById(id: number): Observable<Category> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${id}`;
      return this.http.get<Category>(urlOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  createCategory(createCategoryDto: any): Observable<Category> {
    try {
      return this.http.post<Category>(this.categoryUrl, createCategoryDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  updateCategory(categoryId: number, updateCategoryDto): Observable<void> {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}`;
      return this.http.put<void>(urlById, updateCategoryDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }
  updateProduct(
    categoryId: number,
    productId: number,
    updateProductDto: any
  ): Observable<void> {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products/${productId}`;
      return this.http.put<void>(urlById, updateProductDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  deleteCategory(categoryId: number): Observable<any> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${categoryId}`;
      return this.http.delete<void>(urlOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCategoryProducts(id: number): Observable<Product[]> {
    try {
      return this.http.get<Product[]>(`${this.categoryUrl}/products`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  deleteProduct(categoryId: number, productId: number) {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products/${productId}`;
      return this.http.delete<void>(urlById);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  addProduct(categoryId: number, createProductDto: any): Observable<void> {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products`;
      return this.http.post<void>(urlById, createProductDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }
}
