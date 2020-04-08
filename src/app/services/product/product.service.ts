import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandler} from "../../shared/error-handler";
import {Observable} from "rxjs";
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `http://localhost:3000/products`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  constructor(private http: HttpClient, private authService: AuthService,
              private router: Router) {
  }

  getProducts(): Observable<Product[]> {
    try {
      return this.http.get<Product[]>(this.url);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getProductById(id: number): Observable<Product> {
    try {
      const urlById = `${this.url}/${id}`;
      return this.http.get<Product>(urlById);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  insertToCart(productId: number, cartItemId: number, cartQuantity: number): Observable<Product> {
    try {
      const params = new HttpParams().set('quantity', cartQuantity.toString());
      const urlById = `${this.url}/${productId}/addtocart/${cartItemId}`;
      return this.http.post<Product>(urlById, null, {
        params
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  updateProductCartQuantity(productId: number, cartQuantity: number): Observable<void> {
    try {
      const params = new HttpParams().set('cartQuantity', cartQuantity.toString());
      const urlById = `${this.url}/${productId}/update-quantity`;
      return this.http.patch<void>(urlById, null, {
        params
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  viewProductDetails(product: Product) {
    this.router.navigate(['/products', product.id], {
      queryParams: {
        Name: product.name
      }
    })
  }

  pushToCart(productId: number, quantity: number) {
    if (this.authService.cartItem) {
      this.insertToCart(productId, this.authService.cartItem.id, quantity)
        .subscribe(res => {
          this.router.navigate(['/cart'],
            {
              queryParams: {
                Updated: true
              }
            })
        })
    }
  }
}
