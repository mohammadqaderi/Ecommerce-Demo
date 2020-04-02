import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErrorHandler} from "../../shared/error-handler";
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  private _cartUrl = `http://localhost:3000/cart`;
  private _cartItemUrl = `http://localhost:3000/cart_items`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  getCart(id: number): Observable<Cart> {
    try {
      return this.http.get<Cart>(this._cartUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCartItem(id: number): Observable<CartItem> {
    try {
      return this.http.get<CartItem>(this._cartItemUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  clearCartProducts(cartItemId: number): Observable<CartItem> {
    try {
      const clearUrl = `${this._cartItemUrl}/${cartItemId}/products/clear-products`;
      return this.http.delete<CartItem>(clearUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  placeOrder(cartItemId: number, productId: number,
             createOrderDto: any): Observable<void> {
    try {
      const orderUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/placeorder`;
      return this.http.post<void>(orderUrl, createOrderDto);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  removeFromProduct(cartItemId: number, productId: number): Observable<CartItem> {
    try {
      const removeUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/remove-from-cart`;
      return this.http.delete<CartItem>(removeUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  checkout(cartItemId: number, createOrderDto: any): Observable<void> {
    try {
      const checkoutUrl = `${this._cartItemUrl}/${cartItemId}/checkout`;
      return this.http.post<void>(checkoutUrl, createOrderDto);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
